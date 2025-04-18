import AsyncStorage from '@react-native-async-storage/async-storage';

export type storageKey =
| 'EMAIL'
 | 'USER_INFO'; 
/**
 * AsyncStroage에 주어진 키:값을 저장합니다.
 * @author 도형
 */
export const setStorage = async (key: storageKey, value: any) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`setStroage of key ${key} error: ${error}`);
    return;
  }
};

/**
 * AsyncStroage에 저장된 값을 가져옵니다.
 * @author 도형
 */
export const getStorage = async (key: storageKey) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(`getStroage of key ${key} error: ${error}`);
    return null;
  }
};
