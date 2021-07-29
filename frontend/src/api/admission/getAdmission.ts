import Admission from "../../model/Admission";
import { apiGet } from "../apiRequest";

const getAdmission = async (id: string): Promise<Admission> => {
    return (await apiGet('admission/'+id)) as Admission;
}

export default getAdmission;