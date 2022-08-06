import './App.css';
import PostListPage from './pages/PostListPage';
import { Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <>
      <Route component={PostListPage} path={['/@:username', '/']} exact />
      <Route component={LoginPage} path='/login' />
      <Route component={RegisterPage} path='/register' />
      <Route component={WritePage} path='/write' />
      <Route component={PostPage} path='/@username/:postId' />
    </>
  );
}

export default App;
