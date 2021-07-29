import {apiGet} from "../apiRequest";
import User from "../../model/User";
import {loggedInStore} from "../../store/authStore";

const getLoggedIn = async (): Promise<User> => {
  const user: User = await apiGet('auth/loggedIn');
  loggedInStore.set(user);
  return user;
}

export default getLoggedIn;