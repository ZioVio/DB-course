import logging
import os
from pathlib import Path

LOG_FORMAT = "%(asctime)s::%(levelname)s::%(message)s"

LOGS_FILENAME = os.path.join(os.path.dirname(Path(__file__).absolute()), 'actions.txt')
logging.basicConfig(level='INFO', format=LOG_FORMAT, filename=LOGS_FILENAME)


def login(username):
    logging.info(f'LOGIN: {username}')


def logout(username):
    logging.info(f'LOGOUT: {username}')


def spam(sender_name):
    logging.info(f'SPAM from "{sender_name}"')


def get_logs():
    try:
        with open(LOGS_FILENAME) as f:
            return f.read()
    except Exception:
        return "ERROR GETTING LOGS"
