import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ChartType1 from "./components/ChartType1";
import Pie from "./components/Pie";
import Title from "./components/Title";
import MapComponent from "./components/MapComponent";
import ProgressChart from "./components/Progress";
import Line from "./components/Line";
import Bar from "./components/Bar";
import Subtitle from "./components/Subtitle";
import { max, merge } from "lodash";
import dayjs from "dayjs";
import { indexleft, indexmiddle, indexright } from "./services";
import { SegmentedOp, data } from "./constant";
import { chartFormat, formatAmount, formatNumber } from "./utils";

function App() {
  const headerRef = useRef(null);
  const [colors, setColors] = useState<string[]>([]);
  const [actSegmented, setActSegmented] = useState<string>("all");
  let [type1, setType1] = useState([
    {
      value: 1000,
      name: "笔数",
      img: "zs1.png",
    },
    {
      value: 1000,
      name: "金额",
      img: "zs2.png",
    },
    {
      value: 1000,
      name: "近一个月笔数",
      img: "zs3.png",
    },
    {
      value: 1000,
      name: "近一个月金额",
      img: "zs1.png",
    },
  ]);
  let [type2, setType2] = useState([
    {
      name: 132,
      value: 200,
    },
    {
      name: 152,
      value: 300,
    },
  ]);
  let [type3, setType3] = useState([
    { value: 10, name: "100万以下" },
    { value: 0, name: "100万-500万" },
    { value: 0, name: "500万-1000万" },
    { value: 0, name: "1000万以上" },
  ]);
  let [typeM, setTypeM] = useState([]);
  let [type4, setType4] = useState([
    { value: 10, name: "100万以下" },
    { value: 0, name: "100万-500万" },
    { value: 0, name: "500万-1000万" },
    { value: 0, name: "1000万以上" },
  ]);
  let [type5, setType5] = useState<any[]>([]);
  let [type6, setType6] = useState<any[]>([]);
  let [actItem, setActItem] = useState(null);
  let dataInfo = useMemo(() => {
    return data[actSegmented];
  }, [actSegmented]);
  const getInit = useCallback(async () => {
    const { indexmiddle: res2, indexright: res3, indexleft: res1 } = dataInfo;
    // let res1: any = await indexleft();
    // let res2: any = await indexmiddle();
    // let res3: any = await indexright();
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
    setType1((pre: any) => {
      return merge(pre, [
        { value: zbs1 },
        { value: zje2 },
        { value: jzbs1 },
        { value: jzje2 },
      ]);
    });
    setType2(
      hrfl3.map((item: { je6: any; hyname1: any }) => ({
        value: Number(item.je6).toFixed(2),
        name: item.hyname1,
      }))
    );
    setType3((pre: any) => {
      return merge(
        pre,
        [
          { value: jrfb100 },
          { value: jrfb500 },
          { value: jrfb1000 },
          { value: jrfb1001 },
        ].map((item) => ({ value: Number(item.value).toFixed(2) }))
      );
    });
    setTypeM(
      res2.hrfl3.reduce((pre: any, item: any) => {
        pre[item.djjg1 || "广元市"] = {
          num: item.bs1,
          amount: item.je6,
        };
        return pre;
      }, {})
    );
    setType4(
      res2.hrfl3
        .filter((item: { djjg1: any }) => item.djjg1)
        .map((item: any) => {
          return {
            value: item.bs1,
            name: item.djjg1,
          };
        })
        .sort((a: { value: number }, b: { value: number }) => b.value - a.value)
    );
    setType5(
      res3.data.map((item: any) => {
        return {
          value: Number(item.jkje1).toFixed(2),
          name: item.month
        };
      })
    );
    setType6(
      res3.data
        .map((item: any) => {
          return {
            value: Number(item.zbye3).toFixed(2),
            name: item.month,
          };
        })
    );
  }, [dataInfo]);
  useEffect(() => {
    getInit();
  }, [getInit]);
  return (
    <div
      className="flex relative h-full overflow-hidden main"
      style={{
        background: "url(img/main-bg.png) no-repeat center center",
        backgroundSize: "100% 100%",
      }}
    >
      <img
        src="img/header.png"
        alt=""
        className="absolute top-0"
        ref={headerRef}
      />
      <div className="flex w-full flex-col">
        <div className="w-full z-10 h-[82px]">
          <div className="flex justify-between mt-[40px] h-[42px] px-[20px]">
            <div className="flex text-[#8C99B3] h-full leading-[42px]">
              {SegmentedOp.map((item, index) => {
                return (
                  <div
                    key={index}
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
            <div className="flex justify-between flex-col h-[1080px]">
              <Title title={"运营数据"} className="mb-[16px]" />
              <div className="grid grid-cols-2 item-bg">
                {type1.map((item) => {
                  return (
                    <ChartType1
                      key={item.name}
                      className={"w-[206px] mb-[14px]"}
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
                img="img/hyfb.png"
              />
              <div className="flex justify-between item-bg">
                <Pie
                  option={{
                    series: [
                      {
                        data: type2,
                        padAngle: 4,
                        itemStyle: {
                          borderRadius: 10,
                        },
                        emphasis: {
                          scale: true, // 开启缩放
                          scaleSize: 12, // 放大倍数
                        },
                        label: {
                          show: false,
                        },
                      },
                    ],
                    graphic: {
                      type: "image",
                      id: "bg-image",
                      style: {
                        image: "img/pie-bg.png",
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
                  onItemChange={(name) => {
                    console.log(name,type2)
                    setActItem(name);
                  }}
                />
                <div className="flex flex-col justify-around py-5 flex-1">
                  {type2
                    .filter((item) => item.name == actItem)
                    .map((item: any, index) => {
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
                            {formatAmount(item.value)}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </div>
              <Title
                title={"金额分布"}
                className=" mt-[22px] mb-[16px]"
                img="img/jrfb.png"
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
                          // formatter: "{name|{b}}\n{value|{c}}",
                          formatter: function (params:any) {
                            let data = formatNumber(params.value)
                            return `{name|${params.name}}\n{value|${data.num} ${data.unit}}`;
                          },
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
                        emphasis: {
                          scale: true, // 开启缩放
                          scaleSize: 15, // 放大倍数
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
                    graphic: {
                      type: "image",
                      id: "bg-image",
                      style: {
                        image: "img/pie-bg2.png",
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
          </div>
          <MapComponent data={typeM} />
          <div className="ml-5 pr-5 mt-[26px] w-[446px] overflow-auto absolute right-0 h-full pb-[32px]">
            <div className="flex justify-between flex-col h-[1080px]">
              <Title
                title={"区域排名"}
                className=" mb-[16px]"
                img="img/qypm.png"
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
                title={"业务发展"}
                className="mt-[32px] mb-[22px]"
                img="img/ywfz.png"
              />
              <div className="flex flex-col item-bg">
                <Subtitle title={"发生额"} className="mb-4" extra={<></>} />
                <Bar
                  option={{
                    series: [
                      {
                        data: type5,
                        label: {
                          show: true, // 显示柱子顶部的数值
                          position: "top", // 位置：柱子顶部
                          formatter: function (params:any) {
                            return chartFormat(params.value); // 顶部数据显示格式化
                          },
                        } as any,
                      },
                    ],
                  }}
                  initOpts={{ width: 402, height: 218 }}
                />
                <Subtitle title={"余额"} className="mt-[32px] mb-4"  extra={<></>}/>
                <Line
                  option={{
                    series: [
                      {
                        data: type6,
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
        src="img/footer.png"
        alt=""
        className="absolute bottom-0 "
        ref={headerRef}
      />
    </div>
  );
}

export default App;
