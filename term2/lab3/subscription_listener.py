from threading import Thread
from services.redis_connection import r
import logger


class SubscriptionListener(Thread):
    def __init__(self):
        Thread.__init__(self)

    def run(self):
        pubsub = r.pubsub()
        pubsub.subscribe(['login', 'logout', 'spam'])
        for ev in pubsub.listen():
            if ev['type'] == 'message':
                if ev['channel'] == 'login':
                    logger.login(ev['data'])
                elif ev['channel'] == 'logout':
                    logger.logout(ev['data'])
                elif ev['channel'] == 'spam':
                    logger.spam(ev['data'])

