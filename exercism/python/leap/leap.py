#!/usr/bin/python3
## sweet solution from akostic-kostile:
def leap_year(year):
    return year % 4 == 0 and (year % 100 != 0 or year % 400 == 0)

## my solution:
#def leap_year(year):
#    if year % 100 == 0 and year % 400 == 0 and year % 4 == 0:
#        return True
#    elif year % 4 == 0:
#        if year % 100 == 0:
#            return False
#        return True
#    else:
#        return False



