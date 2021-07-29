import {apiPost} from "../apiRequest";
import User from "../../model/User";
import {loggedInStore} from "../../store/authStore";

const login = async (email: string, password: string): Promise<User> => {
  const user: User = await apiPost('auth/login', { email, password});
  loggedInStore.set(user);
  return user;
}

export default login;