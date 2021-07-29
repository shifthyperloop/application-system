import {apiPost} from "../apiRequest";
import User from "../../model/User";
import {loggedInStore} from "../../store/authStore";

const signup = async (email: string, name: string, password: string): Promise<User> => {
    const user: User = await apiPost('auth/signup', { email, name, password });
    loggedInStore.set(user);
    return user;
}

export default signup;