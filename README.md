# react-native-cli-boilerplate

> React Native CLI Based BoilerPlate

## ReactNative-Cli-Boilerplate

- `react-native` CLI 기반으로 세팅된 프로젝트입니다.
- 앱 전반에 걸친 전역 상태 관리 및 도메인 별 구조 분리를 지향합니다.

---

## 🏗 폴더 구조

```
📦src
 ├── @types                # 타입 확장 선언 (ex. PNG, SVG, styled-components)
 ├── App                   # 루트 앱 컴포넌트 및 전역 모달
 ├── Assets                # 폰트 및 정적 리소스
 ├── Axios                 # Axios 관련 설정 및 API 분리
 ├── Component             # UI 컴포넌트들 (Button, Modal 등)
 ├── Config                # 앱 설정, 토스트 등 설정 파일
 ├── Constant              # 앱 전역 상수들
 ├── Navigator             # Stack, BottomTab 등 네비게이션 정의
 ├── Object                # Enum, Type 정의
 ├── Provider              # 전역 Provider (ex. ThemeProvider)
 ├── Resource              # 정적 이미지 리소스 (png, svg)
 ├── Schema                # 비즈니스 도메인 데이터 스키마
 ├── Screen                # 각 페이지 컴포넌트
 ├── Segment               # (예정) Segment analytics 정의
 ├── Style                 # 글로벌 스타일
 ├── StyledComponents     # 공통 텍스트/뷰 스타일 컴포넌트
 ├── Symbol                # 아이콘, 심볼 관련 컴포넌트
 ├── Theme                 # 테마 컬러 및 사이즈 등 정의
 ├── Unit                  # 섹션 단위의 UI 구성 단위 (ButtonContainer 등)
 ├── Util                  # 유틸 함수
 ├── Zustand               # zustand 상태 관리 모듈
 └── App.tsx               # 앱 진입점
```

---

## 🚀 실행 방법

### 1. 의존성 설치

```bash
rm -rf node_modules yarn.lock package-lock.json

# yarn 또는 npm 중 선택
yarn install # npm install
```

### 2. iOS 설정

```bash
cd ios && pod install && cd ..
```

### 3. 실행

```bash
npm run ios # npm run android
```

---

## 🧯 에러 발생 시 대처법

- 특정 패키지 오류라면 patch-package를 적극 활용합시다.

```bash
rm -rf node_modules yarn.lock package-lock.json
rm -rf ios/Pods ios/Podfile.lock ios/build
npm install # yarn install
cd ios && pod install
npm start # yarn start
npm run ios # 
```

#### 더 디테일하게 초기화하고 싶다면?(yarn 으로 가정)

```bash
rm -rf node_modules
rm -rf ios/Pods
rm -rf ios/Podfile.lock
rm -rf ios/build
yarn install
cd ios && pod install
yarn start
```

---

## 📦 개발 시 유의 사항

- UI와 상태는 명확히 분리합니다.
  - ex) showModal('REQUIRE_LOGIN')정도로 모달을 호출해야 하나, 이 이상의 비즈니스로직이 UI상에 나타나지 않도록 합니다.
- 전역 상태관리는 `zustand`, 지역 상태관리는 `useContext`를 활용하여 목적에 따라 상태를 분리합니다.
  - useContext는 스크린이 사라지면 초기화되지만, zustand는 앱이 종료되기 전까지 메모리에 유지된다는 점을 인지합니다.
- Component는 최대한 재사용 가능하게 설계합니다.
- Screen에서는 `zustand` 상태와 `Component`를 연결하여 화면을 구성합니다.
- `SVG`, `PNG` 리소스는 `Resource` 아래 디렉토리에 정리합니다.
- tyledSheet보다는 StyledComponent를 사용하며 UI 코드가독성을 높입니다.
- Typescript의 타입 시스템을 적극 활용합시다.
  - ex) Type은 도메인 단위(Enum, Type, Schema)로 정의하였습니다. 자동완성을 활용하고, 런타임오류를 사전에 방지합니다.

---

