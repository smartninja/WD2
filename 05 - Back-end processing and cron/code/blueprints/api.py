from flask import Blueprint, jsonify, abort, request, url_for, send_from_directory
from models import get_all_users, get_user, add_user, update_user, delete_user
from config import Permission, UPLOAD_FOLDER
from auth import require_api_key, require_permission
import os
import uuid

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


@api.route('/users/<user_id>/avatar', methods=['GET'])
def avatar_show(user_id):
    user = get_user(id=user_id)
    if not user:
        abort(404)
    return send_from_directory('upload', user.avatar_file)


def allowed_type(filename):
    print(filename)
    ALOWED_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webb']
    return  '.' in filename  and \
        filename.rsplit('.', 1)[1].lower() in ALOWED_TYPES

def protect_filename(filename):
    sufix = filename.rsplit('.', 1)[1].lower()
    return str(uuid.uuid4()) + '.' + sufix


@api.route('/users/<user_id>/avatar', methods=['POST'])
def avatar_crete(user_id):
    if 'avatar' not in request.files:
        return jsonify({
            'error': 'expected \'avatar\' field'
        }), 422
    
    file = request.files['avatar']

    if not allowed_type(filename=file.filename):
        abort(422)
    
    filename = protect_filename(file.filename)


    file.save(os.path.join(UPLOAD_FOLDER, filename))
    update_user(user_id, avatar_file=filename)

    return jsonify({
        'message': 'Upload Successful',
        'path': url_for('api.avatar_show', user_id=user_id)
    })

