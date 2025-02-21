
function Line(props: { className?: string; Title: number;bg:string }) {
  let { className, Title,bg } = props;
  return (
    <div className={`flex justify-center flex-col ${className}`}>
      {Title}
    </div>
  );
}

export default Line;
