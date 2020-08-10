#!/usr/bin/python3
## Solution 1
def reverse(text):
    opposite=[]
    for char in text:
        opposite.append(char)
    opposite.reverse()
    return "".join(opposite)

print(reverse("hello"))

## Solution 2
def reverse(text):
    return text[::-1]
