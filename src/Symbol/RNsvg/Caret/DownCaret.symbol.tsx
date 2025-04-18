import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

/**
 * @deprecated CaretSymbol로 대체되었습니다.
 *
 * 아래방향 꺾인 화살표입니다.
 * @author 도형
 */
export function DownCaretSymbol({
  size = 16,
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
      viewBox="0 0 16 16"
      fill="none">
      <Path d="M4 6L8 10L12 6" stroke={color} stroke-linecap="round" />
    </Svg>
  );
}
