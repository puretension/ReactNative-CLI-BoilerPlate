import { CommonThemeColorsType, ThemeColorsType } from 'src/Object/Type';

/**
 * 모든 테마에 공통으로 적용되는 색상값들
 * @author 도형
 */
const commonThemeColors: CommonThemeColorsType = {
  // 하연이 figma 디자인 시스템 그대로 사용
  blue: {
    main: '#8BBFF5',
    mild: '#EDF5FD',
    pastel: '#DEEEFF',
    text: '#599BDF',
  },

  purple: {
    deep: '#594E96',
    inactive: '#D6D4E2',
    main: '#BDB5EC',
    main2: '#B7AEED',
    mild: '#F5F5FC',
    light: '#DBD6FF',
    pastel: '#E7E4F5',
    text: '#8F84D0',
  },

  gradient: {
    purpleBlue: ['#F2CCFF', '#82BDF3'],
  },

  grey: {
    black: '#000000',
    deep: '#333333',
    main: '#555555',
    icon: '#666666',
    mild: '#999999',
    white: '#FFFFFF',
    focused: '#848899',
    unfocused: '#D3D4D4',
    unselected: '#BBBBBB',
    inactive: '#EEEEEE',
  },

  red: {
    warning: '#FF6B6B',
  },

  surbay: {
    main: '#3ad1bf',
    mild: '#c3f1ec',
  },
};

/**
 * Light 테마 선택시 사용되는 색상값들
 * !색상을 추가하려면 ThemeColors에 정의를 추가해줘야 합니다.
 * @author 도형
 */
export const lightThemeColors: ThemeColorsType = {
  ...commonThemeColors,
  background: 'white',
};

/**
 * Dark 테마 선택시 사용되는 색상값들
 * !색상을 추가하려면 ThemeColors에 정의를 추가해줘야 합니다.
 * @author 도형
 */
export const darkThemeColors: ThemeColorsType = {
  ...commonThemeColors,
  background: 'black',
};

/**
 * 사용자가 선택한 테마에 따른 테마 색상을 반환합니다.
 * @author 도형
 */
export const themeColors = (
  theme: 'LIGHT' | 'DARK' = 'LIGHT',
): ThemeColorsType => {
  if (theme === 'LIGHT') {
    return lightThemeColors;
  }
  return darkThemeColors;
};

//TODO: Platform과 Appearance에 따라 theme을 다르게 배포해주어야 합니다.
// function getTheme(){
//   if(Platform.OS === "android"){
//     if(Appearance.getColorScheme() === "light"){
//       return lightThemeColors
//     } else {
//       return darkThemeColors
//     }
//   }

//   if(Platform.OS === "ios"){
//     if(Appearance.getColorScheme() === "light"){
//       return lightThemeColors
//     } else {
//       return darkThemeColors
//     }
//   }

//   if(Appearance.getColorScheme() === "light"){
//     return lightThemeColors
//   } else {
//     return darkThemeColors
//   }
// }
