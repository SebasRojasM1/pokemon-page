import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, ChartOptions } from 'chart.js';
import "../assets/styles/pokemonGraph.scss"

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface PokemonRadarChartProps {
  stats: number[];
}

function PokemonRadarChart({ stats }: PokemonRadarChartProps): JSX.Element {
  const data = {
    labels: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'],
    datasets: [
      {
        label: '',
        data: stats,
        backgroundColor: '#ce8f4745',
        borderColor: '#B46C22',
        borderWidth: 1,
        pointBackgroundColor: '#B46C22',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          beginAtZero: true,
        },
      },
    },
    plugins: {
        legend: {
            display: false,
        },
      },
  };

  return (
    <div className="pokemon-radar-chart">
      <Radar data={data} options={options as ChartOptions<'radar'>} />
    </div>
  );
}

export default PokemonRadarChart;
