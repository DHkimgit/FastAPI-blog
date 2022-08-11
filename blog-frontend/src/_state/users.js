import { atom } from "recoil";

const usersAtom = atom({
    key: 'user',
    default: null
});

export {usersAtom};