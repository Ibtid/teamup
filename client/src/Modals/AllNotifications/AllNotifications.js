import React from 'react';
import ReactDOM from 'react-dom';

import './AllNotifications.css';
import SingleNotice from './SingleNotice';

const AllNotifications = (props) => {
  return ReactDOM.createPortal(
    <div className='allNotifications'>
      <div className='notification__container'>
        {props.notifications.map((dum) => (
          <SingleNotice
            projectName={dum.project}
            subject={dum.subject}
            notification={dum.content}
          />
        ))}
      </div>
    </div>,
    document.getElementById('notificationPortal')
  );
};

export default AllNotifications;
