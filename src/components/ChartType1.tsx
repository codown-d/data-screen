import CountUp from "react-countup";

function ChartType1(props: {
  className?: string;
  num: number;
  type: string;
  img: string;
}) {
  let { className, num, type, img } = props;

  return (
    <div className={`flex justify-center flex-col ${className}`}>
      <span className="flex justify-center text-[12px]">{type}</span>
      <div className="flex justify-center">
        <CountUp
          end={num}
          separator=","
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          className=" w-[146px] z-10 flex justify-center font-bold text-[40px] text-[#D0E0FF] leading-[48px]"
        />
      </div>

      <div className="flex justify-center mt-[-30px]">
        <img src={img} alt="" className="w-[146px]" />
      </div>
    </div>
  );
}

export default ChartType1;
 