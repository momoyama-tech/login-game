//profile
import { atomWithStorage } from "jotai/utils";
import { atom } from 'jotai';

const userNameAtom = atomWithStorage("userName", "");
const emailAtom = atomWithStorage("email", "");
const passwordAtom = atomWithStorage("password", "");
const dateOfBirthAtom = atomWithStorage("dateOfBirth", "");
const addressAtom = atomWithStorage("address", "");


export const timerAtom = atom(0);
export { userNameAtom, emailAtom, passwordAtom, dateOfBirthAtom, addressAtom };
