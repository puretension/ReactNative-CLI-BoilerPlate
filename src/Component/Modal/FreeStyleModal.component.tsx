import React, {useState, useEffect} from 'react';
import {
  Modal,
  ModalProps,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';

/**
 * 내부 요소를 자유롭게 구성하여 사용할 수 있는 모달입니다.
 * @author 도형
 */
export function FreeStyleModal({
  setModalVisible,
  children,
  style,
  options,
  modalProps,
}: {
  setModalVisible: (modalVisible: boolean) => void;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  options?: {
    force?: boolean;
  };
  modalProps?: Partial<ModalProps>;
}) {
  const [visible, setVisible] = useState(false);

  /**
   * 뒤로 가기 버튼을 누르거나, 배경을 눌러 모달을 무시할 수 있는지 여부.
   * force 옵션이 true로 명시되지 않는 이상 true 값을 가집니다.
   */
  const ableToIgnore = options?.force !== true;

  /** */
  function closeModal() {
    setModalVisible(false);
    setVisible(false);
  }

  //* 이미지가 포함된 경우, 이미지가 로드된 이후 모달이 보이도록 설정합니다.
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Modal
      visible={visible}
      //? 하드웨어 뒤로 가기 버튼이 눌렸을 때 행동 지정
      onRequestClose={ableToIgnore ? closeModal : undefined}
      transparent
      animationType="slide"
      {...modalProps}>
      {/* 검은색 배경 */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={ableToIgnore ? closeModal : undefined}
        style={{
          position: 'relative',
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}>
        {/* 외곽 컨테이너 */}
        <TouchableOpacity
          activeOpacity={1}
          onPress={undefined}
          style={[
            {
              backgroundColor: '#FFFFFF',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
            },
            style,
          ]}>
          {/* 헤더: 우측 상단 X 표시. ableToIgnore가 false인 경우 보여지지 않습니다. */}
          {ableToIgnore && (
            <View
              style={{
                alignItems: 'flex-end',
                paddingTop: 20,
                paddingHorizontal: 16,
              }}>
              <TouchableOpacity
                style={{padding: 8}}
                activeOpacity={1}
                onPress={closeModal}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          )}

          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
