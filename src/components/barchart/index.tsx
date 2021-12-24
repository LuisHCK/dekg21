import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import styles from './styles.module.scss'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Ordenes de mantenimiento por máquina',
        },
    },
}

const labels = [
    'SECADOR DE CAMARA HORIZONTAL DHNP - 120 IX',
    'Clasificadora optica por color',
    'Mesa Paddy',
]

export const data = {
    labels,
    datasets: [
        {
            label: 'Maquina',
            data: [6, 4, 7],
            backgroundColor: 'rgb(54 85 120)',
            barThickness: 20,
        },
    ],
}

const BarChart = (): React.ReactElement => {
    return (
        <div className={styles.chartContainer}>
            <Bar options={options} data={data} />
        </div>
    )
}

export default BarChart
