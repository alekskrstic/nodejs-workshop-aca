import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isLength(value, { min: 3, max: 16 });
      },
      message: "Username must be between 3 and 16 characters long.",
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: "Email is invalid.",
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value, {
          minLength: 8,
          minUppercase: 2,
          minNumbers: 2,
          minSymbols: 2,
        });
      },
      message: "Password is not strong enough.",
    },
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  roles: {
    type: [String],
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return undefined;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return undefined;
    }

    return user;
  } catch (err) {
    throw err;
  }
};

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 12);
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
