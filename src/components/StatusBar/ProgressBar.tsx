import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  size: number;
  progress: number;
  strokeWidth: number;
  circleOneStroke: string;
  circleTwoStroke: string;
}

const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  // Only using size, progress, and strokeWidth from props
  const { size, progress, strokeWidth } = props;
  const [ratingClass, setRatingClass] = useState<string>("");
  
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const outerRadius1 = radius + 15;
  const outerRadius2 = radius + 30;
  const outerRadius3 = radius + 45;

  // Set rating class based on progress value for color-coding
  useEffect(() => {
    if (progress <= 3) {
      setRatingClass("rating-bad");
    } else if (progress <= 5) {
      setRatingClass("rating-poor");
    } else if (progress <= 7) {
      setRatingClass("rating-average");
    } else if (progress <= 9) {
      setRatingClass("rating-good");
    } else {
      setRatingClass("rating-excellent");
    }
  }, [progress]);

  return (
    <div>
      <svg className="circular-chart" width={size + 100} height={size + 100}>
        {/* Pulsating rings */}
        <circle
          className={`pulse-ring pulse-ring-3 ${ratingClass}`}
          cx={center + 50}
          cy={center + 50}
          r={outerRadius3}
          strokeWidth={2}
        ></circle>
        <circle
          className={`pulse-ring pulse-ring-2 ${ratingClass}`}
          cx={center + 50}
          cy={center + 50}
          r={outerRadius2}
          strokeWidth={2}
        ></circle>
        <circle
          className={`pulse-ring ${ratingClass}`}
          cx={center + 50}
          cy={center + 50}
          r={outerRadius1}
          strokeWidth={2}
        ></circle>
        
        {/* Main rating circle */}
        <circle
          className={`circular-bg ${ratingClass}`}
          cx={center + 50}
          cy={center + 50}
          r={radius}
          strokeWidth={strokeWidth}
        ></circle>
        <circle
          className={`circle ${ratingClass}`}
          cx={center + 50}
          cy={center + 50}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={(100 - progress / 10) * circumference}
        ></circle>
        <text x={center + 50} y={center + 50} className="svg-circle-text">
          {progress} / 10
        </text>
      </svg>
    </div>
  );
};

export default ProgressBar;
