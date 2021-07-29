import {apiPost} from "../apiRequest";

const newAdmission = (name) => {
    return apiPost('admission', {name});
}

export default newAdmission;