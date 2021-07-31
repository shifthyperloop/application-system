import {apiPost} from "../apiRequest";
import Admission from "../../model/Admission";

export interface NewAdmissionRequest {
    name: string;
    admittingLeaders: boolean;
    admittingMembers: boolean;
    userIds: string[];
    groupNames: string[];
    deleteDate: Date;
}

const newAdmission = (data: NewAdmissionRequest): Promise<Admission> => {
    return apiPost('admission', {...data});
}

export default newAdmission;