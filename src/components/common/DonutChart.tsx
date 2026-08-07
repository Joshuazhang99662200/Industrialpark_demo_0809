// --- 环形图组件 (SVG Donut Chart) ---
export const DonutChart = ({
  data,
  size = 160,
  thickness = 20,
}: {
  data: any[];
  size?: number;
  thickness?: number;
}) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let currentAngle = 0;
  const radius = (size - thickness) / 2;
  const center = size / 2;

  // 颜色盘
  const colors = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f43f5e",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#64748b",
    "#94a3b8",
  ];

  if (total === 0) return <div className="text-xs text-slate-400">无数据</div>;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {data.map((item, index) => {
          const sliceAngle = (item.value / total) * 360;

          // 环长
          const circumference = 2 * Math.PI * radius;
          const strokeDasharray = `${
            (item.value / total) * circumference
          } ${circumference}`;
          const strokeDashoffset = -1 * (currentAngle / 360) * circumference;

          const circleElement = (
            <circle
              key={item.name}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={colors[index % colors.length]}
              strokeWidth={thickness}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300 hover:opacity-80"
            />
          );

          currentAngle += sliceAngle;
          return circleElement;
        })}
      </svg>
      {/* 中心文字 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-black text-slate-800">{total}</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          Projects
        </span>
      </div>
    </div>
  );
};
