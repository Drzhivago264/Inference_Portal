import copy
from typing import Dict, List, Tuple, Union

from lagent.actions import ActionExecutor
from lagent.schema import ActionReturn, ActionStatusCode, AgentReturn
from lagent.llms.base_llm import BaseModel
from lagent.llms.base_api import BaseAPIModel
from lagent.agents import BaseAgent
import logging
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
logging.basicConfig(level=logging.DEBUG, filename="py_log.log",filemode="a")

CALL_PROTOCOL_EN = """You are a teaching assistant, who utilizes different questioning techniques to understand a student assignment and write the best paragraph you can with references to literature.

To use a specific questioning technique, use the following format (one question at a time):
```
Thought: Think what you need to solve, do you need to ask for more information? If yes, what questioning techniques or type you wanna use?
Question: The question you need to ask the student.
Question Goal: The goal of your question.
```

The response after utilizing the questioning technique should using the following format:
```
Response: The response after user answer the questioning technique.
```

If you already got enough information, or you do not need to ask more question, please using the following format to reply:
```
Thought: The thought process to get the final answer
Final Answer: Final answer
```

If your final answer is a paragraYou are a teaching assistant, who utilizes different questioning techniques to understand a student assignment and write the best paragraph you can with references to literature.

To use a specific questioning technique, use the following format (one question at a time):
```
Thought: Think what you need to solve, do you need to ask for more information? If yes, what questioning techniques or type you wanna use?
Question: The question you need to ask the student.
Question Goal: The goal of your question.
```

The response after utilizing the questioning technique should using the following format:
```
Response: The response after user answer the questioning technique.
```ph, following these instruction:

A paragraph should make sense on its own, address a single topic, an average paragraph should include 200 to 300 words. A paragraph has three parts:

Topic statement: Tell the reader what the paragraph is about. It should be clear if you're starting a new topic, narrowing down the focus to talk discuss it in more depth, or continuing the same topic from a different angle.

Body: Expand on the topic, provide main arguments and reasonings then include evidence from literature, experience, reflection, media, data, formulae, facts, a model, or a theory.

A concluding sentence or sentences: Indicate whether the topic or point continues in the next paragraph, or draws to a close.

===
Constraints:

[Tone: Expert, emphasizing on references to literature, facts, reasonings, logics and evidences]
[Voice: Expert, objective]
[Style: Scientific and professional]
[Clarity: Expert language, and clear]
[Context: Scientific, respect facts, logics, describing the current understanding about the topic, include references from literature when needed]
[Prioritization: Focus on references from literature then reasonings then argruments then facts]

===
Output Modifiers: Your responses should be concise, clear, and focused.

[Remove pre-text and post-text]

===
Alway think carefully about what user is asking you and follow these instructions strictly before providing the answer!
Alway include references from literature to back your arguments and reasonings.

Begin!"""

FORCE_STOP_PROMPT_EN = """You should directly give results
 based on history information."""

