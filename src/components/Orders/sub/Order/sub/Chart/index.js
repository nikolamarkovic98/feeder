import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';

const Chart = props => {
    const data = {
        labels: props.orderItems.map(item => item.user),
        datasets: [
            {
                label: 'Price',
                data: props.orderItems.map(item => item.orderPrice),
                backgroundColor: props.orderItems.map((item, index) =>
                    // with this approach I get random color
                    `rgb(
                        ${Math.floor(Math.random()*100)}
                        ${Math.floor(Math.random()*100)}
                        ${Math.floor(Math.random()*100)}
                    )`)
            }
        ]
    }

    return(
        <div className="chart">
            <Pie
                data={data}
                options={{
                    title: {
                        text: 'Some chart',
                        display: true,
                        padding: 20,
                        fontSize: 24,
                        fontColor: '#fff'
                    },
                    legend: {
                        position: 'bottom'
                    }
                }}
            />
        </div>
    )
}

export default Chart;