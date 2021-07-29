import {apiPost} from "../apiRequest";
import Admission from "../../model/Admission";

const newAdmission = (name: string): Promise<Admission> => {
    return apiPost('admission', {name});
}

export default newAdmission;