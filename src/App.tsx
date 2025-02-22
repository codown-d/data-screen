import { useSetState, useSize } from "ahooks";
import { useEffect, useRef, useState } from "react";
import ChartType1 from "./components/ChartType1";
import Pie from "./components/Pie";
import Title from "./components/Title";
import MapComponent from "./components/MapComponent";

function App() {
  const headerRef = useRef(null);
  const size = useSize(headerRef);
  
  const [colors, setColors] = useState<string[]>([]);
  let [data, setData] = useSetState({
    type1: [
      {
        num: 1000,
        type: "笔数",
        img: "/img/zs1.png",
      },
      {
        num: 1000,
        type: "金额",
        img: "/img/zs2.png",
      },
      {
        num: 1000,
        type: "近一个月笔数",
        img: "/img/zs3.png",
      },
      {
        num: 1000,
        type: "近一个月金额",
        img: "/img/zs1.png",
      },
    ],
    type2: [
      { value: 1048, name: "Search Engine" },
      { value: 735, name: "Direct" },
      { value: 580, name: "Email" },
      { value: 484, name: "Union Ads" },
      { value: 300, name: "Video Ads" },
    ],
  });
  useEffect(() => {
    console.log(size);
  }, [size]);
  return (
    <div
      className="flex relative h-full overflow-hidden"
      style={{ background: "rgb(15,28,58)" }}
    >
      <img
        src="/img/header.png"
        alt=""
        className="absolute top-0"
        ref={headerRef}
      />
      <div className="flex relative w-full">
        <div className="mx-6 pt-[4%] w-[420px] overflow-auto absolute ">
          <Title title={"运营数据"} className=" mb-[16px]" />
          <div className="grid grid-cols-2">
            {data.type1.map((item) => {
              return (
                <ChartType1
                  key={item.type}
                  className={"w-[206px]"}
                  num={item.num}
                  type={item.type}
                  img={item.img}
                />
              );
            })}
          </div>
          <Title title={"行业分析"} className=" mt-[22px] mb-[16px]" />
          <div className="flex justify-between">
            <Pie
              option={{
                // color: ['#ff0000', '#00ff00', '#0000ff'],
                series: [
                  {
                    data: data.type2,
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
                    <span className="text-[#fff] font-bold ">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Title title={"金额分布"} className=" mt-[22px] mb-[16px]" />
          <div className="flex justify-between">
            <Pie
              option={{
                series: [
                  {
                    data: data.type2,
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
                    <span className="text-[#fff] font-bold ">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <MapComponent />
        <div className="mx-6 pt-[4%] w-[420px] overflow-auto absolute right-0">
          <Title title={"运营数据"} className=" mb-[16px]" />
          <div className="grid grid-cols-2">
            {data.type1.map((item) => {
              return (
                <ChartType1
                  key={item.type}
                  className={"w-[206px]"}
                  num={item.num}
                  type={item.type}
                  img={item.img}
                />
              );
            })}
          </div>
          <Title title={"行业分析"} className=" mt-[22px] mb-[16px]" />
          <div className="flex justify-between">
            <Pie
              option={{
                // color: ['#ff0000', '#00ff00', '#0000ff'],
                series: [
                  {
                    data: data.type2,
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
                    <span className="text-[#fff] font-bold ">{item.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <Title title={"金额分布"} className=" mt-[22px] mb-[16px]" />
          <div className="flex justify-between">
            <Pie
              option={{
                series: [
                  {
                    data: data.type2,
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
                    <span className="text-[#fff] font-bold ">{item.value}</span>
                  </div>
                );
              })}
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
