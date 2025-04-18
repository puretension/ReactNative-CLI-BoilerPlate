// import { messaging } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import customAxios, { AUTH } from '../axios.core';

export type LoginResponse = {
  jwt: string;
  user: {
    id: string;
    email: string;
    name: string;
    profileImageUrl: string;
  };
};

const APP_VERSION = '1.0.0'; // Constant/app.constant.ts 에서 가져옵니다.

/**
 * 이메일과 비밀번호를 이용해 로그인합니다.
 * @return JWT, 유저 정보
 * @author 도형
 */
export const axiosLoginWithEmailPassword = async (auth: {
  email: string;
  password: string;
}) => {
  // 로그인 시 사용자 OS, 앱 버전, fcmToken 값을 추가로 전달합니다.
  const OS = Platform.OS;
  const appVersion = APP_VERSION;
  // const fcmToken = await messaging().getToken();
  const fcmToken = null;
  return await customAxios
    .request<LoginResponse>({
      method: 'POST',
      url: `v1/${AUTH}/login`,
      data: { ...auth, OS, appVersion, fcmToken },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      // handleAxiosError({ error, errorMessage: '로그인에 실패하였습니다' });
      return null;
    });
};
