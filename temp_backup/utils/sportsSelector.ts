import cyclingImg from "../assets/cyclingImg.png";
import runningImg from "../assets/runningImg.png";

interface SportOption {
  name: string;
  img: string;
}

export const sportsOptions: SportOption[] = [
  {
    name: "cycling",
    img: cyclingImg,
  },
  {
    name: "running",
    img: runningImg,
  },
];
