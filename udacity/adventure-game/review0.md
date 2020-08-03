 story.py 5
#!/usr/bin/python3
import time
import random
​
AWESOME
Good job by importing the modules correctly but you can write it like this import time , random as well both are the same thing 👍

​
def play_game():
    items = []
    monsters = ["pirate", "troll", "goblin", "wicked fairie", "orc"]
    monster = random.choice(monsters)
    weapons = ["sword", "golden dagger", "spear", "bow and arrow"]
    weapon = random.choice(weapons)
AWESOME
Awesome job using random module implemented perfectly!!

    intro(monster)
    field(items, weapon)
​
​
def play_again():
    response = valid_input("Please Enter \"yes\" or \"no\".\n", ["yes", "no"])
    if "yes" in response:
        print_pause("Awesome, have fun!")
        play_game()
    elif "no" in response:
        print_pause("Okay, byeeeee!")
        exit()
​
​
def valid_input(prompt, options):
    while True:
        response = input(prompt).lower()
        for option in options:
            if option in response:
                return response
        print_pause("Sorry, I don't understand.")
​
​
def field(items, weapon):
    print_pause("Enter 1 to knock on the door of the house.")
    print_pause("Enter 2 to peer into the cave.")
    print_pause("What would you like to do?")
    response = valid_input("(Please enter 1 or 2).\n", ["1", "2"])
    if "1" in response:
REQUIRED
Good job everything works perfectly fine but there is a small bug 🐛 suppose if the user answers 12 then also it will go ahead but it should ask the user to choose the right option so rather than using in use ==.So it will match the exact value.

        house(items, weapon)
    elif "2" in response:
        cave(items, weapon)
​
​
def print_pause(message):
    print(message)
    time.sleep(2)
​
​
def intro(monster):
SUGGESTION
It is a good practice to define comments for some functions that you think might be confusing for others to go through. Comments can contain the following things:-

1) Input params that function is expecting.
2) working of function in one line.
3) Return value if any.
    print_pause("You find yourself standing in an open field, filled with "
                "grass and yellow wildflowers.")
    print_pause(f"Rumor has it that a {monster} is somewhere around "
                "here, and has been terrifying the nearby village.")
​
​
def house(items, weapon):
    print_pause("You enter the house and a goblin stares at you")
    print_pause("He looks like he is ready for a fight.")
    print_pause("Enter 1 to fight the goblin")
    print_pause("Enter 2 to go back to the field")
    print_pause("What would you like to do?")
    response = valid_input("(Please enter 1 or 2).\n", ["1", "2"])
    if "1" in response:
        if "weapon" in items:
            print_pause("You engage into the fight.")
            print_pause("Your amazing sword is no match for the goblin "
                        "and he runs away.")
            print_pause("Congratulations you won, do you wanna play again?")
            play_again()
        else:
            print_pause("You engage into the fight with a bad feeling.")
AWESOME
Great work with the functions.Your code looks perfectly modular and most of the functions only have one responsibility that's great but I would encourage you to read SOLID design principles.It will help you implement your code in more efficient way.
@ https://www.slideshare.net/DrTrucho/python-solid

            print_pause("Your rusty dagger is of no use the goblin defeats "
                        "you.")
            print_pause("Game Over")
            print_pause("You lost do you wanna play again?")
            play_again()
    elif "2" in response:
        print_pause("You leave the house and head back to the field.")
        field(items, weapon)
​
​
def cave(items, weapon):
    print_pause(f"You enter the muddy cave and find a {weapon}")
    items.append("weapon")
    print_pause("You leave the cave and head back to the field.")
    field(items, weapon)
​
​
play_game()
​
