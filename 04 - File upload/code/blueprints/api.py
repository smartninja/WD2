from flask import Blueprint, jsonify, abort, request
from models import get_all_users, get_user, add_user, update_user, delete_user
from config import Permission
from auth import require_api_key, require_permission

api = Blueprint('api', __name__)


@api.route('/users/')
@require_api_key
def list():
    users =  get_all_users()
    
    return jsonify([u.serialize() for u in users])


@api.route('/users/<int:user_id>')
@require_permission(Permission.USERS_READ)
def show(user_id):
    user =  get_user(id=user_id)
    if not user:
        return abort(404)
    
    return jsonify(user.serialize())


@api.route('/users/', methods=['POST'])
@require_permission(Permission.USERS_CREATE)
@require_permission(Permission.USERS_READ)
def store():
    body = request.get_json()
    name = body.get('name', None)
    email = body.get('email', None)
    password = body.get('password', None)

    try:
        user = add_user(email=email, name=name, password=password)
        return jsonify({
            'success': True,
            'created': user.serialize()
        })
    except:
        abort(422)


@api.route('/users/<int:user_id>', methods=['PUT'])
@require_permission(Permission.USERS_CREATE)
@require_permission(Permission.USERS_MANAGE)
def update(user_id):
    body = request.get_json()
    name = body.get('name', None)
    email = body.get('email', None)
    password = body.get('password', None)

    try:
        user = update_user(id=user_id, email=email, name=name, password=password)
        return jsonify({
            'success': True,
            'updated': user.serialize()
        })
    except:
        abort(422)


@api.route('/users/<int:user_id>', methods=['DELETE'])
@require_permission(Permission.USERS_CREATE)
@require_permission(Permission.USERS_MANAGE)
def destroy(user_id):

    try:
        user = delete_user(id=user_id)
        return jsonify({
            'success': True,
            'deleted': f'<User id:{user_id}>'
        })
    except:
        abort(422)