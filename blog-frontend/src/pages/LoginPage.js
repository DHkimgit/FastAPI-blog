import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { atom } from 'recoil';

const useracesstoken = atom({
    key: 'useracesstoken',
    default: ''
});

const userloginstate = atom({
    key: 'userloginstate',
    default: false
});

var stringify = require('qs-stringify')

// https://stackoverflow.com/questions/66047285/react-axios-post-oauth2-username-and-password-fails-on-fastapi-backend
function LoginPage(){ 
    const [userAcessKey, setUserAcessKey] = useRecoilState(useracesstoken);
    const [loginstate, setLoginState] = useRecoilState(userloginstate);
    const [LoginValue, setLoginValue] = useState({
        Email: '',
        Password: '',
    })
    const {Email, Password} = LoginValue;

    const onChange = (event) => {
        const {value, name} = event.target;
        setLoginValue({
          ...LoginValue,
          [name]: value
        });
      };
    
    const params = stringify({
        'username': Email,
        'password': Password
    });

    async function Login(){
        axios.post("https://dtakamifastapi.run.goorm.io/login", params)
        .then(result => {
            if (result.status === 200){
                console.log(result.data);
                setUserAcessKey(result.data.access_token);
                setLoginState(true);
            }
        })
    }

    return (
        <div class = 'bg-slate-200 h-screen flex'>
            <div class='w-96 bg-white container mx-auto my-auto shadow-xl'>
                <div class='block pb-8 pt-8 text-center text-xl font-bold tracking-wide'>
                    REACTERS
                </div>
                <div class='ml-4 mr-4'>
                    <div class='mb-2 text-left text-lg font-extrabold'>
                        로그인
                    </div>
                    <input type="text" name='Email'value={Email} onChange = {onChange} class='text-base w-full border-b border-b-slate-500 pl-1 pt-2 pb-2 mb-4 ' placeholder='Email'></input>
                    <input type="text" name='Password'value={Password} onChange = {onChange} class='text-base w-full border-b border-b-slate-500 pl-1 pt-2 pb-2 mb-5' placeholder='Password'></input>
                    <button onClick={Login} class="py-2 px-4 pt-3 pb-3 w-full font-semibold rounded-lg shadow-md text-white bg-cyan-600 hover:bg-cyan-700 mb-10">
                        로그인
                    </button>
                    <div class='pb-4 text-right underline'>
                        <Link to='/register'>회원가입</Link>
                    </div>
                </div>
            </div>
        </div>
    );
 };

 export default LoginPage;