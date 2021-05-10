import json
import functools
from random import randint
import csv


def read_json(path):
    with open(path) as f:
        return json.load(f)


def write_csv(path, dict):
    try:
        with open(path, 'w') as csvfile:
            colnames = dict.keys()
            writer = csv.DictWriter(csvfile, fieldnames=colnames)
            writer.writeheader()
            for data in dict:
                writer.writerow(data)
    except IOError:
        print("I/O error")


def weighted_choice(weighted_items):
    """[[item1, 20], [item2, 10]]"""
    sum_of_weights = functools.reduce(lambda acc, curr: acc + curr[1], weighted_items, 0)
    rand_weight = randint(1, sum_of_weights)
    for item, weight in weighted_items:
        if rand_weight <= weight:
            return item
        rand_weight -= weight

    # should not reach there
    return weighted_items[-1][0]
