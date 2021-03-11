import services.messages_service as messages_service
from random import randint
from time import sleep
from services.redis_connection import r

DELAY = randint(1, 5)

class MessageWorker:
    def __init__(self):
        pass


    def start(self):
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
    worker = MessageWorker()
    worker.start()


if __name__ == '__main__':
    main()
