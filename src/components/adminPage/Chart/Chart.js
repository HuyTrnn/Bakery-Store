import {
  LineChart,
  Label,
  Legend,
  Bar,
  BarChart,
  Tooltip,
  Cell,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import React, { useState } from "react";
import { useEffect } from "react";

function Chart({props}) {
  const [renevueYear, setRenevueYear] = useState([]);
  const [renevuePreviousYear, setRenevuePreviousYear] = useState([]);

  const [completed, setCompleted] = useState(props.total_amount_completed);
  const [completedAmount, setCompletedAmount] = useState(props.total_amount);

  // useEffect(() => {
  //   const fetchRenevue = () => {
  //     fetch("http://localhost:81/api/sales-report")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setRenevueYear(data.sales_by_month_of_year);
  //         setRenevuePreviousYear(data.sales_by_month_of_previous_year);
  //       });
  //   };
  //   fetchRenevue();
  // }, []);


// Tạo danh sách 12 tháng trong năm
const months = [
  { name: "Tháng 1", now: completed['1'], confirmed: completedAmount['1'] },
  { name: "Tháng 2", now: completed['2'], confirmed: completedAmount['2'] },
  { name: "Tháng 3", now: completed['3'], confirmed: completedAmount['3'] },
  { name: "Tháng 4", now: completed['4'], confirmed: completedAmount['4'] },
  { name: "Tháng 5", now: completed['5'], confirmed: completedAmount['5'] },
  { name: "Tháng 6", now: completed['6'], confirmed: completedAmount['6'] },
  { name: "Tháng 7", now: completed['7'], confirmed: completedAmount['7'] },
  { name: "Tháng 8", now: completed['8'], confirmed: completedAmount['8'] },
  { name: "Tháng 9", now: completed['9'], confirmed: completedAmount['9'] },
  { name: "Tháng 10", now: completed['10'], confirmed: completedAmount['10'] },
  { name: "Tháng 11", now: completed['11'], confirmed: completedAmount['11'] },
  { name: "Tháng 12", now: completed['12'], confirmed: completedAmount['12'] },
];
 

  return (
    <React.Fragment>
      <div className="Chart">
        <LineChart
          width={1000}
          data={months}
          height={400}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tickCount={12} />
          <YAxis
            label={{ value: "Doanh thu", angle: -90, position: "Left", marginRight: "20px"}}
            tickCount={5}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="now"

            
            stroke="#82ca9d"
          />
          <Line
            type="monotone"
            dataKey="confirmed"
            
            stroke="#8884d8"
          />
          
        </LineChart>

      </div>
    </React.Fragment>
  );
}

export default Chart;
