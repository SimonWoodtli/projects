#!/usr/bin/python3
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
YACHT = "yacht"
ONES = "ones"
TWOS = "twos"
THREES = "threes"
FOURS = "fours"
FIVES = "fives"
SIXES = "sixes"
FULL_HOUSE = "full_house"
FOUR_OF_A_KIND = "four_of_a_kind"
LITTLE_STRAIGHT = "little_straight"
BIG_STRAIGHT = "big_straight"
CHOICE = "choice"


def score(dice, category):

    if category == "yacht":
        return 50 if len(set(dice)) == 1 else 0

    if category == "ones":
        return dice.count(1)

    if category == "twos":
        return 2 * dice.count(2)

    if category == "threes":
        return 3 * dice.count(3)

    if category == "fours":
        return 4 * dice.count(4)

    if category == "fives":
        return 5 * dice.count(5)

    if category == "sixes":
        return 6 * dice.count(6)

    if category == "full_house":
        if len(set(dice)) == 2 and [dice.count(item) for item in set(dice)] in [[2, 3], [3, 2]]:
            return sum(dice)
        else:
            return 0

    if category == "four_of_a_kind":
        if len(set(dice)) == 1 or [dice.count(item) for item in set(dice)] in [[4, 1], [1, 4]]:
            return max(item*4 for item in set(dice))

    if category == "little_straight":
        if len(set(dice)) == 5 and sum(dice) == 15:
            return 30

    if category == "big_straight":
        if len(set(dice)) == 5 and sum(dice) == 20:
            return 30

    if category == "choice":
        return sum(dice)

    return 0
