from services.redis_connection import r


def register(username):
    user_key = f"user:{username}"
    r.sadd('users', username)
    user_exists = r.exists(user_key)
    if user_exists:
        return
    r.hmset(user_key, {
        'username': username,
        'created-count': 0,
        'in-queue-count': 0,
        'spam-checking-count': 0,
        'spam-count': 0,
        'sent-count': 0,
        'delivered-count': 0,
        'total-count': 0,
    })
    r.publish('login', username)


def logout(username):
    r.publish('logout', username)
    r.srem('users', username)


def get_users_online():
    return r.smembers('users')


def get_most_active_senders():
    top_senders_count = 10
    return r.zrange('sent-count', 0, top_senders_count, desc=True, withscores=True)


def get_most_active_spammers():
    top_spammers_count = 10
    return r.zrange('spam-count', 0, top_spammers_count, desc=True, withscores=True)

