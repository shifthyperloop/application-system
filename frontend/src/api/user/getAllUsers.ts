import { apiGet } from "../apiRequest";
import User from "../../model/User";

const getAllUsers = async () => {
  return (await apiGet('user/all')) as User[];
}

export default getAllUsers;