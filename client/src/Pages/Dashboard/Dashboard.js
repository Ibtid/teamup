import React, { useState, useEffect } from 'react';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import './Dashboard.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';
import Scrollable from '../../Components/Scrollable/Scrollable';
import Spinkit from '../../Modals/Spinkit/Spinkit';
import { getMyTask, listTasksByProjectId } from '../../API/task';
import { listAllMembers } from '../../API/project';
import Task from '../../Components/Task/Task';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TaskProgress from '../../Components/Charts/TaskProgress';
import { getCurrentSprint } from '../../API/sprint';
import { getActives } from '../../API/active';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Pusher from 'pusher-js';
import { isAuthenticated } from '../../API/auth-helper';

const useStyles = makeStyles((theme) => ({
  purple: {
    width: theme.spacing(3.0),
    height: theme.spacing(3.0),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { projectId } = useParams();
  const user = JSON.parse(sessionStorage.getItem('jwt'));

  const [myTasks, setMyTasks] = useState([]);
  const [allTasks, setALLTasks] = useState([]);
  const [completed, setCompleted] = useState();
  const [pending, setPending] = useState();
  const [percentage, setPercentage] = useState(0);
  const [currentTasks, setCurrentTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadinga, setLoadinga] = useState(false);
  const [loadingb, setLoadingb] = useState(false);
  const [loadingc, setLoadingc] = useState(false);
  const [members, setMembers] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);

  const jwt = isAuthenticated();

  useEffect(() => {
    const pusher = new Pusher('44f5dfd1d0a381447e26', {
      cluster: 'ap2',
    });
    var channel = pusher.subscribe('actives');
    channel.bind('inserted', function (data) {
      getActives(projectId).then((response) => {
        if (response.success) {
          setActiveMembers(response.actives);
        } else {
          console.log(response.message);
        }
      });
    });
  }, []);

  useEffect(() => {
    getActives(projectId).then((response) => {
      if (response.success) {
        setActiveMembers(response.actives);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    getMyTask(user.user._id).then((response) => {
      if (response.success) {
        setMyTasks(response.tasks);
      } else {
        console.log(response.message);
      }
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoadingc(true);
    getCurrentSprint(projectId).then((response) => {
      if (response.success) {
        let aggregate = [];
        response.currentSprint.pending.forEach((x) => aggregate.push(x));
        response.currentSprint.ongoing.forEach((x) => aggregate.push(x));
        response.currentSprint.completed.forEach((x) => aggregate.push(x));
        setCurrentTasks(aggregate);
      } else {
        console.log(response.message);
      }
      setLoadingc(false);
    });
  }, []);

  useEffect(() => {
    setLoadinga(true);
    listTasksByProjectId({ t: jwt.token }, projectId).then((response) => {
      if (response.success) {
        setALLTasks(response.tasks);
        setCompleted(response.completed);
        setPending(response.pending);
        setPercentage(response.percentage);
      }
      setLoadinga(false);
    });
  }, []);

  useEffect(() => {
    setLoadingb(true);

    listAllMembers(projectId).then((response) => {
      if (response.success) {
        setMembers(response.members);
        setDescription(response.description);
        setLoadingb(false);
      } else {
        console.log(response.message);
        setLoadingb(false);
      }
    });
  }, []);

  const chartData = [
    { name: 'A', value: pending, fill: '#2D2D2D' },
    { name: 'B', value: completed, fill: '#00AAF2' },
  ];

  return (
    <div className='dashboard'>
      {loading && <Spinkit />}
      {loadinga && <Spinkit />}
      {loadingb && <Spinkit />}
      {loadingc && <Spinkit />}
      <div className='dashboard__navbar'>
        <BigDropDown />
      </div>
      <div className='dashboard__content'>
        <div className='dashboard__contentColumnOne slide__downC1'>
          <div className='dashboard__projectDescription'>
            <div className='dashboard__descriptionTitle'>
              Project Description
            </div>
            <div className='dashboard__description'>{description}</div>
          </div>
          <div className='dashboard__sprintSection'>
            <div className='dashboard__title'>
              <div className='dashboard__titleName'>Current Sprint</div>
              <div className='dashboard__orange'>
                <div className='dashboard__orangeText'>Details</div>
                <div className='dashboard__orangeIcon'>
                  <NavigateNextIcon />
                </div>
              </div>
            </div>
            <div className='dashboard__sprintContent'>
              <Scrollable>
                {currentTasks.length > 0 ? (
                  currentTasks.map((task) => {
                    if (task.status !== 'Pending')
                      return (
                        <Task
                          key={task._id}
                          color={task.color}
                          story={task.story}
                          image={task.assignedTo.image}
                          smallText='smallText'
                          noStatus='noDisplay'
                          evenly='evenly'
                          noMargin='noMargin'
                        />
                      );
                    return <div></div>;
                  })
                ) : (
                  <div className='emptyList'>No Current Sprint</div>
                )}
              </Scrollable>
            </div>
          </div>
        </div>
        <div className='dashboard__contentColumnTwo slide__downC2'>
          <div className='dashboard__myTaskSection'>
            <div className='dashboard__title'>
              <div className='dashboard__titleName'>My Task</div>
              <div className='dashboard__orange'>
                <div className='dashboard__orangeText'>See All</div>
                <div className='dashboard__orangeIcon'>
                  <NavigateNextIcon />
                </div>
              </div>
            </div>
            <div className='dashboard__myTaskContent'>
              <Scrollable>
                {myTasks.length > 0 ? (
                  myTasks.map((task) => (
                    <Task
                      key={task._id}
                      color={task.color}
                      story={task.story}
                      noDisplay='noDisplay'
                      evenly='evenly'
                      smallText='smallText'
                      noMargin='noMargin'
                    />
                  ))
                ) : (
                  <div className='emptyList'>No Task Assigned</div>
                )}
              </Scrollable>
            </div>
          </div>
          <div className='dashboard__collabBoardSection'>
            <div className='dashboard__title'>
              <div className='dashboard__titleName'>Collab Board</div>
              <div className='dashboard__orange'>
                <div className='dashboard__orangeText'>Join Now</div>
                <div className='dashboard__orangeIcon'>
                  <NavigateNextIcon />
                </div>
              </div>
            </div>
            <div className='dashboard__collabboardContext'>
              {activeMembers.length !== 0 && (
                <div className='dashboard__actives'>Active Members </div>
              )}
              {activeMembers.length !== 0 ? (
                <AvatarGroup max={8}>
                  {activeMembers.map((member) => (
                    <Avatar
                      style={{
                        height: '4.0vh',
                        width: '2.0vw',
                      }}
                      alt='Remy Sharp'
                      src={`http://localhost:5000/${member.image}`}
                    />
                  ))}
                </AvatarGroup>
              ) : (
                <div className='emptyList'>No Active Members</div>
              )}
            </div>
          </div>
        </div>
        <div className='dashboard__contentColumnThree slide__downC3'>
          <div className='dashboard__reportSection'>
            <div className='dashboard__title'>
              <div className='dashboard__titleName'>Task Progress</div>
              <Link to={`/reports/${projectId}`} className='dashboard__orange'>
                <div className='dashboard__orangeText'>Details</div>
                <div className='dashboard__orangeIcon'>
                  <NavigateNextIcon />
                </div>
              </Link>
            </div>
            <div className='dashboard__reportContent'>
              <div className='dashboard__chartInfo'>
                <div className='sprintOverview__chartInfoGroup'>
                  {percentage.toString().substring(0, 4)} %
                </div>
              </div>
              <TaskProgress data={chartData} datakey='value' />
            </div>
          </div>
          <div className='dashboard__teamSection'>
            <div className='dashboard__title'>
              <div className='dashboard__titleName'>Team Members</div>
              <Link to={`/team/${projectId}`} className='dashboard__orange'>
                <div className='dashboard__orangeText'>Details</div>
                <div className='dashboard__orangeIcon'>
                  <NavigateNextIcon />
                </div>
              </Link>
            </div>
            <div className='dashboard__teamContent'>
              <Scrollable>
                {members.length > 0 ? (
                  members.map((member) => {
                    if (member._id !== user.user._id)
                      return (
                        <div className='dashboard__singleMember'>
                          <Avatar
                            className={classes.purple}
                            src={`http://localhost:5000/${member.image}`}
                          />
                          <div className='dashboard__singleMemberName'>
                            {`${member.name}`}
                          </div>
                        </div>
                      );
                    return <div></div>;
                  })
                ) : (
                  <div className='emptyList'>No Members</div>
                )}
              </Scrollable>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
