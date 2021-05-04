from services.redis_connection import r
from services.neo4j_connection import g
from message_state import MessageState

def get_next_message_id_save():
    next_message_id = r.get('message:id')
    save_next_id = next_message_id if next_message_id is not None else 1
    r.set('message:id', save_next_id)
    r.incr('message:id')
    return save_next_id


MESSAGE_ID_LENGTH = 10

MESSAGES_QUEUE_KEY = 'messages'


def get_message_by_id(message_id):
    sender_name, receiver_name, text, status = r.hmget(
        message_id, [
            'sender-name',
            'receiver-name',
            'text',
            'status'
        ]
    )
    return {
        'id': message_id,
        'sender-name': sender_name,
        'receiver-name': receiver_name,
        'text': text,
        'status': status,
    }


def send_message(text, username_from, username_to, tags=","):
    massage_id = get_next_message_id_save()
    message_key = f"message:{massage_id}"
    user_key = f"user:{username_from}"
    r.sadd(f'messages-sent-to:{username_to}', massage_id)
    message_dict = {
        'id': massage_id,
        'sender-name': username_from,
        'receiver-name': username_to,
        'text': text,
        'status': MessageState.CREATED,
        'tags': tags,
    }
    r.hmset(message_key, message_dict)
    g.add_message(message_dict)

    r.hincrby(user_key, 'created-count', 1)
    r.hincrby(user_key, 'total-count', 1)
    r.rpush(MESSAGES_QUEUE_KEY, f"message:{massage_id}")
    r.hmset(message_key, {
        'status': MessageState.IN_QUEUE,
    })
    r.hincrby(user_key, 'created-count', -1)
    r.hincrby(user_key, 'in-queue-count', 1)
    r.zincrby('sent-count', 1, username_from)


def get_user_incoming_messages(username):
    messages = r.smembers(f'messages-sent-to:{username}')
    return messages


def message_to_string(message_id):
    message = get_message_by_id(message_id)
    result = (
            f"Id: {message['id']} " +
            f"From: {message['sender-name']} to {message['receiver-name']}\n" +
            f"Status: {message['status']}\n" +
            f"Text: {message['text']}"
    )
    return result


def get_user_messages_stats(username):
    user_key = f"user:{username}"
    created, in_queue, spam_checking, spam, sent, delivered, total = r.hmget(
        user_key, [
            'created-count',
            'in-queue-count',
            'spam-checking-count',
            'spam-count',
            'sent-count',
            'delivered-count',
            'total-count'
        ]
    )

    result_dict = {
        MessageState.CREATED: created,
        MessageState.IN_QUEUE: in_queue,
        MessageState.IN_SPAM_CHECKING: spam_checking,
        MessageState.BLOCKED_BY_SPAM: spam,
        MessageState.SENT: sent,
        MessageState.DELIVERED: delivered,
    }

    return result_dict, total


def get_next_queue_message():
    message_id = r.lpop(MESSAGES_QUEUE_KEY)
    if message_id is None:
        return None
    return get_message_by_id(message_id)


def spam_message_check(message):
    message_key = message['id']
    r.hset(message_key, 'status', MessageState.IN_SPAM_CHECKING)
    sender_key = f"user:{message['sender-name']}"

    r.hincrby(sender_key, 'in-queue-count', -1)
    r.hincrby(sender_key, 'spam-checking-count', 1)

    spam_checking_result = is_spam(message)
    r.hincrby(sender_key, 'spam-checking-count', -1)
    return spam_checking_result


def is_spam(message):
    message_text = message['text']
    message_tags = message['tags']
    if message_text:
        return 'spam' in message_text or 'spam' in message_tags
    return False


def on_message_spam(message):
    print(f"Found spam message with id: {message['id']} from {message['sender-name']}")
    message_key = message['id']
    sender_key = f"user:{message['sender-name']}"
    r.hset(message_key, 'status', MessageState.BLOCKED_BY_SPAM)
    r.hincrby(sender_key, 'spam-count', 1)
    r.zincrby('spam-count', 1, sender_key)
    r.publish('spam', message['sender-name'])


def on_message_not_spam(message):
    print(f"Processed message with id: {message['id']} from \"{message['sender-name']}\". Not spam")
    message_key = message['id']
    sender_key = f"user:{message['sender-name']}"
    r.zincrby('sent-count', 1, sender_key)
    r.hincrby(sender_key, 'sent-count', 1)
    r.hset(message_key, 'status', MessageState.SENT)
