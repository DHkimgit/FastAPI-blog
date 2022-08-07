import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => { 
    const [RegisterValue, setRegisterValue] = useState({
        Name: '',
        Email: '',
        Password: '',
        Confirm_Password: ''
    }
    )
    const {Name, Email, Password, Confirm_Password} = RegisterValue;

    const onChange = (event) => {
        const {value, name} = event.target;
        setRegisterValue({
          ...RegisterValue,
          [name]: value
        });
      };
    
      function varifyPassword(Password, Confirm_Password) {
        if (Password !== Confirm_Password){
            alert('invaild password')
        }
        else{
            return true;
        }
    }
    
    async function Add_acount() {
        if (varifyPassword(Password, Confirm_Password)){
            await axios.post('https://dtakamifastapi.run.goorm.io/user/', {"name": Name, "email": Email, "password": Password})
        .then((res) => console.log(res))
        }
    }

    
    return (
        <div class = 'bg-slate-200 h-screen flex'>
            <div class='w-96 bg-white container mx-auto my-auto shadow-xl'>
                <div class='block pb-8 pt-8 text-center text-xl font-bold tracking-wide'>
                    REACTERS
                </div>
                <div class='ml-4 mr-4'>
                    <div class='mb-2 text-left text-lg font-extrabold'>
                        회원가입
                    </div>
                    <input type="text" name='Name'value={Name} onChange = {onChange} class='text-base w-full border-b border-b-slate-500 pl-1 pt-2 pb-2 mb-4 ' placeholder='Name'></input>
                    <input type="text" name='Email'value={Email} onChange = {onChange} class='text-base w-full border-b border-b-slate-500 pl-1 pt-2 pb-2 mb-4 ' placeholder='Email'></input>
                    <input type="text" name='Password'value={Password} onChange = {onChange} class='text-base w-full border-b border-b-slate-500 pl-1 pt-2 pb-2 mb-5' placeholder='Password'></input>
                    <input type="text" name='Confirm_Password'value={Confirm_Password} onChange = {onChange} class='text-base w-full border-b border-b-slate-500 pl-1 pt-2 pb-2 mb-5' placeholder='Confirm Password'></input>
                    <button onClick={Add_acount} class="py-2 px-4 pt-3 pb-3 w-full font-semibold rounded-lg shadow-md text-white bg-cyan-600 hover:bg-cyan-700 mb-10">
                        회원가입
                    </button>
                    <div class='pb-4 text-right underline'>
                        <Link to='/login'>로그인</Link>
                    </div>
                </div>
            </div>
        </div>
    );
 };

 export default RegisterPage;