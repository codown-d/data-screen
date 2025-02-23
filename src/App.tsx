import { useSetState, useSize } from "ahooks";
import { useEffect, useRef, useState } from "react";
import ChartType1 from "./components/ChartType1";
import Pie from "./components/Pie";
import Title from "./components/Title";
import MapComponent from "./components/MapComponent";
import ProgressChart from "./components/Progress";
import Line from "./components/Line";
import Bar from "./components/Bar";
import Subtitle from "./components/Subtitle";
import { max } from "lodash";
import Segmented from "antd/es/segmented";
import dayjs from "dayjs";

function App() {
  const headerRef = useRef(null);
  const size = useSize(headerRef);
  const [colors, setColors] = useState<string[]>([]);
  const [actSegmente, setActSegmente] = useState<string>("总览");
  const SegmentedOp = [
    {
      label: "总览",
      value: "总览",
    },
    {
      label: "担保",
      value: "担保",
    },
    {
      label: "小贷",
      value: "小贷",
    },
    {
      label: "应急转贷",
      value: "应急转贷",
    },
  ];
  let [data, setData] = useSetState({
    type1: [
      {
        value: 1000,
        name: "笔数",
        img: "/img/zs1.png",
      },
      {
        value: 1000,
        name: "金额",
        img: "/img/zs2.png",
      },
      {
        value: 1000,
        name: "近一个月笔数",
        img: "/img/zs3.png",
      },
      {
        value: 1000,
        name: "近一个月金额",
        img: "/img/zs1.png",
      },
    ],
    type2: [
      { value: 1048, name: "标题名1" },
      { value: 735, name: "标题名2" },
      { value: 580, name: "标题名3" },
      { value: 484, name: "标题名4" },
      { value: 300, name: "标题名5" },
    ],
    type4: [
      { value: 1048, name: "标题名" },
      { value: 735, name: "标题名" },
      { value: 580, name: "标题名" },
      { value: 484, name: "标题名" },
      { value: 300, name: "标题名" },
    ],
  });
  useEffect(() => {}, [size]);
  return (
    <div
      className="flex relative h-full overflow-hidden main"
      style={{ background: "rgb(15,28,58)" }}
    >
      <img
        src="/img/header.png"
        alt=""
        className="absolute top-0"
        ref={headerRef}
      />
      <div className="flex w-full flex-col">
        <div className="w-full z-10 h-[82px]">
          <div className="flex justify-between mt-[40px] h-[42px] px-[20px]">
            <div className="flex text-[#8C99B3] h-full leading-[42px]">
              {SegmentedOp.map((item) => {
                return (
                  <>
                    <div
                      className={`${
                        item.value == actSegmente
                          ? "item-segment act-segment "
                          : "item-segment"
                      } px-[46px]`}
                      onClick={() => {
                        setActSegmente(item.value);
                      }}
                    >
                      {item.label}
                    </div>
                  </>
                );
              })}
            </div>
            <div className="mr-[10px] text-[24px] text-[#8C99B3]">
              {dayjs().format("YYYY年 M月D日 dddd HH:mm")}
            </div>
          </div>
        </div>
        <div className="flex relative w-full h-0 flex-1">
          <div className="ml-5 pr-5 mt-[26px] w-[446px] overflow-auto absolute left-0 h-full pb-[32px]">
            <Title title={"运营数据"} className="mb-[16px]" />
            <div className="grid grid-cols-2 item-bg">
              {data.type1.map((item) => {
                return (
                  <ChartType1
                    key={item.name}
                    className={"w-[206px]"}
                    num={item.value}
                    type={item.name}
                    img={item.img}
                  />
                );
              })}
            </div>
            <Title
              title={"行业分析"}
              className=" mt-[22px] mb-[16px]"
              img="/img/hyfb.png"
            />
            <div className="flex justify-between item-bg">
              <Pie
                option={{
                  series: [
                    {
                      data: data.type2,
                      padAngle: 4,
                      itemStyle: {
                        borderRadius: 20,
                      },
                      label: {
                        show: true,
                        position: "center",
                        formatter: "{value|{c}}",
                        rich: {
                          value: {
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#fff",
                          },
                        },
                      },
                    },
                  ],
                  legend: {
                    show: false,
                  },
                  graphic: {
                    type: "image",
                    id: "bg-image",
                    style: {
                      image: "/img/pie-bg.png",
                      width: 252,
                      height: 218,
                    },
                    left: "center",
                    top: "center",
                  },
                }}
                initOpts={{ width: 252, height: 218 }}
                onReady={(ins) => {
                  setColors(ins.getOption().color as string[]);
                }}
              />
              <div className="flex flex-col justify-around py-5 flex-1">
                {data.type2.map((item, index) => {
                  return (
                    <div
                      className="text-[#8C99B3] text-[12px] flex justify-between"
                      key={index}
                    >
                      <span className="mr-4">
                        <span
                          className={`inline-block w-[10px] h-[10px] rounded-[10px] mr-2`}
                          style={{ background: colors[index] }}
                        ></span>
                        {item.name}
                      </span>
                      <span className="text-[#fff] font-bold ">
                        {item.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <Title
              title={"金额分布"}
              className=" mt-[22px] mb-[16px]"
              img="/img/jrfb.png"
            />
            <div className="flex justify-center items-center item-bg">
              <Pie
                option={{
                  series: [
                    {
                      data: data.type2,
                      radius: ["50%", "90%"],
                      roseType: "area",

                      label: {
                        alignTo: "labelLine",
                        formatter: "{name|{b}}\n{value|{c}}",
                        lineHeight: 16,
                        rich: {
                          name: {
                            fontSize: 12,
                            color: "#8C99B3",
                          },
                          value: {
                            fontSize: 12,
                            verticalAlign: "middle",
                            color: "#fff",
                          },
                        },
                      },
                      labelLine: {
                        length: 0,
                        length2: 20,
                      },
                      labelLayout: function (params) {
                        const points = params.labelLinePoints;
                        if (points) {
                          points[2][0] =
                            params.labelRect.x + params.labelRect.width / 2;
                        }
                        return {
                          verticalAlign: "top",
                          align: "center",
                          labelLinePoints: points,
                        };
                      },
                    },
                  ],
                  legend: {
                    show: false,
                  },
                  graphic: {
                    type: "image",
                    id: "bg-image",
                    style: {
                      image: "/img/pie-bg2.png",
                      width: 100,
                      height: 100,
                    },
                    left: "center", // 图像水平居中
                    top: "center", // 图像垂直居中
                  },
                }}
                initOpts={{ width: 402, height: 242 }}
                onReady={(ins) => {
                  setColors(ins.getOption().color as string[]);
                }}
              />
            </div>
          </div>
          <MapComponent />
          <div className="ml-5 pr-5 mt-[26px] w-[446px] overflow-auto absolute right-0 h-full pb-[32px]">
            <div className="">
              <Title
                title={"区域排名"}
                className=" mb-[16px]"
                img="/img/qypm.png"
              />
              <div className="grid grid-cols-1 item-bg">
                {data.type4.map((item, index) => {
                  let maxVal = max(
                    data.type4.map((item) => item.value)
                  ) as number;
                  return (
                    <ProgressChart
                      className={index % 2 == 0 ? "item-act" : ""}
                      key={item.name}
                      num={item.value}
                      percent={(item.value / maxVal) * 90}
                      title={item.name}
                    />
                  );
                })}
              </div>
              <Title
                title={"行业分析"}
                className="mt-[32px] mb-[22px]"
                img="/img/ywfz.png"
              />
              <div className="flex flex-col item-bg">
                <Subtitle title={"发生额"} className="mb-4" />
                <Bar
                  option={{
                    series: [
                      {
                        data: data.type2,
                      },
                    ],
                  }}
                  initOpts={{ width: 402, height: 218 }}
                />
                <Subtitle title={"余额"} className="mt-[32px] mb-4" />
                <Line
                  option={{
                    series: [
                      {
                        data: data.type2,
                      },
                    ],
                  }}
                  initOpts={{ width: 402, height: 218 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <img
        src="/img/footer.png"
        alt=""
        className="absolute bottom-0 "
        ref={headerRef}
      />
    </div>
  );
}

export default App;
