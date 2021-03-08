import random
from string import digits, ascii_letters


def get_random_string(length):
    letters = digits + ascii_letters
    return ''.join(random.choice(letters) for i in range(length))
