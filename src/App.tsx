import { useSetState, useSize } from "ahooks";
import { useCallback, useEffect, useRef, useState } from "react";
import ChartType1 from "./components/ChartType1";
import Pie from "./components/Pie";
import Title from "./components/Title";
import MapComponent from "./components/MapComponent";
import ProgressChart from "./components/Progress";
import Line from "./components/Line";
import Bar from "./components/Bar";
import Subtitle from "./components/Subtitle";
import { max, merge } from "lodash";
import Segmented from "antd/es/segmented";
import dayjs from "dayjs";
import { indexleft, indexmiddle, indexright } from "./services";
import { SegmentedOp } from "./constant";

function App() {
  const headerRef = useRef(null);
  const [colors, setColors] = useState<string[]>([]);
  const [actSegmented, setActSegmented] = useState<string>("总览");
  let [type1, setType1] = useState([
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
  ]);
  let [type2, setType2] = useState([]);
  let [type3, setType3] = useState([
    { value: 10, name: "100万以下" },
    { value: 0, name: "100万-500万" },
    { value: 0, name: "500万-1000万" },
    { value: 0, name: "1000万以上" },
  ]);
  let [type4, setType4] = useState([
    { value: 10, name: "100万以下" },
    { value: 0, name: "100万-500万" },
    { value: 0, name: "500万-1000万" },
    { value: 0, name: "1000万以上" },
  ]);
  let getInit = useCallback(async () => {
    let res1 = {
      zbs1: 2536,
      zje2: 290831.5797809999,
      jzbs1: 3,
      jzje2: 1111.6265,
      hrfl3: [
        {
          je6: 100903.76,
          hyname1: "农业",
        },
        {
          je6: 189927.819781,
          hyname1: "工业",
        },
      ],
      jrfb100: 46605.764492,
      jrfb500: 203352.115289,
      jrfb1000: 22835,
      jrfb1001: 18038.7,
      status: 100,
    };
    //await indexleft();
    let res2 = {
      hrfl3: [
        {
          je6: 108064.203784,
          djjg1: null,
          bs1: 775,
        },
        {
          je6: 95172.918346,
          djjg1: "利州区",
          bs1: 736,
        },
        {
          je6: 8505.2,
          djjg1: "剑阁县",
          bs1: 75,
        },
        {
          je6: 19780.25524,
          djjg1: "旺苍县",
          bs1: 217,
        },
        {
          je6: 14682,
          djjg1: "昭化区",
          bs1: 198,
        },
        {
          je6: 25629.142411,
          djjg1: "朝天区",
          bs1: 328,
        },
        {
          je6: 9543.46,
          djjg1: "苍溪县",
          bs1: 103,
        },
        {
          je6: 9454.4,
          djjg1: "青川县",
          bs1: 104,
        },
      ],
      status: 100,
    };
    //await indexmiddle();
    let res3 = {
      data: [
        {
          year1: "2016",
          jkje1: 17977,
          zbye3: 2196.3300780000004,
        },
        {
          year1: "2017",
          jkje1: 30905,
          zbye3: 1424.270512,
        },
        {
          year1: "2018",
          jkje1: 19992,
          zbye3: 997.928487,
        },
        {
          year1: "2019",
          jkje1: 20561,
          zbye3: 250.605996,
        },
        {
          year1: "2020",
          jkje1: 21118.5,
          zbye3: 1233,
        },
        {
          year1: "2021",
          jkje1: 18749.5,
          zbye3: 2559.877364,
        },
        {
          year1: "2022",
          jkje1: 17621.6,
          zbye3: 1743.081323,
        },
        {
          year1: "2023",
          jkje1: 24227.3,
          zbye3: 11123.800000000001,
        },
        {
          year1: "2024",
          jkje1: 79979.97148400001,
          zbye3: 61573.926484,
        },
        {
          year1: "2025",
          jkje1: 2965.7082969999997,
          zbye3: 2475.708297,
        },
      ],
      status: 100,
    };
    //await indexright();
    let {
      zbs1,
      zje2,
      jzbs1,
      jzje2,
      hrfl3,
      jrfb100,
      jrfb500,
      jrfb1000,
      jrfb1001,
    } = res1 as any;
    console.log(res1);
    console.log(res2);
    console.log(res3);
    setType1((pre:any) => {
      return merge(pre, [
        { value: zbs1 },
        { value: zje2 },
        { value: jzbs1 },
        { value: jzje2 },
      ]);
    });
    setType2(hrfl3.map((item: { je6: any; hyname1: any }) => ({
      value: Number(item.je6).toFixed(2),
      name: item.hyname1,
    })));
    setType3((pre:any) => {
      return merge(pre, [
        { value: jrfb100 },
        { value: jrfb500 },
        { value: jrfb1000 },
        { value: jrfb1001 },
      ].map(item=>({value:Number(item.value).toFixed(2)})));
    });
  }, []);
  useEffect(() => {
    getInit();
  }, []);
  return (
    <div
      className="flex relative h-full overflow-hidden main"
      style={{
        background: "url(/img/main-bg.png) no-repeat center center",
        backgroundSize: "100% 100%",
      }}
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
                        item.value == actSegmented
                          ? "item-segment act-segment "
                          : "item-segment"
                      } px-[46px]`}
                      onClick={() => {
                        setActSegmented(item.value);
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
              {type1.map((item) => {
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
                      data: type2,
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
                {type2.map((item: any, index) => {
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
                      data: type3,
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
                {type4.map((item, index) => {
                  let maxVal = max(type4.map((item) => item.value)) as number;
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
                        data: type2,
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
                        data: type2,
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
