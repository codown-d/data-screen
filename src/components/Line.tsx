import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as echarts from "echarts";
import { EChartsInitOpts, EChartsOption, EChartsType } from "echarts";
import { get, merge } from "lodash";
let Line = forwardRef(
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
              show: true, // 显示网格线
              lineStyle: {
                type: "dashed", // 设置虚线样式
                color: "#374052", // 设置虚线颜色
                width: 1, // 设置虚线宽度
              },
            },
            axisLabel: {
              color: "#8C99B3", // 设置 x 轴坐标的颜色
            },
          },
          series: [
            {
              data: [],
              type: "line",
              symbolSize: 10,
              itemStyle: {
                borderColor: "#000", // 边框颜色
                borderWidth: 2, // 边框宽度
              },
            },
            {
              data: data?.map(() => 0),
              type: "bar",
              showBackground: true,
              barWidth: 26,
              backgroundStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: "rgba(57,119,243,0.16)" },
                  { offset: 1, color: "rgba(123,241,194,0)" },
                ]),
              },
              itemStyle: {
                color: "none",
              },
            },
          ],
        },
        option
      );
      option && myChart.current && myChart.current?.setOption(newOption);
    }, [myChart,JSON.stringify(option)]);
    return (
      <div
        className={`flex justify-center flex-col ${className}`}
        ref={lineRef}
      ></div>
    );
  }
);

export default Line;
