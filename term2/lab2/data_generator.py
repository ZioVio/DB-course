from faker import Faker
from random import choice, randint
from services.redis_connection import r
import services.messages_service as messages_service
import services.users_service as users_service


class DataGenerator:
    def __init__(self):
        self.__fake = Faker()

    def start(self):
        r.flushall()
        count = 10
        users = self.__users(count)
        messages = self.__messages(count)
        for user in users:
            users_service.register(user)

        for i in range(count):
            random_messages_count = randint(0, 10)
            sender = users[i]
            other_users = users[0:i] + users[i + 1:]
            for j in range(random_messages_count):
                receiver = choice(other_users)
                message = choice(messages)
                messages_service.send_message(message, sender, receiver)




    def __users(self, count = 20):
        """Generates "count" of usernames"""
        return [self.__fake.unique.first_name() for _ in range(count)]


    def __messages(self, count = 20):
        """"Count random message texts"""
        return [
            (self.__fake.sentence(nb_words=5) + ('spam' if choice([True, False]) else ''))
            for _ in range(count)
        ]


def main():
    data_gen = DataGenerator()
    data_gen.start()


if __name__ == '__main__':
    main()