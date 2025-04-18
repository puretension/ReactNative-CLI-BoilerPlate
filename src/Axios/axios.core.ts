import axios from 'axios';
import { API_ENDPOINT } from 'src/Constant/app.constant';
// import { useUserStore } from 'src/Zustand/User';

/**
 * axios 요청에 공통적으로 사용되는 설정들을 지정해둔 axios 요청 인스턴스입니다.
 * @author 도형
 */
const customAxios = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 5000,
});

/**
 * @author 도형
 */
customAxios.interceptors.request.use(config => {
  // 이미 Authorization 헤더가 있으면 그것을 사용(다중 계정 덮어쓰기용 입니다)
  if (config.headers?.Authorization) {
    return config;
  }

  // zustand 에 저장된 token 사용
  // const jwt = useUserStore.getState().jwt;
  const jwt = null;
  if (Boolean(jwt)) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${jwt}`,
      },
    };
  }
  return config;
});

export default customAxios;

//* 요청 경로 prefix
export const AUTH = 'auth';
