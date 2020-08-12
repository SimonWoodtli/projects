#!/usr/bin/python3

from datetime import timedelta


def add(moment):
    """Returns the moment in time + 10**9 seconds."""
    return moment + timedelta(0, 10**9)
