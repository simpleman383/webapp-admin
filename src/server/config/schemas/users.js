import mongoose, { autoIncrement } from './connection';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    hash: String,
    salt: String,
    creationDate: Date,
    lastAccessDate: Date,
})

UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    delete obj._id;
    delete obj.__v;
    return obj;
}

UserSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'id',
    startAt: 1
})


UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {   
    const today = new Date();
    const expirationDate = new Date(today)
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
        username: this.username,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'paytureForever!');
}

  
UserSchema.methods.toAuthJSON = function() {
    return {
      id: this.id,
      username: this.username,
      token: this.generateJWT(),
    };
};

const User = mongoose.model('User', UserSchema, 'users');

export default User;


