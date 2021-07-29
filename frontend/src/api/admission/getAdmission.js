import { apiGet } from "../apiRequest";

const getAdmissions = (id) => {
    return apiGet('admission/'+id);
}

export default getAdmissions;