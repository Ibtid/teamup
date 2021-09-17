import React from 'react';
import './Reports.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';
import OverLoadChart from '../../Components/Charts/OverloadChart';
import TaskProgress from '../../Components/Charts/TaskProgress';
import NoteIcon from '@material-ui/icons/Note';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SummaryChart from '../../Components/Charts/SummaryChart';

const Reports = () => {
  const chartData = [
    { name: 'A', value: 20, fill: '#2D2D2D' },
    { name: 'B', value: 25, fill: '#00AAF2' },
  ];

  const data2 = [
    { name: 'A', value: 8, fill: '#2D2D2D' },
    { name: 'B', value: 25, fill: '#00AAF2' },
    { name: 'C', value: 30, fill: '#8F44FD' },
  ];

  return (
    <div className='reports'>
      <div className='reports__navbar'>
        <BigDropDown />
      </div>
      <div className='reports__content'>
        <div className='reports__summaryRow'>
          <div className='reports__summaryTextGroup'>
            <div className='reports__summary'>
              <div className='reports__summaryText'>
                <div className='reports__bigText'>50</div>
                <div className='reports__smallText'>Stories</div>
              </div>
              <div className='reports__summaryIcon'>
                <NoteIcon style={{ height: '5vh', width: '5vh' }} />
              </div>
            </div>
            <div className='reports__summary'>
              <div className='reports__summaryText'>
                <div className='reports__bigText'>15</div>
                <div className='reports__smallText'>Epics</div>
              </div>
              <div className='reports__summaryIcon'>
                <LibraryBooksIcon style={{ height: '5vh', width: '5vh' }} />
              </div>
            </div>
            <div className='reports__summary'>
              <div className='reports__summaryText'>
                <div className='reports__bigText'>5</div>
                <div className='reports__smallText'>Sprints</div>
              </div>
              <div className='reports__summaryIcon'>
                <TrendingUpIcon style={{ height: '5vh', width: '5vh' }} />
              </div>
            </div>
          </div>
          <div className='reports__summaryGraph'>
            <div className='reports__rowOneTitle'>Composed Chart</div>
            <div className='reports__rowGraphContent'>
              <SummaryChart />
            </div>
          </div>
        </div>
        <div className='reports__firstRow'>
          <div className='reports__rowOneChart'>
            <div className='reports__rowOneTitle'>Task Completion</div>
            <div className='reports__rowOneContent'>
              <TaskProgress data={chartData} datakey='value' />
            </div>
          </div>

          <div className='reports__rowOneChart'>
            <div className='reports__rowOneTitle'>Task Division</div>
            <div className='reports__rowOneContent'>
              <TaskProgress fromReport={true} data={data2} datakey='value' />
            </div>
          </div>
          <div className='reports__rowOneChart'>
            <div className='reports__rowOneTitle'>Work Load</div>
            <div className='reports__rowOneContent'>
              <OverLoadChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
