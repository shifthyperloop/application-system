import validateEmail from './validators/emailValidator';
import bcrypt from 'bcrypt';
import {Schema, model, Document} from 'mongoose';
import {NextFunction} from "express";

const SALT_WORK_FACTOR = 10;

export interface IUser extends Document {
    email: string;
    name: string;
    password: string;
    registeredDate: Date;

    comparePassword(password: string): Promise<boolean>;
    getPublicFields(): PublicUser;
}

const schema = new Schema<IUser>({
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

schema.pre('save', function(next: NextFunction): void {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err: any, salt: string) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err: any, hash: string) => {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

schema.methods.comparePassword = function(candidatePassword: string): Promise<boolean> {
    return new Promise(((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err: any, isMatch: boolean) => {
            if (err) reject(err);
            resolve(isMatch);
        });
    }))
};

interface PublicUser {
    name: string,
    _id: any,
    email: string
}

schema.methods.getPublicFields = function(): PublicUser {
    return {
        _id: this._id,
        email: this.email,
        name: this.name,
    }
};


export default model<IUser>("User", schema);