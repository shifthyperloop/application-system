import {writable} from "svelte/store";
import User from "../model/User";

export const loggedInStore = writable<User>(null);