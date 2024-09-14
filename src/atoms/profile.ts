//profile
import { atomWithStorage } from "jotai/utils";

const userNameAtom = atomWithStorage("userName", "");
const emailAtom = atomWithStorage("email", "");
const passwordAtom = atomWithStorage("password", "");
const dateOfBirthAtom = atomWithStorage("dateOfBirth", "");
const addressAtom = atomWithStorage("address", "");

export { userNameAtom, emailAtom, passwordAtom, dateOfBirthAtom, addressAtom };