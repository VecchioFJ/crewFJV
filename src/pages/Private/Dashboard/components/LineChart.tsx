import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface LineProps {
  title: string
  data: number[][]
  width: string
  fontSize: number
  showLabels: boolean
  legPosition: 'top' | 'bottom'
}

export const LineChart: React.FC<LineProps> = ({
  title,
  data,
  width,
  fontSize,
  showLabels,
  legPosition,
}) => {
  const labelsMonth = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]

  let datasetsData
  if (Array.isArray(data) && data.length === 1 && Array.isArray(data[0])) {
    datasetsData = [data[0]]
  } else {
    datasetsData = data
  }

  const dataLine = {
    labels: labelsMonth,
    datasets: datasetsData.map((dataArray, index) => {
      let label, borderColor, backgroundColor
      if (index === 0) {
        label = datasetsData.length === 1 ? 'Users' : 'Community Projects'
        borderColor =
          datasetsData.length === 1 ? '#3a86ff' : 'rgba(86, 191, 73)'
        backgroundColor =
          datasetsData.length === 1 ? '#3a86ff' : 'rgba(86, 191, 73)'
      } else if (index === 1) {
        label = 'Creative Works'
        borderColor = 'rgba(20, 146, 200)'
        backgroundColor = 'rgba(20, 146, 200)'
      } else if (index === 2) {
        label = 'Tech & Innovation'
        borderColor = 'rgba(193, 52, 82)'
        backgroundColor = 'rgba(193, 52, 82)'
      }

      return {
        data: dataArray,
        fill: false,
        tension: 0,
        label,
        borderColor,
        backgroundColor,
      }
    }),
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: showLabels,
        position: legPosition,
        labels: {
          padding: 20,
          font: {
            weight: 'bold',
            size: fontSize,
          },
        },
      },
      title: {
        display: false,
        text: title,
        position: 'bottom' as const,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          color: 'rgb(73, 80, 87, 0.25)',
        },
      },
      y: {
        display: showLabels,
        grid: {
          color: 'rgb(73, 80, 87, 0.25)',
        },
      },
    },
  }

  const chartStyle = {
    height: '400px', // Establece aquí la altura deseada del gráfico
    width: '100%', // El gráfico ocupará todo el ancho disponible
  }

  return (
    // <div className={`flex h-[400px] ${width}`}>
    <div style={chartStyle}>
      <Line data={dataLine} options={options} />
    </div>
  )
}
