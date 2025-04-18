import { create } from 'zustand';

/** 상품 모달 타입 정의 */
type ProductModalType =
  | 'ADD_TO_CART_CONFIRM'
  | 'PRODUCT_DETAIL'
  | 'OUT_OF_STOCK_ALERT'
  | 'REMOVE_FROM_CART_CONFIRM'
  | undefined;

/** 상품 데이터 타입 */
type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  stock: number;
};

/** 상품 모달 Props 정의 */
type ProductModalProps = {
  product?: Product;
  quantity?: number;
  errorMessage?: string;
};

/** 상품 모달 상태 타입 정의 */
type ProductModalState = {
  visible: boolean;
  type: ProductModalType;
  props: ProductModalProps;
};

/** 상품 모달 액션 타입 정의 */
type ProductModalActions = {
  showModal: (type: ProductModalType, props?: ProductModalProps) => void;
  closeModal: () => void;
  resetModal: () => void;
};

/** 상품 모달 스토어 통합 타입 */
type ProductModalStore = ProductModalState & ProductModalActions;

/** Zustand 상품 모달 스토어 */
export const useProductModalStore = create<ProductModalStore>(set => ({
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
// import { useProductModalStore } from './useProductModalStore';

// interface ProductCardProps {
//   product: {
//     id: string;
//     name: string;
//     price: number;
//     imageUrl?: string;
//     stock: number;
//   };
// }

// export default function ProductCard({ product }: ProductCardProps) {
//   const { showModal } = useProductModalStore();

//   const handleAddToCart = () => {
//     if (product.stock > 0) {
//       showModal('ADD_TO_CART_CONFIRM', { product, quantity: 1 });
//     } else {
//       showModal('OUT_OF_STOCK_ALERT', { product });
//     }
//   };

//   const handleViewDetails = () => {
//     showModal('PRODUCT_DETAIL', { product });
//   };

//   return (
//     <div>
//       <img src={product.imageUrl} alt={product.name} />
//       <h3>{product.name}</h3>
//       <p>{product.price.toLocaleString()} 원</p>
//       <button onClick={handleViewDetails}>상세 보기</button>
//       <button onClick={handleAddToCart}>장바구니 담기</button>
//     </div>
//   );
// }
