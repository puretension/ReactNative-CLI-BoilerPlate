# 화면/스크린 (SCREEN)

### **[ ROLE ]**

- 앱의 실제 화면을 구성하는 파일을 정의합니다.
- 기본적인 화면 구조는 아래와 같습니다:
  ```TypeScript
  <>
    <스크린 헤더 /> (optional)
    <섹션 />
    <섹션 />
    <섹션 />
    ...
    <하단 버튼 /> (optional)
    <모달 /> (optional)
  </>
  ```
- 하나의 화면이 여러개의 단계로 나뉘는 경우 _.page.tsx_ 파일을 사용합니다.

<br>

### **[ 네이밍 규칙 ]**

- _{ 카테고리 } . { 화면 } . screen.tsx_
  - 전체 스크린 파일 <br>
- _{ 카테고리 } . { 화면 } . screenHeader.tsx_
  - 스크린 헤더 컴포넌트 파일 <br>
- _{ 카테고리 } . { 화면 } . bottomButton.tsx_
  - 하단 버튼 컴포넌트 파일 <br>
- _**/ Section** / { 카테고리 } . { 화면 } . { 섹션 } section.tsx_
  - 화면별 섹션 파일 <br>
- _**/ { 페이지명 }** / { 카테고리 } . { 화면 } . { 페이지 } . page.tsx_
  - 화면의 단계별 페이지 파일 <br>
- _**/ { 페이지명 } / Section** / { 카테고리 } . { 화면 } . { 페이지 } . {섹션} . section.tsx_
  - 단계별 페이지의 섹션 파일 <br><br>

### **[ 작동 원리/규칙 ]**

- 하나의 화면을 여러 개의 섹션으로 나누고, 각 섹션들을 _Section_ 디렉토리의 '_~.section.tsx_' 파일에서 구현합니다. **이 때, _.section.tsx_ 파일의 최외곽을 SectionContainer 로 감쌉니다.**

- 구현된 섹션들을 하나의 _.screen.tsx_ 에서 모두 import 합니다. (경우에 따라 스크린 헤더, 하단 버튼, 모달까지 import 합니다.) _Screen_ 컴포넌트를 이용하여 모든 컴포넌트를 구성하고 export 합니다.

  ```TypeScript
  /** 단계(페이지) 구분이 없는 화면의 경우 */

  //* 섹션 정의
  // ./SomeScreen/Section/SomeScreen.A.section.tsx
  import React from 'react';
  import { SectionContainer } from 'src/Unit/View';

  export function SomeScreen_A_Section() {
    return (
      <SectionContainer>
        <Part_a />
        <Part_b />
        <Part_c />
      </SectionContainer>
    );
  }

  function Part_a() {
    return <></>;
  }
  function Part_b() {
    return <></>;
  }
  function Part_c() {
    return <></>;
  }

  //* 각 섹션들을 모아, 하나의 화면을 정의
  // ./SomeScreen/SomeScreeen.screen.tsx
  import React from 'react';
  import { Screen } from 'src/Component/Screen';
  import { SomeScreenHeader } from './SomeScreen.screenHeader.tsx';
  import { SomeScreen_A_Section } from './Section/SomeScreen.A.section.tsx';
  import { SomeScreen_B_Section } from './Section/SomeScreen.B.section.tsx';
  import { SomeScreen_C_Section } from './Section/SomeScreen.C.section.tsx';
  import { SomeScreenBottomButton } from './SomeScreen.bottomButton.tsx';

  export function SomeScreen() {
    return (
      <Screen
        ScreenHeader={<SomeScreenHeader />}
        ScreenContent={
          <>
            <SomeScreen_A_Section />
            <SomeScreen_B_Section />
            <SomeScreen_C_Section />
          </>
        }
        BottomButton={<SomeScreenBottomButton />}
        Modal={undefined}
      />
    );
  }
  ```

  <br>

- 이 때 **회원가입, 프로젝트 업로드 화면처럼 하나의 화면이 여러개의 단계로 구성되는 경우** 섹션이 곧바로 화면을 구성하는 것이 아니라 먼저 각 단계에 맞는 _'페이지'_ 를 구성합니다.
- 이 후 각 단계별 페이지들이 모여 화면을 구성합니다. 다시말해, _Section > Screen_ 으로 구성되지 않고 _Section > Page > Screen_ 으로 구성됩니다.

