import CountUp from "react-countup";

function Title(props: { className?: string; Title: number;bg:string }) {
  let { className, Title,bg } = props;
  return (
    <div className={`flex justify-center flex-col ${className}`}>
      {Title}
    </div>
  );
}

export default Title;
