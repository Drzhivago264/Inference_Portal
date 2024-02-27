from vllm import LLM, SamplingParams
import json
import requests
from django.utils import timezone

import requests

from decouple import config
import boto3
from botocore.exceptions import ClientError
from util import constant


promtp= "hehe"
context = {
 "prompt": "hola, how are you?",
  "name": "test",
  "key": "test",
  "stream" : True
  
}
model = "Mistral Chat 13B"
template = constant.MODEL_TEMPLATE_TABLE[model]
ami = "ami-0810c2d824776b340"




print(template.format(promtp))
for i in range(100):
    response = requests.post("https://professorparakeet.com/api/", headers = {"Authorization": "test"},   json=context ) 
    print(response.json())

p = """Below is an instruction that describes a task. Write a response that appropriately completes the request.



### Instruction:
write me 1000 words paragraph about cat

### Response:
Cats are fascinating creatures that have captured the hearts of people all around the world. They come in various shapes, sizes, and colors, each with its unique charm and personality. These furry felines have been domesticated for thousands of years and have become an integral part of human lives. In this essay, we will explore the various aspects of cats, their behavior, and their importance in our lives.

Cats are known for their grace and agility. They are excellent hunters and can jump up to six times their height. Their ability to land on their feet is legendary, and they can run at speeds of up to 31 miles per hour. Their sharp claws and teeth are essential for hunting and self-defense. Despite their reputation as solitary creatures, cats are highly social animals that form strong bonds with their owners and other pets in their environment.

Cats communicate through a variety of methods, including vocalizations, body language, and scent marking. They purr when they are happy or content, but they can also purr when they are injured or in pain. Their tail movements also convey different messages; a twitching tail indicates curiosity or interest, while a swishing tail signifies aggression or fear.

Cats are meticulous groomers and spend a significant amount of time maintaining their coats. They have a unique tongue that is covered in tiny hooks, which helps them remove dirt and loose hair from their fur. They also have an innate ability to self-medicate by ingesting specific plants and herbs that have healing properties.

Cats are intelligent creatures that can learn to perform tricks and solve complex problems. They are adept at using their environment to their advantage and can navigate through narrow spaces with ease. Their keen sense of smell and hearing also aid them in navigating their surroundings.

In terms of their importance in our lives, cats provide companionship, love, and laughter. They have been shown to reduce stress and anxiety levels in their owners, and studies have even suggested that owning a cat can improve one's overall health. Cats are also beneficial for the environment as they help control rodent populations, which can otherwise cause significant damage to crops and property.

In conclusion, cats are remarkable animals that have captured our hearts and minds for centuries. They bring joy, companionship, and even health benefits into our lives. Their unique personalities, behaviors, and abilities make them truly special creatures that deserve our love and care. Whether you are a cat owner or simply appreciate these furry friends from afar, there is no denying the impact that cats have on our world.


### Instruction:
Hello


### Response:
Hello! How can I assist you today?


### Instruction:
what is my name


### Response:
I'm sorry, but I cannot disclose your name without your explicit permission. If you'd like to share your name with me, please feel free to do so.


### Instruction:
my name is H 


### Response:
Hello H! It's nice to meet you. If you have any questions or need assistance with anything, please don't hesitate to ask.


### Instruction:
what is my name


### Response:
Your name is H.


### Instruction:
what is my cat name


### Response:
I apologize for the confusion earlier. If you have a cat, you can choose a name for it that you like. It's important to choose a name that you and your family can easily remember and pronounce. Some popular cat names include Luna, Oliver, Milo, and Lily. Do you have any preferences for your cat's name?


### Instruction:
my cat name is black


### Response:
Well, if your cat's fur is black, you could consider names like Midnight, Shadow, or Onyx. These names reflect the beautiful color of your cat's fur. However, if you have a specific name in mind for your cat, feel free to share it with me and I'd be happy to help you with any other questions or concerns you might have.


### Instruction:
what is my name


### Response:
Your name is H.


### Instruction:
Good bot


### Response:
Thank you for your kind words! I'm here to help if you need anything else.


### Instruction:
Hello


### Response:
Hello! How can I assist you today?

Instruction:
write me 1000 words paragraph about cat

### Response:
Cats are fascinating creatures that have captured the hearts of people all around the world. They come in various shapes, sizes, and colors, each with its unique charm and personality. These furry felines have been domesticated for thousands of years and have become an integral part of human lives. In this essay, we will explore the various aspects of cats, their behavior, and their importance in our lives.

Cats are known for their grace and agility. They are excellent hunters and can jump up to six times their height. Their ability to land on their feet is legendary, and they can run at speeds of up to 31 miles per hour. Their sharp claws and teeth are essential for hunting and self-defense. Despite their reputation as solitary creatures, cats are highly social animals that form strong bonds with their owners and other pets in their environment.

Cats communicate through a variety of methods, including vocalizations, body language, and scent marking. They purr when they are happy or content, but they can also purr when they are injured or in pain. Their tail movements also convey different messages; a twitching tail indicates curiosity or interest, while a swishing tail signifies aggression or fear.

Cats are meticulous groomers and spend a significant amount of time maintaining their coats. They have a unique tongue that is covered in tiny hooks, which helps them remove dirt and loose hair from their fur. They also have an innate ability to self-medicate by ingesting specific plants and herbs that have healing properties.

Cats are intelligent creatures that can learn to perform tricks and solve complex problems. They are adept at using their environment to their advantage and can navigate through narrow spaces with ease. Their keen sense of smell and hearing also aid them in navigating their surroundings.

In terms of their importance in our lives, cats provide companionship, love, and laughter. They have been shown to reduce stress and anxiety levels in their owners, and studies have even suggested that owning a cat can improve one's overall health. Cats are also beneficial for the environment as they help control rodent populations, which can otherwise cause significant damage to crops and property.

In conclusion, cats are remarkable animals that have captured our hearts and minds for centuries. They bring joy, companionship, and even health benefits into our lives. Their unique personalities, behaviors, and abilities make them truly special creatures that deserve our love and care. Whether you are a cat owner or simply appreciate these furry friends from afar, there is no denying the impact that cats have on our world.


### Instruction:
Hello


### Response:
Hello! How can I assist you today?


### Instruction:
what is my name


### Response:
I'm sorry, but I cannot disclose your name without your explicit permission. If you'd like to share your name with me, please feel free to do so.


### Instruction:
my name is H 


### Response:
Hello H! It's nice to meet you. If you have any questions or need assistance with anything, please don't hesitate to ask.


### Instruction:
what is my name


### Response:
Your name is H.


### Instruction:
what is my cat name


### Response:
I apologize for the confusion earlier. If you have a cat, you can choose a name for it that you like. It's important to choose a name that you and your family can easily remember and pronounce. Some popular cat names include Luna, Oliver, Milo, and Lily. Do you have any preferences for your cat's name?


### Instruction:
my cat name is black


### Response:
Well, if your cat's fur is black, you could consider names like Midnight, Shadow, or Onyx. These names reflect the beautiful color of your cat's fur. However, if you have a specific name in mind for your cat, feel free to share it with me and I'd be happy to help you with any other questions or concerns you might have.


### Instruction:
what is my name


### Response:
Your name is H.


### Instruction:
Good bot


### Response:
Thank you for your kind words! I'm here to help if you need anything else.


### Instruction:
Hello


### Response:
Hello! How can I assist you today?
Instruction:
write me 1000 words paragraph about cat

### Response:
Cats are fascinating creatures that have captured the hearts of people all around the world. They come in various shapes, sizes, and colors, each with its unique charm and personality. These furry felines have been domesticated for thousands of years and have become an integral part of human lives. In this essay, we will explore the various aspects of cats, their behavior, and their importance in our lives.

Cats are known for their grace and agility. They are excellent hunters and can jump up to six times their height. Their ability to land on their feet is legendary, and they can run at speeds of up to 31 miles per hour. Their sharp claws and teeth are essential for hunting and self-defense. Despite their reputation as solitary creatures, cats are highly social animals that form strong bonds with their owners and other pets in their environment.

Cats communicate through a variety of methods, including vocalizations, body language, and scent marking. They purr when they are happy or content, but they can also purr when they are injured or in pain. Their tail movements also convey different messages; a twitching tail indicates curiosity or interest, while a swishing tail signifies aggression or fear.

Cats are meticulous groomers and spend a significant amount of time maintaining their coats. They have a unique tongue that is covered in tiny hooks, which helps them remove dirt and loose hair from their fur. They also have an innate ability to self-medicate by ingesting specific plants and herbs that have healing properties.

Cats are intelligent creatures that can learn to perform tricks and solve complex problems. They are adept at using their environment to their advantage and can navigate through narrow spaces with ease. Their keen sense of smell and hearing also aid them in navigating their surroundings.

In terms of their importance in our lives, cats provide companionship, love, and laughter. They have been shown to reduce stress and anxiety levels in their owners, and studies have even suggested that owning a cat can improve one's overall health. Cats are also beneficial for the environment as they help control rodent populations, which can otherwise cause significant damage to crops and property.

In conclusion, cats are remarkable animals that have captured our hearts and minds for centuries. They bring joy, companionship, and even health benefits into our lives. Their unique personalities, behaviors, and abilities make them truly special creatures that deserve our love and care. Whether you are a cat owner or simply appreciate these furry friends from afar, there is no denying the impact that cats have on our world.


### Instruction:
Hello


### Response:
Hello! How can I assist you today?


### Instruction:
what is my name


### Response:
I'm sorry, but I cannot disclose your name without your explicit permission. If you'd like to share your name with me, please feel free to do so.


### Instruction:
my name is H 


### Response:
Hello H! It's nice to meet you. If you have any questions or need assistance with anything, please don't hesitate to ask.


### Instruction:
what is my name


### Response:
Your name is H.


### Instruction:
what is my cat name


### Response:
I apologize for the confusion earlier. If you have a cat, you can choose a name for it that you like. It's important to choose a name that you and your family can easily remember and pronounce. Some popular cat names include Luna, Oliver, Milo, and Lily. Do you have any preferences for your cat's name?


### Instruction:
my cat name is black


### Response:
Well, if your cat's fur is black, you could consider names like Midnight, Shadow, or Onyx. These names reflect the beautiful color of your cat's fur. However, if you have a specific name in mind for your cat, feel free to share it with me and I'd be happy to help you with any other questions or concerns you might have.


### Instruction:
what is my name


### Response:
Your name is H.


### Instruction:
Good bot


### Response:
Thank you for your kind words! I'm here to help if you need anything else.


### Instruction:
Hello


### Response:
Hello! How can I assist you today?

"""
""" response = requests.post("http://3.93.75.76/generate", headers = {"User-Agent": "Test Client"},  json={ "prompt": p,   "temperature": 0, "stream" : True}
                         , stream = True ) 
previous_output = str()
for chunk in response.iter_lines(chunk_size= 1024,
                                    decode_unicode=False,
                                    delimiter=b"\0"):
    if chunk:
        print(chunk)
        data = json.loads(chunk.decode("utf-8"))
        output = data["text"][0]
        print(output.replace(previous_output, ""))
        previous_output = output
 """