function Subtitle(props: {
  className?: string;
  title: string;
  extra?: React.ReactNode;
}) {
  let { className, title, extra } = props;
  return (
    <div
      className={`flex justify-between items-center  relative h-[32px]  ${className}`}
      style={{
        borderLeft: "4px solid #3977F3",
        background: 'linear-gradient( 90deg, rgba(57,119,243,0.16) 0%, rgba(60,91,246,0) 100%, rgba(123,241,194,0) 100%)'
      }}
    >
      <span className="text-[#73A2FF] text-[14px] ml-[10px]">{title}</span>
      <span className="text-[12px] text-[#8C99B3] mr-[24px]">
        {extra || "单位：万元"}
      </span>
    </div>
  );
}

export default Subtitle;
