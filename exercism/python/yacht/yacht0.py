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
d0 = random.randint(1,6)
d1 = random.randint(1,6)
d2 = random.randint(1,6)
d3 = random.randint(1,6)
d4 = random.randint(1,6)
dice = [d0, d1, d2, d3, d4]


def score(dice, category):
    if category == "ONES":
        return dice.count(1)*1
    elif category == "TWOS":
        return dice.count(2)*2
    elif category == "THREES":
        return dice.count(3)*3
    elif category == "FOURS":
        return dice.count(4)*4
    elif category == "FIVES":
        return dice.count(5)*5
    elif category == "SIXES":
        return dice.count(6)*6
    elif category == "CHOICE":
        return sum(dice)
    elif category == "LITTLE_STRAIGHT":
        return len(set(dice)) == 5 and sum(dice) == 15
    elif category == "BIG_STRAIGHT":
        return len(set(dice)) == 5 and sum(dice) == 20
    elif category == "YACHT":
        return len(set(dice)) == 1
    elif category == "FOUR_OF_A_KIND":
        return len(set(dice)) == 4
    elif category == "FULL_HOUSE":
        return len(set(dice)) == 2

print(score(dice, "TWOS"))
