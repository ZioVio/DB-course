from services.redis_connection import r


def register(username):
    user_key = f"user:{username}"
    r.sadd('users', user_key)
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


def logout(username):
    user_key = f"user:{username}"
    r.srem('users', user_key)

