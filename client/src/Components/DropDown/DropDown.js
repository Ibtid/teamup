import React, { useState, useEffect } from 'react';
import { findProjectByUserId } from '../../API/project';
import ResponseModal from '../../Modals/ResponseModal/ResponseModal';
import Spinkit from '../../Modals/Spinkit/Spinkit';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider/StateProvider';
import './Dropdown.css';

const DropDown = () => {
  const history = useHistory();
  const [{ project }, dispatch] = useStateValue();
  const [isOpen, setIsOpen] = useState(false);
  const [haveProject, setHaveProject] = useState();
  const [loading, setLoading] = useState(false);
  const [openResponse, setOpenResponse] = useState(false);
  const [message, setMessage] = useState('');
  const [projects, setProjects] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('jwt'));

  useEffect(() => {
    if (user) {
      setLoading(true);
      findProjectByUserId().then((response) => {
        if (response.success) {
          setProjects(response.projects);
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

  const handleProject = async (e) => {
    setHaveProject(e.currentTarget.textContent);
    history.push(`/dashboard/${e.target.id}`);
    await dispatch({
      type: 'SELECTED_PROJECT',
      project: { name: e.currentTarget.textContent, id: e.target.id },
    });
    console.log(project);
  };

  const itemList = (props) => {
    const list = props.map((item) => (
      <div
        onClick={handleProject}
        className='dropdown__item'
        key={item._id}
        id={item._id}>
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
        {!project.name ? 'Choose Project' : project.name}
      </div>
      {itemList(projects)}
    </div>
  );
};

export default DropDown;
