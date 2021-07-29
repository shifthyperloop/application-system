import { apiGet } from "../apiRequest";

const getAdmissions = () => {
    return apiGet('admissions');
}

export default getAdmissions;