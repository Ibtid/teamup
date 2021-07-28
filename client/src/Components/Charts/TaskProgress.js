import React from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TaskProgress = ({ fromSprint, data, datakey }) => {
  const innerRadius = fromSprint ? 75 : 40;
  const paddingAngle = fromSprint ? 10 : null;

  return (
    <ResponsiveContainer width='100%' height='80%'>
      <PieChart>
        <Pie
          data={data}
          dataKey={datakey}
          startAngle={90}
          endAngle={450}
          paddingAngle={paddingAngle}
          innerRadius={innerRadius}>
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} stroke={0} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TaskProgress;
