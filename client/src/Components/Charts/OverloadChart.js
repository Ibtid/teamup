import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    subject: 'Ibtid',
    A: 16,
  },
  {
    subject: 'Nafiz',
    A: 16,
  },
  {
    subject: 'Adiba',
    A: 15,
  },
  {
    subject: 'Robi',
    A: 16,
  },
  {
    subject: 'Sananda',
    A: 17,
  },
  {
    subject: 'Hissan',
    A: 9,
  },
  {
    subject: 'Fahim',
    A: 9,
  },
];

const OverLoadChart = () => {
  return (
    <ResponsiveContainer width='85%' height='70%'>
      <RadarChart cx='60%' cy='60%' outerRadius='80%' data={data}>
        <PolarGrid stroke='#525252' fill='#525252' />
        <PolarAngleAxis dataKey='subject' stroke='#f2f2f2' />

        <Radar name='Mike' dataKey='A' fill='#00AAF2' fillOpacity={0.7} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default OverLoadChart;
