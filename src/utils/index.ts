export let calculatePathCenter = (pathData: string) => {
  const path = pathData.split("L"); // 拆分路径数据
  let xSum = 0;
  let ySum = 0;
  let pointCount = 0;

  // 遍历路径点并累加坐标
  path.forEach((point) => {
    const [x, y] = point.trim().split(" ").map(Number); // 提取每个点的x和y坐标
    if (!isNaN(x) && !isNaN(y)) {
      xSum += x;
      ySum += y;
      pointCount++;
    }
  });

  // 计算中心点
  const centerX = xSum / pointCount;
  const centerY = ySum / pointCount;
  return { centerX, centerY };
};
export function formatNumber(data: number): { num: string; unit: string } {
  const num = Number(data)
  if (num < 10000) {
    return { num: num+'', unit: "" };
  } else if (num < 100000000) {
    return { num: (num / 10000).toFixed(2), unit: "万" };
  } else {
    return { num: (num / 100000000).toFixed(2), unit: "亿" };
  }
}
export function formatAmount(data: number) {  
  const num = Number(data)
  if (num < 10000) {
    return num;
  } else if (num < 100000000) {
    return (num / 10000).toFixed(2)+  "万" 
  } else {
    return (num / 100000000).toFixed(2)+ "亿"
  }
}
export function chartFormat(data:number) {
  const value = Number(data)
  if (value >= 100000000) {
    return (value / 100000000).toFixed(2) + " 亿";
  } else if (value >= 10000) {
    return (value / 10000).toFixed(2) + " 万";
  }
  return value;
}