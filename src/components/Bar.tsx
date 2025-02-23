import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as echarts from "echarts";
import { EChartsInitOpts, EChartsOption, EChartsType } from "echarts";
import { get, merge } from "lodash";
let Bar = forwardRef(
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
    let lineRef = useRef(null!);
    let myChart = useRef<EChartsType>(null!);
    useEffect(() => {
      if (!lineRef.current || myChart.current) return;
      myChart.current = echarts.init(lineRef.current, null, initOpts);
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
      let data = get(option, "series.0.data") as any[];
      let xAxisData = data.map((item) => {
        return item.name;
      });
      let newOption = merge(
        {
          grid: {
            left: "12%",
            top: "5%",
            bottom: "10%",
            right: "2%",
          },
          xAxis: {
            type: "category",
            data: xAxisData,
            axisLabel: {
              color: "#8C99B3", // 设置 x 轴坐标的颜色
            },
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: true, 
              lineStyle: {
                type: "dashed", 
                color: "#374052", 
                width: 1, 
              },
            },
            axisLabel: {
              color: "#8C99B3", 
            },
          },
          series: [
            {
              data: [],
              type: "bar",
              barWidth: 20,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#D9EFFF" },
                  { offset: 0.5, color: "#64BCFF" },
                  { offset: 1, color: "#3977F3" },
                ]),
              },
              label: {
                show: true,
                position: "top",
                color: "#D9EFFF",
              },
              showBackground: true,
              backgroundStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "rgba(57,119,243,0.16)" },
                  { offset: 1, color: "rgba(123,241,194,0)" },
                ]),
              },
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
        ref={lineRef}
      ></div>
    );
  }
);

export default Bar;
