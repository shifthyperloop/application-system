import mongoose from "mongoose";

export interface IAdmission extends mongoose.Document {
    name: string;
    date: Date;
}

const schema = new mongoose.Schema<IAdmission>({
    name: {
        type: String,
        required: true,
        unique: "Admission with this name already exists",
    },
    date: { type: Date, default: Date.now() },
});

export default mongoose.model<IAdmission>("Admission", schema);