import { useEffect, useState  } from "react";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const HistoryCharts = (props) => {

    return (
        <div className="DetailsPage-Charts">
            <Bar className="Bar-Style" style={{maxWidth: '98em', maxHeight: '30em'}}
                data={{
                labels : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [{
                    label: 'Currency Exchange Rates',
                    data: props.exchangeRateArray,
                    backgroundColor:[
                        'rgba(137, 24, 24, 0.5)',
                        'rgba(225, 26, 142, 0.5)',
                        'rgba(182, 26, 225, 0.5)',
                        'rgba(57, 20, 219, 0.5)',
                        'rgba(20, 106, 219, 0.5)',
                        'rgba(20, 169, 219, 0.5)',
                        'rgba(20, 219, 176, 0.5)',
                        'rgba(20, 219, 50, 0.5)',
                        'rgba(166, 219, 20, 0.5)',
                        'rgba(212, 219, 20, 0.5)',
                        'rgba(219, 176, 20, 0.5)',
                        'rgba(219, 53, 20, 0.5)'
                    ],
                }]
            }}/>
        </div>
    )
}

export default HistoryCharts;