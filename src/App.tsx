import "./App.css";
import ChartType1 from "./components/ChartType1";
import Pie from "./components/Pie";

function App() {
  return (
    <>
      <ChartType1
        className={"w-[206px]"}
        num={1000}
        type={"笔数"}
        img={"/img/zs1.png"}
      />
      <Pie option={{}} initOpts={{ width: 600, height: 400 }}></Pie>
    </>
  );
}

export default App;
