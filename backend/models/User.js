const validateEmail = require("./validators/emailValidator");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const schema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        index: true,
        unique: "Email already registered",
        required: "Email required",
        validate: [validateEmail, "Invalid email"]
    },
    name: {
        type: String,
        required: "Name required"
    },
    password: {
        type: String,
        required: "Password required"
    },
    registeredDate: {
        type: Date,
        default: Date.now()
    },
});

schema.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function(candidatePassword) {
    return new Promise(((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) reject(err);
            resolve(isMatch);
        });
    }))
};

schema.methods.getPublicFields = function() {
    return {
        _id: this._id,
        email: this.email,
        name: this.name,
    }
};


module.exports = mongoose.model("User", schema);