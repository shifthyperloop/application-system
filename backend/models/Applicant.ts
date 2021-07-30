import mongoose, {Schema, Document} from "mongoose";
import validateEmail from "./validators/emailValidator";
import validatePhoneNumber from "./validators/phoneNumberValidator";

export interface IApplicant extends Document {
    name: string;
    age?: number;
    fieldOfStudy?: string;
    yearOfStudy?: number;
    email?: string;
    phoneNumber?: string;
}

const applicantSchema = new Schema<IApplicant>({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 0,
        max: 200,
    },
    fieldOfStudy: {
        type: String
    },
    yearOfStudy: {
        type: Number,
        min: 1,
        max: 10,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: [validateEmail, "Invalid email"]
    },
    phoneNumber: {
        type: String,
        trim: true,
        validate: [validatePhoneNumber, "Invalid phone number"]
    }
})

const Applicant = mongoose.model<IApplicant>("Applicant", applicantSchema);

module.exports = Applicant;