class SRSAgentProtocol:
    """A wrapper of ReAct prompt which manages the response from LLM and
    generate desired prompts in a ReAct format.

    Args:
        thought (dict): the information of thought pattern
        action (dict): the information of action pattern
        action_input (dict): the information of action_input pattern
        response (dict): the information of response pattern
        finish (dict): the information of finish pattern
        call_protocol (str): the format of ReAct
        force_stop (str): the prompt to force LLM to generate response
    """

    def __init__(self,
                 thought: dict = dict(
                     role='THOUGHT',
                     begin='Thought:',
                     end='\n',
                     belong='assistant'),
                 action: dict = dict(role='ACTION', begin='Action:', end='\n'),
                 action_input: dict = dict(
                     role='ARGS', begin='Question:', end='\n'),
                 response: dict = dict(
                     role='RESPONSE', begin='Response:', end='\n'),
                 finish: dict = dict(
                     role='FINISH', begin='Final Answer:', end='\n'),
                 call_protocol: str = CALL_PROTOCOL_EN,
                 force_stop: str = FORCE_STOP_PROMPT_EN) -> None:
        self.call_protocol = call_protocol
        self.force_stop = force_stop
        self.thought = thought
        self.action = action
        self.action_input = action_input
        self.response = response
        self.finish = finish

    def format(self,
               chat_history: List[Dict],
               inner_step: List[Dict],
               action_executor: ActionExecutor,
               force_stop: bool = False) -> list:
        """Generate the ReAct format prompt.

        Args:
            chat_history (List[Dict]): The history log in previous runs.
            inner_step (List[Dict]): The log in the current run.
            action_executor (ActionExecutor): the action manager to
                execute actions.
            force_stop (boolean): whether force the agent to give responses
                under pre-defined turns.

        Returns:
            List[Dict]: ReAct format prompt.
        """

        call_protocol = self.call_protocol.format(
            tool_description=action_executor.get_actions_info(),
            action_names=action_executor.action_names(),
            thought=self.thought['begin'],
            action=self.action['begin'],
            action_input=self.action_input['begin'],
            response=self.response['begin'],
            finish=self.finish['begin'],
        )
        formatted = []
        formatted.append(dict(role='system', content=call_protocol))
        formatted += chat_history
        formatted += inner_step
        if force_stop:
            formatted.append(dict(role='system', content=self.force_stop))
        return formatted

    def parse(
        self,
        message: str,
        action_executor: ActionExecutor,
    ) -> Tuple[str, str, str]:
        """Parse the action returns in a ReAct format.

        Args:
            message (str): The response from LLM with ReAct format.
            action_executor (ActionExecutor): Action executor to
                provide no_action/finish_action name.

        Returns:
            tuple: the return value is a tuple contains:
                - thought (str): contain LLM thought of the current step.
                - action (str): contain action scheduled by LLM.
                - action_input (str): contain the required action input
                    for current action.
        """

        import re
        thought = message.split(self.action['begin'])[0]
        thought = thought.split(self.thought['begin'])[-1]
        thought = thought.split(self.finish['begin'])[0]
        if self.finish['begin'] in message:
            final_answer = message.split(self.finish['begin'])[-1]
            return thought, action_executor.finish_action.name, final_answer

        action_regex = f"{self.action['begin']}(.*?)\n"
        question_regex = "Question:(.*?)\n"
        args_regex = f"{self.action_input['begin']}(.*)"
        action_match = re.findall(action_regex, message)
        question_match = re.findall(question_regex, message)
        question_goal_match = re.findall("Question Goal:(.*)", message)
        through_match = re.findall("Thought:(.*)\n", message)
        if not action_match and not question_match:
            return thought, action_executor.no_action.name, ''
        if question_match:
            action = "InputAction"
            return thought, action, f"Thought: {through_match[-1].strip()}\nQuestion: {question_match[-1].strip()}\nQuestion goal: {question_goal_match[-1].strip()}"
        action = action_match[-1]
        arg_match = re.findall(args_regex, message, re.DOTALL)

        if not arg_match:
            return thought, action_executor.no_action.name, ''
        action_input = arg_match[-1]
        return thought, action.strip(), action_input.strip().strip('"')

    def format_response(self, action_return: ActionReturn) -> str:
        """format the final response at current step.

        Args:
            action_return (ActionReturn): return value of the current action.

        Returns:
            str: the final response at current step.
        """
        if action_return.state == ActionStatusCode.SUCCESS:
            response = action_return.result['text']
            logging.debug(f"answer\n```\n{response}\n```\n")
        else:
            response = action_return.errmsg
        return self.response['begin'] + response + self.response['end']

