import services.messages_service as messages_service
from random import randint
from time import sleep
from services.redis_connection import r
from threading import Thread
from subscription_listener import SubscriptionListener

DELAY = randint(1, 5)


class MessageWorker(Thread):
    def __init__(self):
        Thread.__init__(self)
        pass

    def run(self):
        messages = r.lrange('messages', 0, 10)
        print(messages, '10 last messages is queue')
        while True:
            message = messages_service.get_next_queue_message()
            pass
            if message is None:
                continue
            self.process_message(message)


    def process_message(self, message):
        is_spam = messages_service.spam_message_check(message)
        sleep(DELAY)
        if is_spam:
            messages_service.on_message_spam(message)
        else:
            messages_service.on_message_not_spam(message)


def main():
    subs_listener = SubscriptionListener()
    subs_listener.setDaemon(True)
    subs_listener.start()
    worker = MessageWorker()
    worker.daemon = True
    worker.start()
    while True:
        pass


if __name__ == '__main__':
    main()
