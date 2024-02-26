from lagent.actions.base_action import BaseAction
from lagent.schema import ActionReturn, ActionStatusCode

class InputAction(BaseAction):
    """A action to get input from user.

    Args:
        name (str): the name of the action.
        description (str): the description of the action.
        default (str): the default value of the input.
    """

    def __init__(self,
                 description: str,
                 default: str = '') -> None:
        self.default = default
        super().__init__(description=description)

    def __call__(self, query: str) -> ActionReturn:
        """Return the input from user.

        Args:
            query (str): The query content.

        Returns:
            ActionReturn: The action return.
        """
        tool_return = ActionReturn(url=None, args=None, type=self.name)
        try:
            tool_return.result = dict(text=input(f"{query}\nAnswer: ") or self.default)
            tool_return.state = ActionStatusCode.SUCCESS
        except ValueError:
            tool_return.errmsg = 'Please input a integer.'
            tool_return.state = ActionStatusCode.API_ERROR
        return tool_return
