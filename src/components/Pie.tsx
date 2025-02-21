import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { EChartsInitOpts, EChartsOption, EChartsType } from "echarts";
import { merge } from "lodash";
function Pie(props: { className?: string; option: EChartsOption,initOpts?:EChartsInitOpts }) {
  let { className, option = {},initOpts } = props;
  let pieRef = useRef(null!);
  let myChart = useRef<EChartsType>(null!);

  useEffect(() => {
    if(!pieRef.current)return;
    myChart.current = echarts.init(pieRef.current,null,initOpts);
  }, []);
  useEffect(() => {
    let newOption = merge(
      {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "Search Engine" },
              { value: 735, name: "Direct" },
              { value: 580, name: "Email" },
              { value: 484, name: "Union Ads" },
              { value: 300, name: "Video Ads" },
            ],
          },
        ],
      },
      option
    );
    option && myChart.current && myChart.current?.setOption(newOption);
  }, [myChart]);
  return (
    <div
      className={`flex justify-center flex-col ${className}`}
      ref={pieRef}
    ></div>
  );
}

export default Pie;
