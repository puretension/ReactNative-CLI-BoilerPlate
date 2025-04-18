import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

/**
 * @deprecated CaretSymbol로 대체되었습니다.
 *
 * 오른쪽방향 꺾인 화살표입니다.
 * @author 도형
 */
export function RightCaretSymbol({
  size = 20,
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
      viewBox="0 0 20 20"
      fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.05871 3.72456C6.81463 3.96864 6.81463 4.36437 7.05871 4.60845L12.4501 9.99984L7.05871 15.3912C6.81463 15.6353 6.81463 16.031 7.05871 16.2751C7.30279 16.5192 7.69852 16.5192 7.94259 16.2751L13.7759 10.4418C14.02 10.1977 14.02 9.80197 13.7759 9.5579L7.94259 3.72456C7.69852 3.48048 7.30279 3.48048 7.05871 3.72456Z"
        fill={color}
      />
    </Svg>
  );
}
