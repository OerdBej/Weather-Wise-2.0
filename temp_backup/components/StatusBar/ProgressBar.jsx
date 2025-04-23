
import "./ProgressBar.css";

const ProgressBar = (props) => {


  const { size, progress, strokeWidth, circleOneStroke, circleTwoStroke } =
    props;
  
  const center = size / 2;
  
  const radius = size / 2 - strokeWidth / 2;
  
  const circumference = 2 * Math.PI * radius;

  return (
    <div>
      <svg className="circular-chart" width={size} height={size}>
        <circle
          className="circular-bg"
          stroke={circleOneStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        ></circle>
        <circle
          className="circle"
          stroke={circleTwoStroke}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={(100 - progress / 10) * circumference} 

        ></circle>
        <text x={center} y={center} className="svg-circle-text">
          {progress} / 10
        </text>
      </svg>
    </div>
  );
};

export default ProgressBar;