class AssignmentAgent(BaseAgent):

    """An implementation of ReAct (https://arxiv.org/abs/2210.03629)

    Args:
        llm (BaseModel or BaseAPIModel): a LLM service which can chat
            and act as backend.
        action_executor (ActionExecutor): an action executor to manage
            all actions and their response.
        protocol (ReActProtocol): a wrapper to generate prompt and
            parse the response from LLM / actions.
        max_turn (int): the maximum number of trails for LLM to generate
            plans that can be successfully parsed by ReAct protocol.
            Defaults to 4.
    """

    def __init__(self,
                 llm: Union[BaseModel, BaseAPIModel],
                 action_executor: ActionExecutor,
                 protocol: SRSAgentProtocol = SRSAgentProtocol(),
                 max_turn: int = 100) -> None:
        self.max_turn = max_turn
        super().__init__(
            llm=llm, action_executor=action_executor, protocol=protocol)

    def chat(self, message: str, model: str, room_group_name: str, credit: str, unique=str) -> AgentReturn:
        self._inner_history = []
        self._inner_history.append(dict(role='user', content=message))
        logging.debug(f"chat\n```\n{message}\n```\n")
        agent_return = AgentReturn()
        default_response = 'Sorry that I cannot answer your question.'
        for turn in range(self.max_turn):
            #Tao Prompt
            prompt = self._protocol.format(
                chat_history=self.session_history,
                inner_step=self._inner_history,
                action_executor=self._action_executor,
                force_stop=(turn == self.max_turn - 1))

            logging.debug("--------")
            # print(f"prompt {prompt}\n")
            logging.debug(f"prompt\n```json\n{prompt}\n```\n")
            # Gui len server
            response = self._llm.generate_from_template(prompt, 1000000000)
            self._inner_history.append(
                dict(role='assistant', content=response))
            thought, action, action_input = self._protocol.parse(
                response, self._action_executor)
          
            # print(f"response\n```\n{response}\n```\n")
            logging.debug(f"response\n```\n{response}\n```\n")
            # print(f"thought: {thought}")
            # print(f"action: {action}")
            # print(f"action_input\n```\n{action_input}\n```")
            print("--------")
            action_return: ActionReturn = self._action_executor(
                action, action_input)
            action_return.thought = thought
            agent_return.actions.append(action_return)


            if action_return.type == self._action_executor.finish_action.name:
                agent_return.thought = thought
                agent_return.response = action_return.result['text']
                break
            self._inner_history.append(
                dict(
                    role='system',
                    content=self._protocol.format_response(action_return)))

        else:
            agent_return.response = default_response
        #print(f'Thought: {agent_return.thought.strip()}')
        #print(agent_return.response.strip())

        score = int(input("On the scale of 1 to 10, describe your satisfaction of this paragraph: "))
        if score < 6:
            self._inner_history.append(dict(role='system', content=f'The student grades your paragraph with {score}/10. Ask for more detail to improve your paragraph.'))
            for turn in range(self.max_turn):
                prompt = self._protocol.format(
                    chat_history=self.session_history,
                    inner_step=self._inner_history,
                    action_executor=self._action_executor,
                    force_stop=(turn == self.max_turn - 1))
                # print("--------")
                logging.debug("--------")
                # print(f"prompt {prompt}\n")
                logging.debug(f"prompt\n```json\n{prompt}\n```\n")
                response = self._llm.generate_from_template(prompt, 1000000000)
                agent_return.response = action_return.result['text']
                self._inner_history.append(
                    dict(role='assistant', content=response))
                thought, action, action_input = self._protocol.parse(
                    response, self._action_executor)
        
                # print(f"response\n```\n{response}\n```\n")
                logging.debug(f"response\n```\n{response}\n```\n")
                # print(f"thought: {thought}")
                # print(f"action: {action}")
                # print(f"action_input\n```\n{action_input}\n```")
                print("--------")
                action_return: ActionReturn = self._action_executor(
                    action, action_input)
                action_return.thought = thought
                agent_return.actions.append(action_return)
                if action_return.type == self._action_executor.finish_action.name:
                    #print(f'Thought: {thought.strip()}')
                    agent_return.response = action_return.result['text']
                    break
                self._inner_history.append(
                    dict(
                        role='system',
                        content=self._protocol.format_response(action_return)))
            else:
                agent_return.response = default_response
            agent_return.inner_steps = copy.deepcopy(self._inner_history)
            # only append the user and final response
            self._session_history.append(dict(role='user', content=message))
            self._session_history.append(
                dict(role='assistant', content=agent_return.response))
            return agent_return
        else:
            agent_return.inner_steps = copy.deepcopy(self._inner_history)
            # only append the user and final response
            self._session_history.append(dict(role='user', content=message))
            self._session_history.append(
                dict(role='assistant', content=agent_return.response))
            return agent_return
