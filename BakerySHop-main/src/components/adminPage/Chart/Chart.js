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

function Chart() {
  const [renevueYear, setRenevueYear] = useState([]);
  const [renevuePreviousYear, setRenevuePreviousYear] = useState([]);

  useEffect(() => {
    const fetchRenevue = () => {
      fetch("http://localhost:81/api/sales-report")
        .then((res) => res.json())
        .then((data) => {
          setRenevueYear(data.sales_by_month_of_year);
          setRenevuePreviousYear(data.sales_by_month_of_previous_year);
        });
    };
    fetchRenevue();
  }, []);


// Tạo danh sách 12 tháng trong năm
const months = [
  { name: "Tháng 1", now: 0, lastYear: 0 },
  { name: "Tháng 2", now: 0, lastYear: 0 },
  { name: "Tháng 3", now: 0, lastYear: 0 },
  { name: "Tháng 4", now: 0, lastYear: 0 },
  { name: "Tháng 5", now: 0, lastYear: 0 },
  { name: "Tháng 6", now: 0, lastYear: 0 },
  { name: "Tháng 7", now: 0, lastYear: 0 },
  { name: "Tháng 8", now: 0, lastYear: 0 },
  { name: "Tháng 9", now: 0, lastYear: 0 },
  { name: "Tháng 10", now: 0, lastYear: 0 },
  { name: "Tháng 11", now: 0, lastYear: 0 },
  { name: "Tháng 12", now: 0, lastYear: 0 },
];

// Gán giá trị doanh thu từ renevueYear cho danh sách tháng
renevueYear.forEach((revenue) => {
  const month = months[revenue.month - 1];
  if (month) {
    month.now = revenue.total_sales;
    month.lastYear = revenue.total_sales;
  }
});

// Gán giá trị doanh thu từ renevuePreviousYear cho danh sách tháng
renevuePreviousYear.forEach((revenue) => {
  const month = months[revenue.month - 1];
  if (month) {
    month.now = revenue.total_sales;
  }
});
 

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
            dataKey="lastYear"
            
            stroke="#8884d8"
          />
          
        </LineChart>
        |
      </div>
    </React.Fragment>
  );
}

export default Chart;
