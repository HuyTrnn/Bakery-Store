import {
  PieChart,
  Cell,
  Pie,
  Label,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import React, { useState } from "react";
import './Chart.scss'

function AdminPieChart(data) {
  const RADIAN = Math.PI / 180;
  const dataChart = [
    { name: "Đơn Cod", value: data.props.orderCod },
    { name: "Đơn Banking", value: data.props.orderBank },
    { name: "Đơn hủy", value: 7 },
  ];

  const data02 = [
    { name: "Tổng đơn hàng", value: data.props.orderDone },
    { name: "Đơn hủy", value: data.props.orderCancel },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#000"];
console.log(data);
  return (
    <React.Fragment>
      <div className="Pie-Chart">
        <PieChart width={300} height={300}>
         
          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            fill="#82ca9d"
            label
          >
            {dataChart.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

            <Label position="center" fill="#333" fontSize={14}>
              {`Tổng đơn hàng: ${data.props.orders}`}
             </Label>
  
            
          </Pie>
          <Tooltip />

        </PieChart>
      </div>
    </React.Fragment>
  );
}

export default AdminPieChart;
