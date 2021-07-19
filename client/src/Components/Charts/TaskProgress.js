import React from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TaskProgress = () => {
  const data2 = [
    { name: 'A', value: 20, fill: '#2D2D2D' },
    { name: 'B', value: 25, fill: '#00AAF2' },
    { name: 'C', value: 35, fill: '#8F44FD' },
  ];
  return (
    <ResponsiveContainer width='100%' height='80%'>
      <PieChart>
        <Pie
          data={data2}
          dataKey='value'
          startAngle={90}
          endAngle={450}
          paddingAngle={10}
          innerRadius={75}>
          {data2.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} stroke={0} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TaskProgress;
