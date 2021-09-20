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
  return (
    <ComposedChart width={550} height={200} data={props.sprintSummary}>
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
      <XAxis dataKey='name' axisLine={false} tickLine={false} />
      <YAxis axisLine={false} tickLine={false} />
      <Tooltip
        wrapperStyle={{
          color: '#121212',
          fontSize: '9px',
          background: '#121212',
        }}
      />
      {/*<div style={{ marginTop: '10px', height: '10px', width: '10px' }}>
        <Legend />
      </div>*/}
    </ComposedChart>
  );
};

export default SummaryChart;
