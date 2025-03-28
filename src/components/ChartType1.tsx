import Lottie from "lottie-react";
import CountUp from "react-countup";
import animationData from "@/assets/lottie/data.json";
import {  useEffect, useMemo, useRef } from "react";
import { formatNumber } from "../utils";

function ChartType1(props: {
  className?: string;
  num: number;
  type: string;
  img: string;
}) {
  const { className, num, type, img } = props;
  const lottieRef = useRef<any>(null);
  const newAnimationData = useMemo(() => {
    const data = JSON.parse(
      JSON.stringify(animationData).replace("${img}", img)
    );
    return data;
  }, [img]);
  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current?.setSpeed(1.5); // 设置播放速度为 2 倍
    }
  }, []);
  const data=useMemo(()=>{
    let d =  formatNumber(num)
    return d
  },[num])
  return (
    <div className={`flex justify-center flex-col ${className}`}>
      <span className="flex justify-center text-[12px] text-[#8C99B3] mb-1">
        {type}{data.unit?`(${data.unit})`:null}
      </span>
      <div className="flex justify-center">
        <CountUp
          end={Number(data.num)}
          decimals={data.unit?2:0}
          separator=","
          className=" w-[146px] z-10 flex justify-center font-bold text-[40px] text-[#D0E0FF] leading-[48px]"
        />
      </div>
      <div className="flex justify-center mt-[-60px]">
        <Lottie
        lottieRef={lottieRef} 
          animationData={newAnimationData}
          loop={true}
          className="w-[146px]"
        />
      </div>
    </div>
  );
}

export default ChartType1;
