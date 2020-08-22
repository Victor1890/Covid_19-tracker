import React, { Fragment, useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import { fetchDailyDate } from "../../services";

import style from "./Chart.module.css";

export default function Chart({ data: { confirmed, recovered, deaths }, country }) {

  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const getDataDaily = async () => {
      const response = await fetchDailyDate();
      setDailyData(response);
    };

    getDataDaily();
  }, []);

  const lineChart = (
    dailyData.length ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => date),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );
  
  const barChart = (
    confirmed ? (
    <Bar 
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: [
            'rgba(0, 0, 250, 0.5)',
            'rgba(0, 250, 0, 0.5)',
            'rgba(250, 0, 0, 0.5)'
          ],
          data: [confirmed.value, recovered.value, deaths.value]
        }]
      }}
      options={{
        legend: {display: false},
        title: { display: true, text: `Current state in ${country}` }
      }}
    />
    ) : (null)
  );

  return(
    <Fragment>
        <div className={style.container}>
            {country ? barChart : lineChart}
        </div>
    </Fragment>
  );
}
