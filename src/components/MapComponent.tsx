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
  return (
    <div ref={ref} className="flex w-full h-full">
      <svg
        width={size?.width}
        height={size?.height}
        viewBox="-107 585 1976 1210"
        ref={svgRef}
      >
        <defs>
          <filter id="drop-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="4"
              dy="4"
              stdDeviation="3"
              flood-color="rgba(0, 0, 0, 0.1)"
            />
          </filter>
        </defs>
        <g>
          {pathList.slice(0, 1).map((item) => {
            return (
              <>
                {new Array(10).fill("").map((ite, index) => {
                  return (
                    <path
                      transform={`translate(0, ${index * 1})`}
                      key={item.id}
                      stroke={"#00fff3"}
                      strokeWidth={2}
                      fillOpacity={0}
                      {...item}
                    />
                  );
                })}
                <path
                  key={item.id}
                  stroke={"#fff"}
                  strokeWidth={1}
                  fillOpacity={0}
                  {...item}
                  filter="url(#drop-shadow)"
                />
              </>
            );
          })}
          {pathList.slice(1).map((item) => {
            const { centerX, centerY } = calculatePathCenter(item.d);
            return (
              <g key={item.id}>
                <path
                  stroke={"#333"}
                  strokeWidth={1}
                  strokeDasharray={"1,6"}
                  fill={"#eee"}
                  {...item}
                  onMouseEnter={(e) => {
                    d3.select(e.target).attr("fill", "orange"); // 高亮颜色
                  }}
                  onMouseLeave={(e) => {
                    d3.select(e.target).attr("fill", "#eee"); // 高亮颜色
                  }}
                />
                <text
                  x={centerX - 20}
                  y={centerY + 20}
                  style={{
                    fill: "#fff",
                    fontSize: 18,
                  }}
                >
                  {item.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
};

export default MapComponent;
