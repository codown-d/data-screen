// src/Map.js
import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useSize } from "ahooks";
import { pathList } from "../constant";
import { calculatePathCenter } from "../utils";

const MapComponent = () => {
  const svgRef = useRef(null);
  const ref = useRef(null);
  const size = useSize(ref);
  useEffect(() => {
    if (!svgRef.current) return;
    let svg:any = d3.select(svgRef.current);
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
          {pathList.slice(0, 1).map((item, index) => {
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
          {pathList.slice(1).map((item) => {
            const { centerX, centerY } = calculatePathCenter(item.d);
            return (
              <g key={item.id}>
                <path
                  stroke={"#c0dfff"}
                  strokeWidth={1}
                  fill={"url(#image-pattern)"}
                  {...item}
                  onMouseEnter={(e:any) => {
                    d3.select(e.target).attr("fill", "#c0dfff"); // 高亮颜色
                  }}
                  onMouseLeave={(e:any) => {
                    d3.select(e.target).attr("fill", "url(#image-pattern)"); // 高亮颜色
                  }}
                />
                <foreignObject
                  x={centerX - 50}
                  y={centerY - 10}
                  width="80"
                  height="50"
                >
                  <div
                    className="foreign-div"
                    style={{
                      position: "relative",
                      fill: "#fff",
                      textAlign: "center",
                      fontSize: 18,
                      padding: "2px 0px",
                      fontWeight: "bold",
                      background: "#3C5BF6",
                      color: "#fff",
                      borderLeft: "4px solid #fff",
                      borderRight: "4px solid #fff",
                      boxShadow:
                        "0px 4px 4px 0px rgba(10,39,183,0.4), inset 0px 0px 5px 0px #7D92FF",
                    }}
                  >
                    <p> {item.label}</p>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default MapComponent;
