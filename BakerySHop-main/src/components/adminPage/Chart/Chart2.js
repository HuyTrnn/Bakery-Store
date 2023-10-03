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
  
  function Chart2(data) {
    
    const [saleMonth, setSaleMonth] = useState([]);
  
    useEffect(() => {
      const fetchRenevue = () => {
        fetch("http://localhost:81/api/sales-report")
          .then((res) => res.json())
          .then((data) => {
            setSaleMonth(data.sales_by_day_of_week);
          });
      };
      fetchRenevue();
    }, []);

  
   
  
  // Tạo danh sách 12 tháng trong năm
//   const months = [
//     { name: "Tháng 1", now: 0 },
//     { name: "Tháng 2", now: 0 },
//     { name: "Tháng 3", now: 0 },
//     { name: "Tháng 4", now: 0 },
//     { name: "Tháng 5", now: 0 },
//     { name: "Tháng 6", now: 0 },
//     { name: "Tháng 7", now: 0 },
//     { name: "Tháng 8", now: 0 },
//     { name: "Tháng 9", now: 0 },
//     { name: "Tháng 10", now: 0 },
//     { name: "Tháng 11", now: 0 },
//     { name: "Tháng 12", now: 0 },
//   ];
  
  // Gán giá trị doanh thu từ renevueYear cho danh sách tháng
  const months = saleMonth.map(({ date, total_sales }) => ({
    name: date,
    total_sales
  }));
  
  
  
    return (
      <React.Fragment>
        <div className="Chart">
          <LineChart
            width={500}
            data={months}
            height={300}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tickCount={12} />
            <YAxis
              label={{ angle: -90, position: "Left", marginRight: "20px"}}
              tickCount={10}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="total_sales"
  
              
              stroke="#82ca9d"
            />
          </LineChart>
          
        </div>
      </React.Fragment>
    );
  }
  
  export default Chart2;
  