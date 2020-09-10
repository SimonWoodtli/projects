 story.py 5
#!/usr/bin/python3
import time
import random
​
​
def play_game():
    items = []
    monsters = ["pirate", "troll", "goblin", "wicked fairie", "orc"]
    monster = random.choice(monsters)
    weapons = ["sword", "golden dagger", "spear", "bow and arrow"]
    weapon = random.choice(weapons)
    intro(monster)
    field(items, weapon)
​
​
def play_again():
    response = valid_input("Please Enter \"yes\" or \"no\".\n", ["yes", "no"])
SUGGESTION
Instead of escaping each ", you can switch to single quotes:

response = valid_input('Please Enter "yes" or "no".\n', ["yes", "no"])
or

response = valid_input("Please Enter 'yes' or 'no'.\n", ["yes", "no"])
Any approach (including yours) is valid.

    if response == "yes":
AWESOME
Great job switching to strict equality to check the response :clap:

        print_pause("Awesome, have fun!")
        play_game()
    elif response == "no":
        print_pause("Okay, byeeeee!")
        exit()
​
​
# The prompt parameter allows for custom input-messages, and the options
AWESOME
It's always nice to see comments to describe what's going on.

# allow custom options to choose from as a user while playing.
def valid_input(prompt, options):
    while True:
        response = input(prompt).lower()
        for option in options:
            if option == response:
                return response
        print_pause("Sorry, I don't understand.")
​
​
def field(items, weapon):
AWESOME
Good work using functions to describe each scenario of the adventure!

    print_pause("Enter 1 to knock on the door of the house.")
    print_pause("Enter 2 to peer into the cave.")
    print_pause("What would you like to do?")
    response = valid_input("(Please enter 1 or 2).\n", ["1", "2"])
    if response == "1":
        house(items, weapon)
    elif response == "2":
        cave(items, weapon)
​
​
# The message parameter allows you to call this function and print
# a custom text.
def print_pause(message):
    print(message)
    time.sleep(0)
​
​
# The monster parameter refers to a randomly picked monster from the
# monsters list defined in play_game()
def intro(monster):
    print_pause("You find yourself standing in an open field, filled with "
                "grass and yellow wildflowers.")
    print_pause(f"Rumor has it that a {monster} is somewhere around "
                "here, and has been terrifying the nearby village.")
​
​
# The items parameter is needed to check whether or not the user already
# has a weapon. The Weapon parameter is a randomly picked weapon from the
# weapons list both defined in play_game()
def house(items, weapon):
    print_pause("You enter the house and a goblin stares at you")
    print_pause("He looks like he is ready for a fight.")
    print_pause("Enter 1 to fight the goblin")
    print_pause("Enter 2 to go back to the field")
    print_pause("What would you like to do?")
    response = valid_input("(Please enter 1 or 2).\n", ["1", "2"])
    if response == "1":
        if "weapon" in items:
AWESOME
Good job using in to check if the weapon is in the items list.

            print_pause("You engage into the fight.")
            print_pause("Your amazing sword is no match for the goblin "
                        "and he runs away.")
            print_pause("Congratulations you won, do you wanna play again?")
            play_again()
        else:
            print_pause("You engage into the fight with a bad feeling.")
            print_pause("Your rusty dagger is of no use the goblin defeats "
                        "you.")
            print_pause("Game Over")
            print_pause("You lost do you wanna play again?")
            play_again()
    elif response == "2":
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
