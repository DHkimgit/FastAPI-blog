import React from 'react';
import { useRecoilValue } from 'recoil';
import { usersAtom } from '../_state';
import { userName } from './LoginPage';

const PostListPage = () => { 
    const username = useRecoilValue(usersAtom);

    return <div>{username}</div>;
 };

 export default PostListPage;