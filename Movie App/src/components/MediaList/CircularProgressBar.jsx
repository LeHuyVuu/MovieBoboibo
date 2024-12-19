

export const CircularProgressBar = ({ percent = 69, size = 100, strokeWidth = 8, strokeColor = "#FFD700", textColor = "white" }) => {
  const radius = size / 2 - strokeWidth; // Bán kính của vòng tròn
  const circumference = 2 * Math.PI * radius; // Chu vi vòng tròn
  const offset = percent // Phần bị ẩn dựa trên percent

  return (
    <div>
      <div className="flex items-center space-x-2 mb-3">
        <svg
          className={`w-${size / 10} h-${size / 10}`}
          viewBox={`0 0 ${size} ${size}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Nền vòng tròn */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E5E5E5"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Vòng tròn tiến trình */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 0.35s',
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
          {/* Text ở giữa */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            fill={textColor}
            fontSize={size / 3.5}
            fontWeight="bold"
            dy=".3em"
          >
            {percent}
          </text>
        </svg>
      </div>
    </div>
  );
};
