import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

type IconProps = {
  width?: number | string;
  height?: number | string;
  stroke?: string;
  strokeWidth?: number;
};

const DocumentIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  stroke = "#222222",
  strokeWidth = 2.2, 
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Rect
        x="5"
        y="4"
        width="14"
        height="17"
        rx="2"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />

      <Path
        d="M9 9H15"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <Path
        d="M9 13H15"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      <Path
        d="M9 17H13"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default DocumentIcon;
