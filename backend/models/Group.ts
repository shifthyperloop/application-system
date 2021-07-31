import {Schema, Document, model} from "mongoose";

export interface IGroup extends Document {
  admissionId: string,
  name: string,
}

const schema = new Schema<IGroup>({
  admissionId: {
    required: true,
    type: Schema.Types.ObjectId,
  },
  name: {
    required: true,
    type: String,
  }
});

const Group = model<IGroup>("Group", schema);

export default Group;