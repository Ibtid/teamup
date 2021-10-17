import React from 'react';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const TaskProgress = ({ fromSprint, data, datakey, fromReport }) => {
  let innerRadius = fromSprint ? 60 : 35;
  let paddingAngle = fromSprint ? 10 : 10;

  innerRadius = fromReport ? 35 : innerRadius;
  paddingAngle = fromReport ? 10 : 10;

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
