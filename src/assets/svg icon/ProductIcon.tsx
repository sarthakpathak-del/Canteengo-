import React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
};

const ProductIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  fill = "#000000",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 384 443"
      fill="none"
    >
      <Path
        d="M192,0 L384,110.851252 L384,332.553755 L192,443.405007 L0,332.553755 L0,110.851252 L192,0 Z 
           M127.999,206.918 L128,357.189 L170.666667,381.824 L170.666667,231.552 L127.999,206.918 Z 
           M42.6666667,157.653333 L42.6666667,307.920144 L85.333,332.555 L85.333,182.286 L42.6666667,
           157.653333 Z 
           M275.991,97.759 L150.413,170.595 L192,194.605531 L317.866667,121.936377 L275.991,97.759 Z 
           M192,49.267223 L66.1333333,121.936377 L107.795,145.989 L233.374,73.154 L192,49.267223 Z"
        fill={fill}
      />
    </Svg>
  );
};

export default ProductIcon;
