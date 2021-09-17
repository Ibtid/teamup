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

const SummaryChart = () => {
  const data = [
    {
      name: 'Sprint 1',
      velocity: 21,

      stories: 7,
      amt: 10,
    },
    {
      name: 'Sprint 2',
      velocity: 30,

      stories: 8,
      amt: 5,
    },
    {
      name: 'Sprint 3',
      velocity: 25,

      stories: 8,
      amt: 12,
    },
    {
      name: 'Sprint 4',
      velocity: 21,

      stories: 7,
      amt: 12,
    },
    {
      name: 'Sprint 5',
      velocity: 21,

      stories: 8,
      amt: 5,
    },
    {
      name: 'Sprint 6',
      velocity: 27,

      stories: 9,
      amt: 10,
    },
    {
      name: 'Sprint 7',
      velocity: 24,

      stories: 8,
      amt: 9,
    },
  ];

  return (
    <ComposedChart width={730} height={225} data={data}>
      <XAxis dataKey='name' />
      <YAxis />
      <Legend />
      <Area type='monotone' dataKey='amt' fill='#8f44fd' stroke='#252525' />
      <Bar
        dataKey='stories'
        barSize={20}
        fill='#D763CD'
        radius={[5, 5, 0, 0]}
      />
      <Line type='monotone' dataKey='velocity' stroke='#f2f2f2' />
    </ComposedChart>
  );
};

export default SummaryChart;
