from services.redis_connection import r
from message_state import MessageState

MESSAGE_ID_LENGTH = 10
MESSAGES_QUEUE_KEY = 'messages'

r.set('message:id', 1)


def get_message_by_id(message_id):
    sender_name, receiver_name, text, status = r.hmget(
        f'message:{message_id}', [
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


def send_message(text, username_from, username_to):
    massage_id = r.get('message:id')
    r.incr('message:id')
    message_key = f"message:{massage_id}"
    user_key = f"user:{username_from}"
    r.sadd(f'messages-sent-to:{username_to}', massage_id)
    r.hmset(message_key, {
        'id': massage_id,
        'sender-name': username_from,
        'receiver-name': username_to,
        'text': text,
        'status': MessageState.CREATED
    })
    r.hincrby(user_key, 'created-count', 1)
    r.hincrby(user_key, 'total-count', 1)
    r.rpush(MESSAGES_QUEUE_KEY, f"message:{massage_id}")
    r.hmset(message_key, {
        'status': MessageState.IN_QUEUE,
    })
    r.hincrby(user_key, 'created-count', -1)
    r.hincrby(user_key, 'in-queue-count', 1)
    r.zincrby("sent-count", 1, username_from)


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
