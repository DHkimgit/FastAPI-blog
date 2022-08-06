import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom'

const LoginPage = () => { 
    
    
    
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
                    <input type="text" class='text-base w-full border-b border-b-slate-500 pl-1 pt-2 pb-2 mb-4 ' placeholder='Email'></input>
                    <input type="text" class='text-base w-full border-b border-b-slate-500 pl-1 pt-2 pb-2 mb-5' placeholder='Password'></input>
                    <button class="py-2 px-4 pt-3 pb-3 w-full font-semibold rounded-lg shadow-md text-white bg-cyan-600 hover:bg-cyan-700 mb-10">
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