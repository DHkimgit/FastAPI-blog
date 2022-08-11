import { atom } from "recoil";

const authAtom = atom({
    key: 'auth',
    default: JSON.stringify(localStorage.getItem('user'))
})

export { authAtom }