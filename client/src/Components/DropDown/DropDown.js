import React, { useState, useEffect } from 'react';
import { findProjectByUserId } from '../../API/project';
import ResponseModal from '../../Modals/ResponseModal/ResponseModal';
import Spinkit from '../../Modals/Spinkit/Spinkit';
import { useHistory } from 'react-router-dom';
import './DropDown.css';

const DropDown = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [haveProject, setHaveProject] = useState('');
  const [loading, setLoading] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('jwt'));

  useEffect(() => {
    if (user) {
      setLoading(true);
      findProjectByUserId().then((response) => {
        console.log(response);

        if (response.success) {
          setProjects(response.projects);
          console.log(projects);
          setLoading(false);
        } else {
          setMessage(response.message);
          setOpenResponse(true);
          setLoading(false);
        }
      });
    }
  }, []);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleProject = (e) => {
    setHaveProject(e.currentTarget.textContent);
    history.push(`/dashboard/${e.currentTarget.textContent}`);
  };

  const itemList = (props) => {
    const list = props.map((item) => (
      <div onClick={handleProject} className='dropdown__item' key={item._id}>
        {item.name}
      </div>
    ));

    return <div className='dropdown__items'> {list} </div>;
  };

  return (
    <div
      className={isOpen ? 'dropdown active' : 'dropdown'}
      onClick={handleClick}>
      {openResponse && <ResponseModal message={message} />}
      {loading && <Spinkit />}
      <div className='dropdown__text'>
        {!haveProject ? 'Choose Project' : haveProject}
      </div>
      {itemList(projects)}
    </div>
  );
};

export default DropDown;
