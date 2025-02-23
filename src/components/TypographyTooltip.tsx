import { Tooltip, Typography } from "antd";
import { useOverflowTooltip } from "../hooks";
const { Text } = Typography;
interface TruncatedTextWithTooltipProps {
    text: React.ReactNode;
  className?: string;
}
const TruncatedTextWithTooltip = (props: TruncatedTextWithTooltipProps) => {
  let { text, className } = props;
  const { contentRef, isOverflow } = useOverflowTooltip(text);
  return (
    <Tooltip title={isOverflow ? text : undefined}>
      <Text
        ellipsis
        ref={contentRef}
        className={`inline-block w-full  ${className}`}
      >
        {text}
      </Text>
    </Tooltip>
  );
};
export default TruncatedTextWithTooltip;
