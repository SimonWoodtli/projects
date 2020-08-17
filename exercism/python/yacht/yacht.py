#!/usr/bin/python3
import random
"""
This exercise stub and the test suite contain several enumerated constants.

Since Python 2 does not have the enum module, the idiomatic way to write
enumerated constants has traditionally been a NAME assigned to an arbitrary,
but unique value. An integer is traditionally used because it’s memory
efficient.
It is a common practice to export both constants and functions that work with
those constants (ex. the constants in the os, subprocess and re modules).

You can learn more here: https://en.wikipedia.org/wiki/Enumerated_type
"""


# Score categories.
# Change the values as you see fit.
dice = [random.randint(1,6), random.randint(1,6), random.randint(1,6), random.randint(1,6), random.randint(1,6),
        random.randint(1,6)]
YACHT = None
ONES = dice.count(1)*1
TWOS = dice.count(2)*2
THREES = dice.count(3)*3
FOURS = dice.count(4)*4
FIVES = dice.count(5)*5
SIXES = dice.count(6)*6
FULL_HOUSE = None
FOUR_OF_A_KIND = None
LITTLE_STRAIGHT = None
BIG_STRAIGHT = None
CHOICE = sum(dice)

def score(dice, category):
    if category == ONES:
        return ONES
    elif category == TWOS:
        return TWOS
    elif category == THREES:
        return THREES
    elif category == FOURS:
        return FOURS
    elif category == FIVES:
        return FIVES
    elif category == SIXES:
        return SIXES
    elif category == CHOICE:
        return CHOICE
#print(score(CHOICE))
print(dice[0:5])
