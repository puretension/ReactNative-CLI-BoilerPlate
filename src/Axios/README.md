# 엑시오스 (AXIOS)

### **[ ROLE ]**

서버에 요청을 보내고 응답을 반환하는 함수들의 집합

### **[ 네이밍 규칙 ]**

- _{ 카테고리 } . { HTTP Method } . axios.ts_

### **[ 작동 원리/규칙 ]**

- 모든 요청에서 공통적으로 사용되는 특성들을 적용한 _customAxios_ 를 _./axios.core.ts_ 에서 정의하고 export 합니다.
  - 요청 baseURL, timeout 적용
  - interceptor 를 통해 jwt 를 모든 요청의 header 에 추가
- 각 파일에서 _customAxios_ 를 import 하여 각 요청을 처리하는 함수를 만듭니다. 함수의 이름 앞에는 _axios_ 를 붙여, 실제로 axios 요청을 처리하는 함수임을 명시합니다.
- **_.catch_ 블록에서 _handleAxiosError_ 를 사용해, 에러가 났을 때 보여줄 토스트 메세지를 지정합니다.** 이렇게 설정하면 서버에서 상황에 맞는 _customMessage_ 를 지정해 놓은 경우, 해당 메세지를 동적으로 곧바로 보여줄 수 있습니다.

### **[ 기타 ]**
