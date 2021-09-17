import React from 'react';
import {
  Area,
  Bar,
  Line,
  CartesianGrid,
  Legend,
  ComposedChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const SummaryChart = (props) => {
  const data = [
    {
      name: 'Sprint 1',
      velocity: 21,
      stories: 7,
      meanVelocity: 21,
      meanStory: 7,
    },
    {
      name: 'Sprint 2',
      velocity: 30,
      stories: 8,
      meanVelocity: 25,
      meanStory: 7.5,
    },
    {
      name: 'Sprint 3',
      velocity: 25,
      stories: 8,
      meanVelocity: 25,
      meanStory: 8,
    },
    {
      name: 'Sprint 4',
      velocity: 21,
      stories: 7,
      meanVelocity: 23,
      meanStory: 7.5,
    },
    {
      name: 'Sprint 5',
      velocity: 21,
      stories: 8,
      meanVelocity: 22,
      meanStory: 7.9,
    },
    {
      name: 'Sprint 6',
      velocity: 27,
      stories: 9,
      meanVelocity: 25,
      meanStory: 8,
    },
    {
      name: 'Sprint 7',
      velocity: 27,
      stories: 8,
      meanVelocity: 26,
      meanStory: 7.5,
    },
  ];

  return (
    <ComposedChart width={550} height={200} data={data}>
      <XAxis dataKey='name' axisLine={false} tickLine={false} />
      <YAxis axisLine={false} tickLine={false} />
      <Legend />
      {props.forVelocity && (
        <Area
          type='monotone'
          dataKey='meanVelocity'
          fill='#8f44fd'
          stroke='#8f44fd'
        />
      )}
      {props.forVelocity && <CartesianGrid vertical={false} stroke='#222222' />}
      {props.forVelocity && (
        <Bar
          type='monotone'
          barSize={20}
          dataKey='velocity'
          fill='#D763CD'
          radius={[5, 5, 0, 0]}
          stroke='#D763cd'
        />
      )}

      {props.forStory && (
        <Area
          dataKey='meanStory'
          barSize={20}
          type='monotone'
          fill='#8F44FD'
          stroke='#8F44FD'
          radius={[5, 5, 0, 0]}
        />
      )}
      {props.forStory && <CartesianGrid vertical={false} stroke='#222222' />}
      {props.forStory && (
        <Bar
          dataKey='stories'
          barSize={20}
          fill='#00AAF2'
          radius={[5, 5, 0, 0]}
        />
      )}
    </ComposedChart>
  );
};

export default SummaryChart;
