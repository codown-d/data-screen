import Progress, { ProgressProps } from "antd/es/progress";
import TypographyTooltip from "./TypographyTooltip";
import CountUp from "react-countup";

function ProgressChart(props: {
  className?: string;
  title: string;
  num: number;
  percent: number;
}) {
  let { className, title, num, percent } = props;
  const twoColors: ProgressProps["strokeColor"] = {
    "0%": "#3977F3",
    "100%": "#D9EFFF",
  };
  return (
    <div
      className={`flex justify-between items-center h-[42px] w-full text-[14px] ${className}`}
    >
      <div className="flex">
        <div className="w-[80px] ml-[20px]">
          <TypographyTooltip className="!text-[#fff]" text={title} />
        </div>
        <div className="w-[230px]">
          <Progress
            percent={percent}
            showInfo={false}
            strokeColor={twoColors}
            status="active"
          />
        </div>
      </div>
      <span className="text-[#fff] font-bold mr-3">
        <CountUp end={Number(num)} separator="," suffix="笔" />
      </span>
    </div>
  );
}

export default ProgressChart;