```TypeScript
/** 단계(페이지) 구분이 존재하는 화면의 경우 */

//* 섹션들이 모여 각 페이지를 먼저 정의합니다.
// ./SomeScreen/FirstPage/SomeScreen.first.page.tsx
import React from 'react';
import { SomeScreenFirstPage_A_Section } from './Section/SomeScreen.FirstPage.A.section.tsx';
import { SomeScreenFirstPage_B_Section } from './Section/SomeScreen.FirstPage.B.section.tsx';
import { SomeScreenFirstPage_C_Section } from './Section/SomeScreen.FirstPage.C.section.tsx';

export function SomeScreen_FirstPage() {
  return (
    <>
      <SomeScreenFirstPage_A_Section />
      <SomeScreenFirstPage_B_Section />
      <SomeScreenFirstPage_C_Section />
    </>
  );
}

//* 각 페이지를 모아, 하나의 화면을 정의
// ./SomeScreen/SomeScreen.screen.tsx
import React from 'react';
import { Screen } from 'src/Component/Screen';
import { SomeScreenHeader } from './SomeScreen.screenHeader.tsx';
import { SomeScreen_FirstPage } from './FirstPage/SomeScreen.first.page.tsx';
import { SomeScreen_SecondPage } from './SecondPage/SomeScreen.second.page.tsx';
import { SomeScreen_ThirdPage } from './ThirdPage/SomeScreen.third.page.tsx';
import { SomeScreenBottomButton } from './SomeScreen.bottomButton.tsx';
import shallow from 'zustand';
import { useSomeScreenStore } from 'src/Zustand';

export function SomeScreen() {
  const { pageIndex, strProperty }
    = useSomeScreenStore(state => ({
      pageIndex: state.pageIndex,
      strProperty: state.strProperty,
    }), shallow)

  const PageContent = () => {
    switch(){
      case 'FIRST':
        return <SomeScreen_FirstPage />;
      case 'SECOND':
        return <SomeScreen_SecondPage />;
      case 'THIRD':
        return <SomeScreen_ThirdPage />;
    }
  }

  return (
    <Screen
      ScreenHeader={<SomeScreenHeader />}
      ScreenContent={<PageContent />}
      BottomButton={<SomeScreenBottomButton />}
      Modal={undefined}
    />
  );
}
```

### **[ 기타 ]**

#### **< 관련 파일 >**

- _Component / Screen / ~_
- _Component / ScreenHeader / ~_
- _Component / BottomButton / ~_

<br><br><br>

### **[ 디렉토리 구조 ]**

```
/Screen
 |-- /카테고리
 |    |-- /화면 (단계(페이지) 구분이 없는 경우)
 |    |    |-- /Section
 |    |    |    |-- 카테고리.화면.섹션.section.tsx
 |    |    |
 |    |    |-- ( 카테고리.화면.bottomButton.tsx )
 |    |    |-- 카테고리.화면.screen.tsx
 |    |    |-- ( 카테고리.화면.screenHeader.tsx )
 |    |
 |    |
 |    |-- /화면 (단계(페이지) 구분이 존재하는 경우)
 |    |    |-- /페이지
 |    |    |    |-- /섹션
 |    |    |    |    |-- 카테고리.화면.페이지.섹션.section.tsx
 |    |    |    |
 |    |    |    |-- 카테고리.화면.페이지.page.tsx
 |    |    |
 |    |    |-- /페이지
 |    |    |-- ...
 |    |    |
 |    |    |-- ( 카테고리.화면.bottomButton.tsx )
 |    |    |-- 카테고리.화면.screen.tsx
 |    |    |-- ( 카테고리.화면.screenHeader.tsx )
 |    |
 |    |-- /화면
 |    |-- ...
 |
 |-- /카테고리
 |-- /카테고리
 |-- ...
```

- 카테고리: 서비스에서 제공하는 기능들을 유사한 카테고리로 묶어 1차적으로 분류한 것.

  - App: 앱 서비스 자체와 연관된 기능 카테고리. 스플래시 스크린, 업데이트 강제 스크린 등.
  - Auth: 로그인, 회원가입 등 인증 및 회원가입에 관련된 카테고리
  - Community: 커뮤니티 카테고리. 사실상 투표 관련 카테고리입니다.
  - Guide
  - Home
  - Iamport: 아임포트 관련 카테고리. (실제 결제 및 본인인증)
  - Mypage: 유저 및 마이페이지 관련 카테고리. 비밀번호 변경,
  - Partner
  - Payment
  - Research: 프로젝트와 관련된 기능 카테고리
  - Store
  - Terms: 서비스 이용약관, 개인정보 처리방침 등 규약 및 법률상 내용 카테고리

- 기능: 각 카테고리 내에서, 하나의 Screen 이 제공하는 고유 기능.

  e.g.)

  - Research
    - ~/Detail: 프로젝트 상세 정보 표시
    - ~/Edit: 프로젝트 정보 수정
    - ~/Uplaod: 프로젝트 업로드
    - ...
  - Mypage
    - ~/CreditHistory: 크레딧 변동내역 리스트
    - ~/Resign: 회원 탈퇴
    - ~/Scrapped: 스크랩한 프로젝트/투표 리스트
    - ~/Uploaded: 업로드한 프로젝트/투표 리스트
    - ...

- 단계(페이지): 하나의 기능이 여러개의 단계로 나뉘어 제공되는 경우 각 단계. ( _~.page.tsx_ )

  e.g.)

  - Auth/Signup - 회원가입 화면

    - ~/EmailVerify: 이메일 인증 단계
    - ~/NamePassword: 실명, 비밀번호 입력 단계
    - ~/NicknameUserInfo: 닉네임, 유저 정보 입력 단계

  - Research/Upload - 프로젝트 업로드 화면
    - ~/TitleContent: 프로젝트 제목, 내용 입력 단계
    - ~/PurposeType:
