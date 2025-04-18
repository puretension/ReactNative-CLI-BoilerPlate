import { create } from 'zustand';

/** 전역 모달 타입 정의 */
type GlobalModalType =
  | 'EVENT'
  | 'NOTIFICATION'
  | 'REQUIRE_LOGIN'
  | 'REQUIRE_CERTIFICATE'
  | undefined;

/** 로그인 요구 사유 */
type RequireLoginReason =
  | 'RESEARCH_PARTICIPATE'
  | 'VOTE_PARTICIPATE'
  | 'DAILY_FORTUNE'
  | 'STORE'
  | undefined;

/** 본인 인증 요구 사유 */
type RequireCertificateReason =
  | 'RESEARCH_PARTICIPATE'
  | 'VOTE_PARTICIPATE'
  | 'DAILY_FORTUNE'
  | 'STORE'
  | undefined;

/** 모달 Props */
type GlobalModalProps = {
  requireLoginReason?: RequireLoginReason;
  requireCertificateReason?: RequireCertificateReason;
};

/** 전역 모달 상태 타입 정의 */
type GlobalModalState = {
  visible: boolean;
  type: GlobalModalType;
  props: GlobalModalProps;
};

/** 전역 모달 액션 타입 정의 */
type GlobalModalActions = {
  showModal: (type: GlobalModalType, props?: GlobalModalProps) => void;
  closeModal: () => void;
  resetModal: () => void;
};

/** 전역 모달 스토어 통합 타입 */
type GlobalModalStore = GlobalModalState & GlobalModalActions;

/** Zustand 전역 모달 스토어 */
export const useGlobalModalStore = create<GlobalModalStore>(set => ({
  visible: false,
  type: undefined,
  props: {},

  showModal: (type, props = {}) => {
    set({ visible: true, type, props });
  },

  closeModal: () => {
    set({ visible: false });
  },

  resetModal: () => {
    set({ visible: false, type: undefined, props: {} });
  },
}));

/** 실제 사용 예시 */
// import React from 'react';
// import { useGlobalModalStore } from './useGlobalModalStore';

// function AppComponent() {
//   const { visible, type, props, showModal, closeModal } = useGlobalModalStore();

//   const handleRequireLogin = () => {
//     showModal('REQUIRE_LOGIN', { requireLoginReason: 'VOTE_PARTICIPATE' });
//   };

//   return (
//     <>
//       <button onPress={handleRequireLogin}>참여 (로그인 필요)</button>

//       {visible && type === 'REQUIRE_LOGIN' && (
//         <LoginModal reason={props.requireLoginReason} onClose={closeModal} />
//       )}
//     </>
//   );
// }
