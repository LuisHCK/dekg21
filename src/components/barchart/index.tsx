import React, { useEffect, useMemo, useState } from 'react'
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
import { TWorkOrdersPerMachine } from 'types/machinery'
import { workOrdersPerMachine } from 'backend/controllers/machinery.controller'

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

const BarChart = (): React.ReactElement => {
    const [dataList, setDataList] = useState<TWorkOrdersPerMachine[]>([])

    const data = useMemo(
        () => ({
            labels: dataList.map((item) => item.machine.name),
            data: dataList.map((item) => item.workOrders),
        }),
        [dataList],
    )

    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Maquina',
                data: data.data,
                backgroundColor: 'rgb(54 85 120)',
                barThickness: 20,
                minBarLength: 3,
            },
        ],
    }

    useEffect(() => {
        const getDataList = async () => {
            setDataList(await workOrdersPerMachine())
        }

        getDataList()
    }, [])

    return (
        <div className={styles.chartContainer}>
            <Bar options={options} data={chartData} />
        </div>
    )
}

export default BarChart
