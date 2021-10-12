import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

const OverLoadChart = ({ workLoadData }) => {
  return (
    <ResponsiveContainer width='100%' height='70%'>
      <RadarChart cx='50%' cy='54%' outerRadius='80%' data={workLoadData}>
        <PolarGrid stroke='#525252' fill='#525252' />
        <PolarAngleAxis dataKey='subject' stroke='#f2f2f2' />
        <Radar name='Mike' dataKey='A' fill='#00AAF2' fillOpacity={0.7} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default OverLoadChart;
