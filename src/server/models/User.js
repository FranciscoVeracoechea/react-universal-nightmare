import mongoose, { Schema } from 'mongoose';
// import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';


const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  salt: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

UserSchema.methods.encryptPassword = function encryptPassword(password) {
  return crypto.createHmac('sha512', this.salt).update(password).digest('hex');
};

UserSchema.virtual('userId')
  .get(function getUserId() {
    return this.id;
  });

UserSchema.methods.checkPassword = function checkPassword(password) {
  return this.encryptPassword(password) === this.password;
};

UserSchema.pre('save', function presave(next) {
  this.salt = crypto.randomBytes(128).toString('hex');
  this.password = this.encryptPassword(this.password);
  next();
});

export default mongoose.model('User', UserSchema);
