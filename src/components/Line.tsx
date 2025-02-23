import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as echarts from "echarts";
import { EChartsInitOpts, EChartsOption, EChartsType } from "echarts";
import { merge } from "lodash";
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
      if (!lineRef.current||myChart.current) return;
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
      let newOption = merge({
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)'
              }
            }
          ]
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

export default Line;
