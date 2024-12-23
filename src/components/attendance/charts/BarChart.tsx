import React from 'react';

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
}

export function BarChart({ data }: { data: ChartData }) {
  const maxValue = Math.max(...data.datasets.flatMap(ds => ds.data));
  const colors = ['#3B82F6', '#10B981', '#EF4444']; // blue, green, red

  return (
    <div className="relative h-full w-full">
      {/* Y-axis grid lines */}
      <div className="absolute inset-0 flex flex-col justify-between">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="border-t border-gray-200 w-full h-0"
            style={{ top: `${20 * i}%` }}
          />
        ))}
      </div>

      {/* Bars */}
      <div className="absolute inset-x-0 bottom-8 top-4 flex items-end justify-around px-4">
        {data.labels.map((label, i) => (
          <div key={label} className="relative flex-1 flex items-end justify-center group">
            {data.datasets.map((dataset, datasetIndex) => {
              const height = (dataset.data[i] / maxValue) * 100;
              return (
                <div
                  key={dataset.label}
                  className="mx-1 w-full max-w-[30px] rounded-t transition-all hover:opacity-80"
                  style={{
                    height: `${height}%`,
                    backgroundColor: colors[datasetIndex],
                  }}
                >
                  {/* Tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {dataset.label}: {dataset.data[i]}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 inset-x-0 flex justify-around px-4">
        {data.labels.map(label => (
          <div key={label} className="text-xs text-gray-500 truncate">
            {label}
          </div>
        ))}
      </div>

      {/* Y-axis labels */}
      <div className="absolute left-0 inset-y-4 flex flex-col justify-between">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="text-xs text-gray-500 -translate-y-2">
            {Math.round(maxValue - (i * maxValue / 4))}
          </div>
        ))}
      </div>
    </div>
  );
}