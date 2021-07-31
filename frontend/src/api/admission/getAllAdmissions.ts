import { apiGet } from "../apiRequest";
import Admission from "../../model/Admission";

const getAllAdmissions = async () => {
    return (await apiGet('admission/all')) as Admission[];
}

export default getAllAdmissions;