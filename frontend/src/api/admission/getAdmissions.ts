import { apiGet } from "../apiRequest";
import Admission from "../../model/Admission";

const getAdmissions = async () => {
    return (await apiGet('admissions')) as Admission[];
}

export default getAdmissions;