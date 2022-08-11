import './App.css';
import PostListPage from './pages/PostListPage';
import { Route, Router } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostPage from './pages/PostPage';
import { RecoilRoot } from 'recoil';
import { history } from './/_helpers';

function App() {
  return (
    <>
      <RecoilRoot>
        <Router history={history}>
          <Route component={PostListPage} path={['/@:username', '/']} exact />
          <Route component={LoginPage} path='/login' />
          <Route component={RegisterPage} path='/register' />
          <Route component={WritePage} path='/write' />
          <Route component={PostPage} path='/@username/:postId' />
        </Router>
      </RecoilRoot>
    </>
  );
}

export default App;
