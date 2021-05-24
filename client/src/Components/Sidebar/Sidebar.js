import React from 'react';
import './Sidebar.css';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import BrushIcon from '@material-ui/icons/Brush';
import GroupIcon from '@material-ui/icons/Group';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import NoteIcon from '@material-ui/icons/Note';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar__container'>
        <NavLink
          to='/dashboard/:projectId'
          activeStyle={{ color: '#ff8c42' }}
          className='sidebar__tab'>
          <div className='sidebar__tabIcon'>
            <DashboardIcon />
          </div>
          <div className='sidebar__tabText'>Dashboard</div>
        </NavLink>
        <NavLink
          to='/taskboard/:projectId'
          activeStyle={{ color: '#ff8c42' }}
          className='sidebar__tab'>
          <div className='sidebar__tabIcon'>
            <LibraryBooksIcon />
          </div>
          <div className='sidebar__tabText'>Task Board</div>
        </NavLink>
        <NavLink
          to='/scrumboard/:projectId'
          activeStyle={{ color: '#ff8c42' }}
          className='sidebar__tab'>
          <div className='sidebar__tabIcon'>
            <NoteIcon />
          </div>
          <div className='sidebar__tabText'>Scrum Board</div>
        </NavLink>
        <NavLink
          to='/collabboard/:projectId'
          activeStyle={{ color: '#ff8c42' }}
          className='sidebar__tab'>
          <div className='sidebar__tabIcon'>
            <BrushIcon />
          </div>
          <div className='sidebar__tabText'>Collab Board</div>
        </NavLink>
        <NavLink
          to='/reports/:projectId'
          activeStyle={{ color: '#ff8c42' }}
          className='sidebar__tab'>
          <div className='sidebar__tabIcon'>
            <InsertChartIcon />
          </div>
          <div className='sidebar__tabText'>Reports</div>
        </NavLink>
        <NavLink
          to='/team/:projectId'
          activeStyle={{ color: '#ff8c42' }}
          className='sidebar__tab'>
          <div className='sidebar__tabIcon'>
            <GroupIcon />
          </div>
          <div className='sidebar__tabText'>Team</div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
