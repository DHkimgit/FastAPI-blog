import { useSetRecoilState } from "recoil";
import { authAtom, usersAtom } from '../_state';
import { history } from '../_helpers';
import axios from 'axios';

function useUserActions() {
    const setAuth = useSetRecoilState(authAtom);
    const setUser = useSetRecoilState(usersAtom);

    return {
        login,
        logout
    }

    async function login(Email, Password) {
        const loginParams = stringify({
            'username': Email,
            'password': Password
        }); 

        return axios.post("https://dtakamifastapi.run.goorm.io/login", loginParams)
        .then(result => {
            if (result.status === 200){
                localStorage.setItem('user', JSON.stringify(result.data.access_token));
                setAuth(result.data.access_token);
                setUser(result.data.user.name);
                const { form } = history.location.state || {form : { pathname: '/PostListPage'}}
                history.push(form)
            }
        })
    }

    function logout() {
        // remove user from local storage, set auth state to null and redirect to login page
        localStorage.removeItem('user');
        setAuth(null);
        history.push('/login');
    }
}
export {useUserActions};