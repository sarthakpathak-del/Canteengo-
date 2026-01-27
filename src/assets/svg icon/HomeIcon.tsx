import React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
};

const HomeIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  fill = "#000000",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z"
        fill={fill}
      />
    </Svg>
  );
};

export default HomeIcon;
