import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as echarts from "echarts";
import { EChartsInitOpts, EChartsOption, EChartsType } from "echarts";
import { merge } from "lodash";
let Pie = forwardRef(
  (
    props: {
      className?: string;
      option: EChartsOption;
      initOpts?: EChartsInitOpts;
      onReady?: (ins: echarts.ECharts) => void;
    },
    ref
  ) => {
    let { className, option = {}, initOpts } = props;
    let pieRef = useRef(null!);
    let myChart = useRef<EChartsType>(null!);
    useEffect(() => {
      if (!pieRef.current||myChart.current) return;
      myChart.current = echarts.init(pieRef.current, null, initOpts);
      myChart.current.on("finished", () => {
        props.onReady?.(myChart.current);
      });
    }, []);
    useImperativeHandle(ref, () => ({
      getChartIns() {
        return myChart;
      },
    }));
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
              radius: ["47%", "53%"],
              padAngle: 4,
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 20,
              },
              label: {
                show: false,
                position: "center",
              },
              labelLine: {
                show: false,
              },
              data: [],
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
);

export default Pie;
