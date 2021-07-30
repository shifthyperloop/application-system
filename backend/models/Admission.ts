import mongoose, {Schema} from "mongoose";

export interface IAdmission extends mongoose.Document {
    name: string;
    date: Date;
    deleteData: Date;
    userIds: string[];
    admittingLeaders: boolean;
    admittingMembers: boolean;
}

const schema = new Schema<IAdmission>({
    name: {
        type: String,
        required: true,
        unique: "Admission with this name already exists",
    },
    date: {
        type: Date,
        default: Date.now()
    },
    deleteDate: {
        required: true,
        type: Date,
    },
    userIds: {
        required: true,
        type: [Schema.Types.ObjectId],
    },
    admittingLeaders: {
        required: true,
        type: Boolean,
    },
    admittingMembers: {
        required: true,
        type: Boolean,
    }
});

export default mongoose.model<IAdmission>("Admission", schema);