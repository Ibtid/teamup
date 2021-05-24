import './App.css';
import Signin from './Pages/Signin/Signin';
import Signup from './Pages/Signup/Signup';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Project from './Pages/Project/Project';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Taskboard from './Pages/Taskboard/Taskboard';
import Scrumboard from './Pages/Scrumboard/Scrumboard';
import CollabBoard from './Pages/CollabBoard/CollabBoard';
import Reports from './Pages/Reports/Reports';
import Team from './Pages/Team/Team';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/signin'>
          <Signin />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/project'>
          <Project />
        </Route>
        <Route path='/dashboard/:projectId'>
          <Navbar />
          <div className='app__flexSidebar'>
            <Sidebar />
            <Dashboard />
          </div>
        </Route>
        <Route path='/taskboard/:projectId'>
          <Navbar />
          <div className='app__flexSidebar'>
            <Sidebar />
            <Taskboard />
          </div>
        </Route>
        <Route path='/scrumboard/:projectId'>
          <Navbar />
          <div className='app__flexSidebar'>
            <Sidebar />
            <Scrumboard />
          </div>
        </Route>
        <Route path='/collabboard/:projectId'>
          <Navbar />
          <div className='app__flexSidebar'>
            <Sidebar />
            <CollabBoard />
          </div>
        </Route>
        <Route path='/reports/:projectId'>
          <Navbar />
          <div className='app__flexSidebar'>
            <Sidebar />
            <Reports />
          </div>
        </Route>
        <Route path='/team/:projectId'>
          <Navbar />
          <div className='app__flexSidebar'>
            <Sidebar />
            <Team />
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
