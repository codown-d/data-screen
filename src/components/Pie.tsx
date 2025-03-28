import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import * as echarts from "echarts";
import { EChartsInitOpts, EChartsOption, EChartsType } from "echarts";
import { merge } from "lodash";
import { useInterval } from "ahooks";
const Pie = forwardRef(
  (
    props: {
      className?: string;
      option: EChartsOption;
      initOpts?: EChartsInitOpts;
      onReady?: (ins: echarts.ECharts) => void;
      onItemChange?: (index: any) => void;
    },
    ref
  ) => {
    const { className, option = {}, initOpts,onItemChange } = props;
    const pieRef = useRef(null!);
    const [count, setCount] = useState(0);
    const [chartOption, setChartOption] = useState({});
    const myChart = useRef<EChartsType>(null!);
    useEffect(() => {
      if (!pieRef.current || myChart.current) return;
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
            show: true,
            trigger: "item",
          },
          legend: {
            show: false,
            top: "5%",
            left: "center",
          },
          series: [
            {
              name: "Access From",
              type: "pie",
              radius: ["45%", "55%"],
              data: [],
            },
          ],
        },
        option
      );
      setChartOption({ ...newOption });
      option && myChart.current && myChart.current?.setOption(newOption);
    }, [JSON.stringify(option)]);
    useInterval(() => {
      setCount((index) => {
        // @ts-ignore
        const data = myChart.current.getOption().series?.[0].data
        const dataLength =data.length;
        for (let i = 0; i < dataLength; i++) {
          myChart.current.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: i,
          });
        }
        myChart.current.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: index,
        });
        const updatedOption = { ...chartOption };
        
        // @ts-ignore
        updatedOption.series[0].data = updatedOption.series[0].data.map(
          (item: any, idx: number) => {
            item.itemStyle = idx === index ? { opacity: 1 } : { opacity: 0.2 };
            return item;
          }
        );
        onItemChange?.(data[index].name)
        myChart.current.setOption(updatedOption);
        if (index >= dataLength - 1) {
          return 0;
        } else {
          return index + 1;
        }
      });
    }, 5000);
    return (
      <div
        className={`flex justify-center flex-col ${className}`}
        ref={pieRef}
      ></div>
    );
  }
);

export default Pie;
