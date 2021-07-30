import mongoose from "mongoose";

interface Admission extends mongoose.Document {
    name: string;
    date: Date;
}

const schema = new mongoose.Schema<Admission>({
    name: {
        type: String,
        required: true,
        unique: "Admission with this name already exists",
    },
    date: { type: Date, default: Date.now() },
});

export default mongoose.model<Admission>("Admission", schema);