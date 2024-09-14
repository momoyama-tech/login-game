import { atomWithStorage } from "jotai/utils";

const emailAtom = atomWithStorage("email", "");
const passwordAtom = atomWithStorage("password", "");

export { emailAtom, passwordAtom };
