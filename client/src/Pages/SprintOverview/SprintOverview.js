import React, { useState } from 'react';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';

import Button from '../../Components/Button/Button';
import AddSprint from '../../Modals/AddSprint/AddSprint';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import './SprintOverview.css';
import Scrollable from '../../Components/Scrollable/Scrollable';
import TaskProgress from '../../Components/Charts/TaskProgress';

const SprintOverview = () => {
  const [openNewSprint, setOpenNewSprint] = useState(false);
  const [sprintNo, setSprintNo] = useState(0);

  const str = 'Fri Jan 01 2021 01:00:00 GMT+0600 (Bangladesh Standard Time)';

  const readymadeDiv = (
    <div className='sprintOverview__sprintOverview'>
      <div className='sprintOverview__sprintHeader'>Sprint 1</div>
      <div className='sprintOverview__sprintBody'>
        <div className='sprintOverview__sprintBodyLeft'>
          <div className='sprintOverview__sprintInfoGroup'>
            <div className='sprintOverview__sprintTitle'>Total Stories:</div>
            <div className='sprintOverview__sprintInfo'>12</div>
          </div>
          <div className='sprintOverview__sprintInfoGroup'>
            <div className='sprintOverview__sprintTitle'>Velocity:</div>
            <div className='sprintOverview__sprintInfo'>30</div>
          </div>
        </div>
        <div className='sprintOverview__sprintBodyMiddle'>
          <div className='sprintOverview__sprintInfoGroup'>
            <div className='sprintOverview__sprintTitle'>Start Time:</div>
            <div className='sprintOverview__sprintInfo'>
              {str.substring(0, 15)}
            </div>
          </div>
          <div className='sprintOverview__sprintInfoGroup'>
            <div className='sprintOverview__sprintTitle'>End Time:</div>
            <div className='sprintOverview__sprintInfo'>
              {Date().substring(0, 15)}
            </div>
          </div>
        </div>
        <div className='sprintOverview__sprintBodyRight'>
          <NavigateNextIcon style={{ fontSize: '3vw' }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className='sprintOverview'>
      {openNewSprint && (
        <AddSprint
          sprintNo={sprintNo}
          closeAddSprint={() => {
            setOpenNewSprint(false);
          }}
        />
      )}
      <div className='sprintOverview__navbar'>
        <BigDropDown />
        <Button
          onClick={() => {
            setOpenNewSprint(true);
          }}>
          New Sprint
        </Button>
      </div>
      <div className='sprintOverview__content'>
        <div className='sprintOverview__contentLeft'>
          <div className='sprintOverview__contentOverview'>
            <div className='sprintOverview__header'>Current Sprint</div>
            <div className='sprintOverview__contentOverviewLarge'>
              {readymadeDiv}
              <div className='sprintOverview__chartSection'>
                <div className='sprintOverview__sprintHeader'>
                  Sprint Progress
                </div>
                <div className='sprintOverview__chartInfo'>
                  <div className='sprintOverview__chartInfoGroup'>
                    <div className='sprintOverview__pendingColor'></div>
                    <div className='sprintOverview__chartInfoText'>Pending</div>
                  </div>
                  <div className='sprintOverview__chartInfoGroup'>
                    <div className='sprintOverview__ongoingColor'></div>
                    <div className='sprintOverview__chartInfoText'>Ongoing</div>
                  </div>
                  <div className='sprintOverview__chartInfoGroup'>
                    <div className='sprintOverview__completedColor'></div>
                    <div className='sprintOverview__chartInfoText'>
                      Completed
                    </div>
                  </div>
                </div>
                <TaskProgress />
              </div>
            </div>
          </div>
        </div>
        <div className='sprintOverview__contentRight'>
          <div className='sprintOverview__contentRightTop'>
            <div className='sprintOverview__header'>Upcoming Sprint</div>
            <div className='sprintOverview__contentOverviewSmall'>
              <div style={{ height: '95%' }}>
                <Scrollable>
                  {readymadeDiv}
                  {readymadeDiv}
                  {readymadeDiv}
                  {readymadeDiv}
                  {readymadeDiv}
                  {readymadeDiv}
                </Scrollable>
              </div>
            </div>
          </div>
          <div className='sprintOverview__contentRightBottom'>
            <div className='sprintOverview__contentOverview'>
              <div className='sprintOverview__header'>Completed Sprint</div>
              <div className='sprintOverview__contentOverviewSmall'>
                <div style={{ height: '95%' }}>
                  <Scrollable>
                    {readymadeDiv}
                    {readymadeDiv}
                    {readymadeDiv}
                    {readymadeDiv}
                    {readymadeDiv}
                    {readymadeDiv}
                  </Scrollable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SprintOverview;
