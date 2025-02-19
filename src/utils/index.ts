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
