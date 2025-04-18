import styled from 'styled-components/native';
import { moderateScale } from 'src/Util';

/**
 * 작은 글씨 스타일입니다. (9px)
 * @author 도형
 */
export const SmallText = styled.Text`
  font-size: ${moderateScale(9)}px;
  font-family: 'Pretendard-Regular';
  color: #000000;
`;
