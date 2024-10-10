from flask import request, abort
from config import API_KEYS
import functools

def get_api_key_or_abort():
    key = request.headers.get('X-API-KEY')

    if not key:
        abort(401)
    if key not in API_KEYS:
        abort(403)

    return key


def require_api_key(func):  

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        key = request.headers.get('X-API-KEY')

        if not key:
            abort(401)
        if key not in API_KEYS:
            abort(403)

        return func(*args, **kwargs)
    
    return wrapper

def require_permission(permission):
    def decorator(f):
        @functools.wraps(f)
        def decorated_function(*args, **kwargs):
            key = get_api_key_or_abort()

            if permission not in API_KEYS[key]:
                abort(403)
            return f(*args, **kwargs)

        return decorated_function
    
    return decorator
