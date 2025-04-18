# Zustand 상태관리

_@reference : https://github.com/pmndrs/zustand_

---

### 📌 **[ 역할 ]**

- 앱 전반과 특정 도메인(예: 상품 관리 등)의 상태값 및 모달 상태를 관리합니다.

---

### 📌 **[ 네이밍 규칙 ]**

- **전역 모달**: `_global.modal.zustand.ts`
- **특정 도메인 모달**: `{domain}.modal.zustand.ts`
  - 상품 관리, 유저 관리 등 개별 도메인의 상태값 관리
  - 예시: `product.modal.zustand.ts`

---

### 📌 **[ 작동 원리 및 규칙 ]**

- Zustand를 사용하여 React 상태를 관리합니다.
- 자동완성 및 타입 안전성을 위해 상태값과 액션 타입을 명시합니다.
- Zustand store 명칭은 `use~Store` 형태로 작성합니다.

### 📎 전역 모달 Zustand 예시

```typescript
import { create } from 'zustand';

/** 전역 모달 타입 정의 */
type GlobalModalType = 'EVENT' | 'NOTIFICATION' | undefined;

/** 전역 모달 Props 정의 */
type GlobalModalProps = {
  message?: string;
};

/** 전역 모달 상태 및 액션 정의 */
type GlobalModalStore = {
  visible: boolean;
  type: GlobalModalType;
  props: GlobalModalProps;
  showModal: (type: GlobalModalType, props?: GlobalModalProps) => void;
  closeModal: () => void;
  resetModal: () => void;
};

export const useGlobalModalStore = create<GlobalModalStore>(set => ({
  visible: false,
  type: undefined,
  props: {},

  showModal: (type, props = {}) => set({ visible: true, type, props }),
  closeModal: () => set({ visible: false }),
  resetModal: () => set({ visible: false, type: undefined, props: {} }),
}));
```

### 📎 특정 도메인 모달 Zustand 예시 (상품 관리)

```typescript
import { create } from 'zustand';

/** 상품 모달 타입 정의 */
type ProductModalType = 'PRODUCT_DETAIL' | 'ADD_TO_CART_CONFIRM' | undefined;

/** 상품 데이터 타입 */
type Product = {
  id: string;
  name: string;
  price: number;
};

/** 상품 모달 Props 정의 */
type ProductModalProps = {
  product?: Product;
  quantity?: number;
};

/** 상품 모달 상태 및 액션 정의 */
type ProductModalStore = {
  visible: boolean;
  type: ProductModalType;
  props: ProductModalProps;
  showModal: (type: ProductModalType, props?: ProductModalProps) => void;
  closeModal: () => void;
  resetModal: () => void;
};

export const useProductModalStore = create<ProductModalStore>(set => ({
  visible: false,
  type: undefined,
  props: {},

  showModal: (type, props = {}) => set({ visible: true, type, props }),
  closeModal: () => set({ visible: false }),
  resetModal: () => set({ visible: false, type: undefined, props: {} }),
}));
```

---

### 📌 **[ 상태값 호출/사용 예시 ]**

```tsx
import React from 'react';
import shallow from 'zustand/shallow';
import { useProductModalStore } from './product.modal.zustand';

export function ProductCard({ product }: { product: Product }) {
  const { showModal } = useProductModalStore(
    state => ({
      showModal: state.showModal,
    }),
    shallow,
  );

  return (
    <div>
      <h3>{product.name}</h3>
      <button onClick={() => showModal('PRODUCT_DETAIL', { product })}>
        상품 상세 보기
      </button>
    </div>
  );
}
```

---

### 📌 **[ 기타 (useContext와의 차이점) ]**

- **Zustand**:

  - 앱 전체에서 상태 유지 가능 (앱 종료 전까지 유지)
  - 앱 전체에서 하나만 존재해야 하는 상태 관리에 적합(예: 마이페이지 정보, 홈영역의 메인 데이터 영역)

- **useContext**:
  - 특정 컴포넌트가 unmount되면 상태 초기화
  - 여러 개의 독립된 인스턴스(예: 특정 상세 페이지, 여러스텝의 회원가입 페이지 등)를 관리하는 데 적합
