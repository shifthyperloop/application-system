import {apiPost} from "../apiRequest";
import {loggedInStore} from "../../store/authStore";

const logout = async (): Promise<void> => {
  await apiPost('auth/logout', {});
  loggedInStore.set(null);
}

export default logout;