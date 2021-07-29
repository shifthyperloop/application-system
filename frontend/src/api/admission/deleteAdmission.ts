import { apiDelete } from "../apiRequest";

const deleteAdmission = (id: string): Promise<void> => {
    return apiDelete('admission/'+id);
}

export default deleteAdmission;