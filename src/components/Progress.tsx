import Progress, { ProgressProps } from "antd/es/progress";
import TypographyTooltip from "./TypographyTooltip";

function ProgressChart(props: {
  className?: string;
  title: string;
  num: number;
}) {
  let { className, title, num } = props;
  const twoColors: ProgressProps["strokeColor"] = {
    "0%": "#3977F3",
    "100%": "#D9EFFF",
  };
  return (
    <div className={`flex justify-between h-[42px] w-full text-[14px] ${className}`}>
      <div className="w-[60px]">
        <TypographyTooltip
          className="!text-[#fff]"
          text={title}
        />
      </div>

      <div className="w-[320px]">
        <Progress
          percent={30}
          className="w-[320px]"
          showInfo={false}
          strokeColor={twoColors}
        />
      </div>
      <span className="text-[#fff] font-bold w-0 flex-1">{num}</span>
    </div>
  );
}

export default ProgressChart;
