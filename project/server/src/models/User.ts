import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'seller' | 'admin';
  tokens: { token: string }[];
  generateAuthToken(): Promise<string>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['customer', 'seller', 'admin'],
    default: 'customer'
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Generate auth token
userSchema.methods.generateAuthToken = async function() {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET as string);
  this.tokens = this.tokens.concat({ token });
  await this.save();
  return token;
};

export const User = mongoose.model<IUser>('User', userSchema); 