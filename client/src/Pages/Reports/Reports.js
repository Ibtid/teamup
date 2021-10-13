import React, { useState, useEffect } from 'react';
import './Reports.css';
import BigDropDown from '../../Components/BigDropDown/BigDropDown';
import OverLoadChart from '../../Components/Charts/OverloadChart';
import TaskProgress from '../../Components/Charts/TaskProgress';
import NoteIcon from '@material-ui/icons/Note';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SummaryChart from '../../Components/Charts/SummaryChart';
import { getAllReports } from '../../API/reports';
import ResponseModal from '../../Modals/ResponseModal/ResponseModal';
import { useParams } from 'react-router-dom';
import Spinkit from '../../Modals/Spinkit/Spinkit';

const Reports = () => {
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [totalStories, setTotalStories] = useState('');
  const [totalSprints, setTotalSprints] = useState('');
  const [totalEpics, setTotalEpics] = useState('');
  const [taskProgressData, setTaskProgressData] = useState([]);
  const [workLoadData, setWorkLoadData] = useState([]);
  const [sprintSummary, setSprintSummary] = useState([]);
  const [pending, setPending] = useState('');
  const [ongoing, setOngoing] = useState('');
  const [complete, setComplete] = useState('');
  const [reportsFound, setReportsFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllReports(projectId).then((response) => {
      if (response.success) {
        setReportsFound(true);
        setTotalStories(response.totalStories);
        setTotalEpics(response.totalEpics);
        setTotalSprints(response.totalSprints);
        setTaskProgressData([
          { name: 'A', value: response.pending, fill: '#2D2D2D' },
          { name: 'B', value: response.ongoing, fill: '#00AAF2' },
          { name: 'C', value: response.completed, fill: '#8F44FD' },
        ]);

        setPending(response.pending);
        setOngoing(response.ongoing);
        setComplete(response.completed);

        setWorkLoadData(response.workLoadData);
        setSprintSummary(response.sprintSummary);
        setLoading(false);
      } else {
        setMessage(response.message);
        setOpen(true);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div className='reports'>
      {loading && <Spinkit />}
      {open && (
        <ResponseModal
          message={message}
          setOpen={() => {
            setOpen(false);
          }}
        />
      )}
      <div className='reports__navbar'>
        <BigDropDown />
      </div>
      <div className='reports__content'>
        <div className='reports__summaryRow'>
          <div className='reports__summaryTextGroup'>
            <div className='reports__summary'>
              <div className='reports__summaryText'>
                {reportsFound && (
                  <div className='reports__bigText'>{totalStories}</div>
                )}
                {reportsFound && (
                  <div className='reports__smallText'>Stories</div>
                )}
              </div>
              <div className='reports__summaryIcon'>
                {reportsFound && (
                  <NoteIcon style={{ height: '4vh', width: '4vh' }} />
                )}
              </div>
            </div>
            <div className='reports__summary'>
              {reportsFound && (
                <div className='reports__summaryText'>
                  <div className='reports__bigText'>{totalEpics}</div>
                  <div className='reports__smallText'>Epics</div>
                </div>
              )}
              <div className='reports__summaryIcon'>
                {reportsFound && (
                  <LibraryBooksIcon style={{ height: '4vh', width: '4vh' }} />
                )}
              </div>
            </div>
            <div className='reports__summary'>
              {reportsFound && (
                <div className='reports__summaryText'>
                  <div className='reports__bigText'>{totalSprints}</div>
                  <div className='reports__smallText'>Sprints</div>
                </div>
              )}
              <div className='reports__summaryIcon'>
                {reportsFound && (
                  <TrendingUpIcon style={{ height: '4vh', width: '4vh' }} />
                )}
              </div>
            </div>
          </div>
          <div className='reports__completion'>
            {reportsFound && (
              <div className='reports__rowOneTitle'>Work Load</div>
            )}
            <div className='reports__rowOneContent'>
              {reportsFound && <OverLoadChart workLoadData={workLoadData} />}
            </div>
          </div>
          <div className='reports__summaryGraph'>
            {reportsFound && (
              <div className='reports__rowOneTitle'>Velocity</div>
            )}
            <div className='reports__rowGraphContent'>
              {reportsFound && (
                <SummaryChart
                  forVelocity={true}
                  sprintSummary={sprintSummary}
                />
              )}
            </div>
          </div>
        </div>
        <div className='reports__firstRow'>
          <div className='reports__summaryGraph'>
            {reportsFound && <div className='reports__rowOneTitle'>Story</div>}
            <div className='reports__rowGraphContent'>
              {reportsFound && (
                <SummaryChart forStory={true} sprintSummary={sprintSummary} />
              )}
            </div>
          </div>
          <div className='reports__rowOneChart'>
            {reportsFound && (
              <div className='reports__rowOneTitle'>Task Progress</div>
            )}
            <div className='reports__rowOneContent'>
              <div className='reports__taskprogressContainer'>
                {reportsFound && (
                  <TaskProgress
                    fromReport={true}
                    data={taskProgressData}
                    datakey='value'
                  />
                )}
              </div>
              {reportsFound && (
                <div className='reports__progressColors'>
                  <div className='reports__progressColorsGroup'>
                    <div className='sprintOverview__pendingColor'></div>
                    <div className='sprintOverview__chartInfoText'>
                      Pending{' '}
                      {((pending / totalStories) * 100)
                        .toString()
                        .substring(0, 5)}
                      %
                    </div>
                  </div>
                  <div className='reports__progressColorsGroup'>
                    <div className='sprintOverview__ongoingColor'></div>
                    <div className='sprintOverview__chartInfoText'>
                      Ongoing{' '}
                      {((ongoing / totalStories) * 100)
                        .toString()
                        .substring(0, 5)}
                      %
                    </div>
                  </div>
                  <div className='reports__progressColorsGroup'>
                    <div className='sprintOverview__completedColor'></div>
                    <div className='sprintOverview__chartInfoText'>
                      Completed{' '}
                      {((complete / totalStories) * 100)
                        .toString()
                        .substring(0, 5)}
                      %
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
