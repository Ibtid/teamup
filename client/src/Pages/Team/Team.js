import React from 'react';
import './Team.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';
import Button from '../../Components/Button/Button';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import Scrollable from '../../Components/Scrollable/Scrollable';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    fontSize: '3vh',
  },
}));

const Team = () => {
  const classes = useStyles();

  return (
    <div className='team'>
      <div className='team__navbar'>
        <BigDropDown />
        <Button>Add Member</Button>
      </div>
      <div className='team__content'>
        <div className='team__contentLeft'>
          <div className='team__projectOwner'>
            <div className='team__header'>Scrum Master</div>
            <div className='team__projectOwnerName'>
              <Avatar className={classes.purple}>N</Avatar>
              <div className='team__memberName'>Nafiz Imtiaz</div>
            </div>
          </div>
          <div className='team__collaborators'>
            <div className='team__header'>Collaborators</div>
            <div className='team__collaboratorsContent'>
              <Scrollable>
                <div className='team__members'>
                  <div className='team__member'>
                    <div className='team__profileGroup'>
                      <Avatar className={classes.purple}>N</Avatar>
                      <div className='team__memberName'>Nafiz Imtiaz</div>
                    </div>
                    <div className='team__functions'>
                      <div className='team__buttondrop'>
                        <div className='team__buttondropText'>Member</div>
                        <div className='team__icon'>
                          <ExpandMoreIcon />
                        </div>
                      </div>
                      <ClearIcon />
                    </div>
                  </div>
                  <div className='team__member'>
                    <div className='team__profileGroup'>
                      <Avatar className={classes.purple}>S</Avatar>
                      <div className='team__memberName'>Fatema Tuz Zohora</div>
                    </div>
                    <div className='team__functions'>
                      <div className='team__buttondrop'>
                        <div className='team__buttondropText'>Member</div>
                        <div className='team__icon'>
                          <ExpandMoreIcon />
                        </div>
                      </div>
                      <ClearIcon />
                    </div>
                  </div>
                  <div className='team__member'>
                    <div className='team__profileGroup'>
                      <Avatar className={classes.purple}>N</Avatar>
                      <div className='team__memberName'>Nafiz Imtiaz</div>
                    </div>
                    <div className='team__functions'>
                      <div className='team__buttondrop'>
                        <div className='team__buttondropText'>Member</div>
                        <div className='team__icon'>
                          <ExpandMoreIcon />
                        </div>
                      </div>
                      <ClearIcon />
                    </div>
                  </div>
                  <div className='team__member'>
                    <div className='team__profileGroup'>
                      <Avatar className={classes.purple}>S</Avatar>
                      <div className='team__memberName'>Fatema Tuz Zohora</div>
                    </div>
                    <div className='team__functions'>
                      <div className='team__buttondrop'>
                        <div className='team__buttondropText'>Member</div>
                        <div className='team__icon'>
                          <ExpandMoreIcon />
                        </div>
                      </div>
                      <ClearIcon />
                    </div>
                  </div>
                  <div className='team__member'>
                    <div className='team__profileGroup'>
                      <Avatar className={classes.purple}>N</Avatar>
                      <div className='team__memberName'>Nafiz Imtiaz</div>
                    </div>
                    <div className='team__functions'>
                      <div className='team__buttondrop'>
                        <div className='team__buttondropText'>Member</div>
                        <div className='team__icon'>
                          <ExpandMoreIcon />
                        </div>
                      </div>
                      <ClearIcon />
                    </div>
                  </div>
                  <div className='team__member'>
                    <div className='team__profileGroup'>
                      <Avatar className={classes.purple}>S</Avatar>
                      <div className='team__memberName'>Fatema Tuz Zohora</div>
                    </div>
                    <div className='team__functions'>
                      <div className='team__buttondrop'>
                        <div className='team__buttondropText'>Member</div>
                        <div className='team__icon'>
                          <ExpandMoreIcon />
                        </div>
                      </div>
                      <ClearIcon />
                    </div>
                  </div>
                  <div className='team__member'>
                    <div className='team__profileGroup'>
                      <Avatar className={classes.purple}>N</Avatar>
                      <div className='team__memberName'>Nafiz Imtiaz</div>
                    </div>
                    <div className='team__functions'>
                      <div className='team__buttondrop'>
                        <div className='team__buttondropText'>Member</div>
                        <div className='team__icon'>
                          <ExpandMoreIcon />
                        </div>
                      </div>
                      <ClearIcon />
                    </div>
                  </div>
                  <div className='team__member'>
                    <div className='team__profileGroup'>
                      <Avatar className={classes.purple}>S</Avatar>
                      <div className='team__memberName'>Fatema Tuz Zohora</div>
                    </div>
                    <div className='team__functions'>
                      <div className='team__buttondrop'>
                        <div className='team__buttondropText'>Member</div>
                        <div className='team__icon'>
                          <ExpandMoreIcon />
                        </div>
                      </div>
                      <ClearIcon />
                    </div>
                  </div>
                </div>
              </Scrollable>
            </div>
          </div>
        </div>
        <div className='team__contentRight'>
          <div className='team__noProfile'>No Profile Selected</div>
        </div>
      </div>
    </div>
  );
};

export default Team;
