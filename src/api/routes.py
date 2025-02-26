
from datetime import timedelta
from flask import Blueprint
from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, jwt_required
from pydantic import ValidationError
from sqlalchemy.exc import SQLAlchemyError
from api.models import User, db
from flask_cors import CORS




api = Blueprint('api', __name__)
CORS (api)
bcrypt = Bcrypt()

@api.route('/register', methods=['POST'])
def register():
    try:
        user_data = request.get_json()
    except ValidationError as e:
        error_messages = []
        for error in e.errors():
            if error['type'] == 'missing':
                error_messages.append(f"Field '{error['loc'][0]}' is required.")
            else:
                error_messages.append(error['msg'])

        return jsonify({"errors": error_messages}), 400
    

    hashed_password = bcrypt.generate_password_hash(user_data['password']).decode('utf-8')
    # user = user_data.model_dump()
    new_user = User(email = user_data['email'],password = hashed_password, username = user_data['username'])
    
    try:
        db.session.add(new_user)
        db.session.flush()  
        db.session.commit()
    
    except SQLAlchemyError as e:
        db.session.rollback()
        return jsonify({
            "msg": "Error during registration",
            "error": str(e)
        }), 500
    
    return jsonify(new_user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    user_data = request.get_json()
    user = User.query.filter_by(email=user_data["email"]).first()
    if user is None:
        return jsonify({"msg": "Bad email"}), 401
    
    if not user.password:
        return jsonify({"msg": "Error con la contraseña"}), 401
    
    if bcrypt.check_password_hash(user.password, user_data["password"]):
        access_token = create_access_token(identity=user.email)
        return jsonify(access_token=access_token, user=user.serialize())
    
    return jsonify({"msg": "Bad password"}), 401

@api.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]  
    
    return jsonify(msg="Logout successful")