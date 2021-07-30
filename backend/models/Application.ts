import mongoose, {Document, Schema} from "mongoose";

export interface ILeaderApplication {
    leaderExperience: string,
    leaderMotivation: string,
}

const leaderApplicationSchema = new Schema<IApplication>({
    leaderExperience: {
        required: true,
        type: String,
    },
    leaderMotivation: {
        required: true,
        type: String,
    },
});

export interface IBaseApplication {
    experience: string,
    motivation: string,
    minHours: number,
    maxHours: number,
    other?: string,
}

const baseApplicationSchema = new Schema<IApplication>({
    experience: {
        required: true,
        type: String,
    },
    motivation: {
        required: true,
        type: String,
    },
    minHours: {
        required: true,
        type: Number,
        min: 0,
        max: 40,
    },
    maxHours: {
        required: true,
        type: Number,
        min: 0,
        max: 40,
    },
    other: {
        type: String,
    }
});

export interface IApplication extends Document{
    admissionId: string,
    applicantId: string,
    wantedGroups: string[],
    leaderApplication?: ILeaderApplication,
    applyingForMember: boolean,
    baseApplication: IBaseApplication,
    acceptedPrivacyAgreement: boolean,
    applicationReviewId?: string,
}

const applicationSchema = new Schema<IApplication>({
    admissionId: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    applicantId: {
        required: true,
        type: Schema.Types.ObjectId,
    },
    wantedGroups: {
        required: true,
        type: [String]
    },
    leaderApplication: {
        type: leaderApplicationSchema,
    },
    applyingForMember: {
        required: true,
        type: Boolean,
    },
    baseApplication: {
        required: true,
        type: baseApplicationSchema,
    },
    acceptedPrivacyAgreement: {
        required: true,
        type: Boolean,
        validate: (value) => value,
    },
    applicationReviewId: {
        type: Schema.Types.ObjectId,
    },
});

const Application = mongoose.model<IApplication>("Application", applicationSchema);

module.exports = Application;