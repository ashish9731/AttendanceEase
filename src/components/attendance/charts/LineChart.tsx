import React from 'react';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export function LineChart({ data }: { data: ChartData }) {
  const maxValue = Math.max(...data.datasets[0].data);
  const minValue = Math.min(...data.datasets[0].data);
  const range = maxValue - minValue;

  const points = data.datasets[0].data.map((value, index) => ({
    x: (index / (data.labels.length - 1)) * 100,
    y: 100 - ((value - minValue) / range) * 80 - 10 // 10% padding top and bottom
  }));

  const pathD = points
    .map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    )
    .join(' ');

  return (
    <div className="relative h-full w-full">
      {/* Grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="border-t border-gray-200 w-full h-0"
            style={{ top: `${20 * i}%` }}
          />
        ))}
      </div>

      {/* Chart */}
      <svg className="absolute inset-0" preserveAspectRatio="none">
        <path
          d={pathD}
          fill="none"
          stroke="#3B82F6"
          strokeWidth="2"
          className="transition-all duration-300"
        />
        {points.map((point, index) => (
          <g key={index} className="group">
            <circle
              cx={point.x + '%'}
              cy={point.y + '%'}
              r="4"
              className="fill-white stroke-blue-500 stroke-2"
            />
            <circle
              cx={point.x + '%'}
              cy={point.y + '%'}
              r="8"
              className="fill-blue-500 opacity-0 group-hover:opacity-10 transition-opacity"
            />
            {/* Tooltip */}
            <g className="opacity-0 group-hover:opacity-100 transition-opacity">
              <rect
                x={point.x - 20 + '%'}
                y={point.y - 30 + '%'}
                width="40"
                height="20"
                rx="4"
                className="fill-gray-800"
              />
              <text
                x={point.x + '%'}
                y={point.y - 16 + '%'}
                textAnchor="middle"
                className="fill-white text-xs"
              >
                {data.datasets[0].data[index]}
              </text>
            </g>
          </g>
        ))}
      </svg>

      {/* X-axis labels */}
      <div className="absolute bottom-0 inset-x-0 flex justify-between px-4">
        {data.labels.map(label => (
          <div key={label} className="text-xs text-gray-500">
            {label}
          </div>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="absolute left-0 inset-y-4 flex flex-col justify-between">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="text-xs text-gray-500 -translate-y-2">
            {Math.round(maxValue - (i * range / 4))}
          </div>
        ))}
      </div>
    </div>
  );
}