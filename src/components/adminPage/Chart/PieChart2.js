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
  
  function AdminPieChart2(data) {
    const RADIAN = Math.PI / 180;
    const dataChart = [
      { name: "Đơn Cod", value: data.props.orderCod },
      { name: "Đơn Banking", value: data.props.orderBank },
      { name: "Đơn hủy", value: data.props.orderCancel },
    ];
  
    const data02 = [
      { name: "Tổng đơn hàng", value: data.props.orderDone },
      { name: "Đơn hủy", value: data.props.orderCancel },
    ];
  
    const COLORS = ["#0088FE", "#00C49F", "#000"];
  
    return (
      <React.Fragment>
        <div className="Pie-Chart">
          <PieChart width={300} height={300}>
            {/* <Pie
              dataKey="value"
              isAnimationActive={false}
              data={dataChart}
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill={""}
              // label={"Tổng đơn"}
            >
              {dataChart.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie> */}
            <Pie
              data={dataChart}
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
              
            </Pie>
            <Tooltip />
  
          </PieChart>
        </div>
      </React.Fragment>
    );
  }
  
  export default AdminPieChart2;
  