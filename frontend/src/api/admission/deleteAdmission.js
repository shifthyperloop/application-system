import { apiDelete } from "../apiRequest";

const deleteAdmission = (id) => {
    return apiDelete('admission/'+id);
}

export default deleteAdmission;