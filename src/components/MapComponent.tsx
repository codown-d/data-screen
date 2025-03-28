import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { useInterval, useSize } from "ahooks";
import { pathList } from "../constant";
import { calculatePathCenter, formatNumber } from "../utils";

const MapComponent = (props: any) => {
  const svgRef = useRef(null);
  const ref = useRef(null);
  const size = useSize(ref);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!svgRef.current) return;
    const svg: any = d3.select(svgRef.current);
    svg.call(
      d3
        .zoom()
        .scaleExtent([0.1, 4])
        .on("zoom", (event) => {
          let { transform } = event;
          d3.select(".scatter_g").attr("transform", transform);
        })
    );
  }, []);
  const data = useMemo(() => {
    return pathList.map((item) => {
      return {
        ...item,
        ...props.data[item.id],
      };
    });
  }, [props.data]);
  useInterval(() => {
    setCount((index) => {
      if (index < 6) {
        return index + 1;
      } else {
        return 0;
      }
    });
  }, 10000);
  const Amount = (props:any) => {
    const {amount} = props
    const data = formatNumber(amount);
    return (
      <span className="text-[#E0EAFF] text-[20px]">
        {data.num}&nbsp;
        <span className="text-[12px]">{data.unit}</span>
      </span>
    );
  };
  return (
    <div ref={ref} className="flex w-full h-full">
      <svg
        width={size?.width}
        height={size?.height}
        viewBox="-107 585 1976 1210"
        ref={svgRef}
      >
        <defs>
          <pattern
            id="image-pattern"
            patternUnits="userSpaceOnUse"
            width="700"
            height="600"
          >
            <image href="img/map.png" x="0" y="0" />
          </pattern>
        </defs>
        <g className="scatter_g">
          {data.slice(0, 1).map((item, index) => {
            return (
              <g key={item.id + index}>
                {new Array(10).fill("").map((ite, idx) => {
                  return (
                    <path
                      transform={`translate(0, ${idx * 1})`}
                      key={item.id + idx}
                      stroke={"#c0dfff"}
                      strokeWidth={2}
                      fillOpacity={0}
                      {...item}
                    />
                  );
                })}
                <path
                  stroke={"#fff"}
                  strokeWidth={1}
                  fillOpacity={0}
                  {...item}
                  filter="url(#drop-shadow)"
                />
              </g>
            );
          })}
          {data.slice(1).map((item, index) => {
            const { centerX, centerY } = calculatePathCenter(item.d);
            return (
              <g key={item.id}>
                <path
                  stroke={"#c0dfff"}
                  strokeWidth={1}
                  fill={"url(#image-pattern)"}
                  {...item}
                  onMouseEnter={(e: any) => {
                    d3.select(e.target).attr("fill", "#c0dfff"); // 高亮颜色
                  }}
                  onMouseLeave={(e: any) => {
                    d3.select(e.target).attr("fill", "url(#image-pattern)"); // 高亮颜色
                  }}
                />

                {count !== index ? (
                  <foreignObject
                    x={centerX - 50}
                    y={centerY - 10}
                    width="80"
                    height="50"
                  >
                    <div className=" foreign-div relative text-center text-white font-bold text-xl py-1.5 px-0 bg-[#3C5BF6] border-l-4 border-r-4 border-white shadow-[0px_4px_4px_0px_rgba(10,39,183,0.4),inset_0px_0px_5px_0px_#7D92FF]">
                      <p> {item.label}</p>
                    </div>
                  </foreignObject>
                ) : null}
              </g>
            );
          })}
          {data.slice(1).map((item, index) => {
            const { centerX, centerY } = calculatePathCenter(item.d);
            return (
              <g key={item.id}>
                {count !== index||item.amount==0 ? null : (
                  <foreignObject
                    x={centerX - 100}
                    y={centerY - 130}
                    width="204"
                    height="173"
                  >
                    <div className="relative ">
                      <img src="img/map-select.png" alt="" />
                      <div className="absolute top-0 w-full">
                        <div className="h-[24px] tex-[14px] text-center text-[#fff]">
                          {item.label}
                        </div>
                        <div className="flex justify-around mt-2">
                          <div className="flex flex-col items-center">
                            <span className="text-[#8C99B3] text-[12px]">
                              金额
                            </span>
                            <span className="text-[#E0EAFF] text-[20px]">
                             <Amount amount={item.amount} />
                            </span>
                          </div>
                          <div className="flex flex-col  items-center">
                            <span className="text-[#8C99B3] text-[12px]">
                              笔数
                            </span>
                            <span className="text-[#E0EAFF] text-[20px]">
                              {item.num}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default MapComponent;
