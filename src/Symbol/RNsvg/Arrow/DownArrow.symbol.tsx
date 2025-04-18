import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

/**
 * 아래를 향하는 화살표 심볼
 * @author 도형
 */
export function DownArrowSymbol({
  size = 13,
  color = '#CCCCCC',
  style,
}: {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Svg
      style={style}
      width={size.toString()}
      height={size.toString()}
      viewBox="0 0 13 13"
      fill={color}>
      <Path d="M6 6.83333V8V1" stroke={color} stroke-width="2.4" />
      <Path
        d="M5.31579 1L5.31579 7.06365L3.04348 7.06365C3.0264 7.06365 3.01718 7.08369 3.0283 7.09667L6.47368 11.1163L9.91907 7.09667C9.93019 7.08369 9.92097 7.06365 9.90388 7.06365L7.63158 7.06365L7.63158 1"
        stroke={color}
        stroke-width="1.15789"
      />
      <Path d="M6.5 11L9.53109 7.25H3.46891L6.5 11Z" fill={color} />
    </Svg>
  );
}
