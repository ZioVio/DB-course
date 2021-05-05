from faker import Faker
from random import choice, randint
from services.redis_connection import r
import services.messages_service as messages_service
import services.users_service as users_service


class DataGenerator:
    tags = [
        'long', 'extra', 'suspicious', 'animals', 'relations', 'sports', 'education', 'private', 'another tag-like word', 'spam'
    ]
    def __init__(self):
        self.__fake = Faker()

    def start(self):
        r.flushall()
        count = 20
        users = self.__users(count)
        messages = self.__messages(count)
        for user in users:
            users_service.register(user)

        for i in range(count):
            random_messages_count = randint(0, 5)
            sender = users[i]
            other_users = users[0:i] + users[i + 1:]
            for j in range(random_messages_count):
                receiver = choice(other_users)
                message = choice(messages)
                tags_count = randint(0, len(self.tags) // 2)
                random_tags = '' if tags_count == 0 else ','.join(set(choice(self.tags) for _ in range(tags_count)))
                messages_service.send_message(message, sender, receiver, random_tags)




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