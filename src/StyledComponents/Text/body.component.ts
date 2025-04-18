import styled from 'styled-components/native';
import { moderateScale } from 'src/Util/size.util';
/**
 * 본문 폰트 스타일입니다. (11px)
 * @author 도형
 */
export const BodyText = styled.Text`
  font-size: ${moderateScale(11)}px;
  font-family: 'Pretendard-Regular';
  color: #000000;
`;
