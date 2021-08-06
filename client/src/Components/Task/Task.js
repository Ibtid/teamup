import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UpdateTask from '../../Modals/UpdateTask/UpdateTask';

import './Task.css';

const useStyles = makeStyles((theme) => ({
  purple: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const Task = (props) => {
  const classes = useStyles();
  const activeClassName =
    props.status === 'Pending' ? 'not_active' : 'yes_active';
  const activeClassText = props.status === 'Pending' ? 'Not active' : 'active';

  const [openUpdateTask, setOpenUpdateTask] = useState(false);

  return (
    <>
      {openUpdateTask && props.status === 'Pending' && (
        <UpdateTask
          _id={props._id}
          points={props.points}
          assignedTo={props.assignedTo}
          close={() => {
            setOpenUpdateTask(false);
            props.switchReloadSignal();
          }}
          story={props.story}
        />
      )}
      <div
        className={`task ${props.evenly}`}
        onClick={() => {
          setOpenUpdateTask(true);
        }}>
        <div className={`bullet ${props.noMargin}`}>
          <div className={props.color}></div>
        </div>
        <div className={`task__text ${props.smallText} ${props.putWhitespace}`}>
          {props.story}
        </div>
        <div className={`task__image ${props.noDisplay}`}>
          <Avatar
            className={classes.purple}
            src={`http://localhost:5000/${props.image}`}
          />
          <div className={`${activeClassName} ${props.noStatus}`}>
            {activeClassText}
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
