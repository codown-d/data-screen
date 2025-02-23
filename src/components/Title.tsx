function Title(props: { className?: string; title: string;img?:string }) {
  let { className, title ,img} = props;
  return (
    <div className={`flex justify-center flex-col relative h-[42px] ${className}`}>
      <img src={img||"/img/title.png"} alt="" className="absolute h-full w-full" />
      {false && <span>{title}</span>}
    </div>
  );
}

export default Title;
