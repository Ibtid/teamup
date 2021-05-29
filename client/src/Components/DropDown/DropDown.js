import React, { useState } from 'react';
import './DropDown.css';

const DropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [haveProject, setHaveProject] = useState('');

  const race = [
    'Azure Female',
    'Iron Dwarf',
    'Highborn Human',
    'Lowland Human',
    'Mountain Dwarf',
    'Scythian Elf',
    'Woodland Elf',
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleProject = (e) => {
    setHaveProject(e.currentTarget.textContent);
  };

  const itemList = (props) => {
    const list = props.map((item) => (
      <div
        onClick={handleProject}
        className='dropdown__item'
        key={item.toString()}>
        {item}
      </div>
    ));

    return <div className='dropdown__items'> {list} </div>;
  };

  return (
    <div
      className={isOpen ? 'dropdown active' : 'dropdown'}
      onClick={handleClick}>
      <div className='dropdown__text'>
        {!haveProject ? 'Choose Project' : haveProject}
      </div>
      {itemList(race)}
    </div>
  );
};

export default DropDown;
