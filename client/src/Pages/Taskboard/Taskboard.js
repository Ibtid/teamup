import React, { useState, useEffect } from 'react';
import './Taskboard.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';
import Button from '../../Components/Button/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddBoard from '../../Modals/AddBoard/AddBoard';
import Task from '../../Components/Task/Task';
import Scrollable from '../../Components/Scrollable/Scrollable';
import Spinkit from '../../Modals/Spinkit/Spinkit';
import { listTaskBoards, deleteBoard } from '../../API/taskBoard';
import ResponseModal from '../../Modals/ResponseModal/ResponseModal';
import { useParams } from 'react-router-dom';
import AddTask from '../../Modals/AddTask/AddTask';
import { listTasksByProjectId } from '../../API/task';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ConsentModal from '../../Modals/ConsentModal/ConsentModal';
import { isAuthenticated } from '../../API/auth-helper';

const Taskboard = () => {
  const { projectId } = useParams();

  const [openAddBoard, setOpenAddBoard] = useState(false);
  const [openAddTask, setOpenAddTask] = useState(false);
  const [openConsentModal, setOpenConsentModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadinga, setLoadinga] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [boards, setBoards] = useState([]);

  const [color, setColor] = useState('');
  const [boardId, setBoardId] = useState('');
  const [tasks, setTasks] = useState([]);

  const [reloadSignal, setReloadSignal] = useState(false);
  const [reloadSignala, setReloadSignala] = useState(false);
  const jwt = isAuthenticated();

  useEffect(() => {
    setLoading(true);
    listTaskBoards(projectId).then((response) => {
      if (response.success) {
        console.log(response);
        setBoards(response.boards);
        setLoading(false);
      } else {
        setMessage(response.message);
        setOpen(true);
        setLoading(false);
      }
    });
  }, [openAddBoard, reloadSignala]);

  useEffect(() => {
    setLoadinga(true);
    listTasksByProjectId({ t: jwt.token }, projectId).then((response) => {
      if (response.success) {
        console.log(response);
        setTasks(response.tasks);
        setLoadinga(false);
      } else {
        setMessage(response.message);
        setOpen(true);
        setLoadinga(false);
      }
    });
  }, [openAddTask, reloadSignal]);

  const removeboardClicked = () => {
    setLoadinga(true);
    deleteBoard(boardId).then((response) => {
      if (response.success) {
        setOpenConsentModal(false);
        setLoadinga(false);
        setReloadSignala(!reloadSignala);
      } else {
        setOpenConsentModal(false);
        setMessage(response.message);
        setOpen(true);
        setLoadinga(false);
      }
    });
  };

  return (
    <div className='taskboard'>
      {openAddBoard && (
        <AddBoard
          setOpenAddBoard={() => {
            setOpenAddBoard(false);
          }}
        />
      )}
      {loading && <Spinkit />}
      {loadinga && <Spinkit />}
      {open && (
        <ResponseModal
          message={message}
          setOpen={() => {
            setOpen(false);
          }}
        />
      )}
      {openAddTask && (
        <AddTask
          color={color}
          boardId={boardId}
          closeAddTask={() => {
            setOpenAddTask(false);
          }}
        />
      )}
      {openConsentModal && (
        <ConsentModal
          message={`Are you sure you want to delete the epic along with all of it's stories?`}
          answerNo={() => {
            setOpenConsentModal(false);
          }}
          answerYes={removeboardClicked}
        />
      )}

      <div className='taskboard__navbar'>
        <BigDropDown />
        <Button onClick={() => setOpenAddBoard(true)}>New Epic</Button>
      </div>
      <div className='taskboard__content'>
        {boards
          .slice(0)
          .reverse()
          .map((board) => (
            <div className='taskboard__taskBoard pop' key={board._id}>
              <div className={board.color}>
                <div className='taskboard__header'>
                  <div className='taskboard__headerText'>{board.name}</div>
                  <div className='taskboard__headerButton'>
                    <div
                      className='taskboard__addTask'
                      onClick={() => {
                        setColor(board.color);
                        setBoardId(board._id);
                        setOpenAddTask(true);
                      }}>
                      <AddCircleOutlineIcon
                        style={{ height: '5vh', width: '1.5vw' }}
                      />
                    </div>
                    <div
                      className='taskboard__deleteBoard'
                      onClick={() => {
                        setBoardId(board._id);
                        setOpenConsentModal(true);
                      }}>
                      <DeleteOutlineIcon
                        style={{ height: '5vh', width: '1.5vw' }}
                      />
                    </div>
                  </div>
                </div>
                <div className='taskboard__taskList drop__downins'>
                  <Scrollable>
                    {tasks ? (
                      tasks
                        .slice(0)
                        .reverse()
                        .map((task) => {
                          if (task.boardId === board._id) {
                            let sprintId = task.sprintId
                              ? task.sprintId._id
                              : 0;
                            let sprintNo = task.sprintId
                              ? task.sprintId.sprintNo
                              : '--';
                            return (
                              <Task
                                key={task._id}
                                switchReloadSignal={() => {
                                  setReloadSignal(!reloadSignal);
                                }}
                                extraMargin='extraMargin'
                                fromEpic={true}
                                _id={task._id}
                                points={task.points}
                                assignedTo={task.assignedTo}
                                color={task.color}
                                image={
                                  task.assignedTo ? task.assignedTo.image : ''
                                }
                                story={task.story}
                                status={task.status}
                                putWhitespace='putWhitespace'
                                sprintId={sprintId}
                                sprintNo={sprintNo}
                              />
                            );
                          }
                        })
                    ) : (
                      <div style={{ color: 'white' }}>no task</div>
                    )}
                  </Scrollable>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Taskboard;
