import {NativeModules} from 'react-native';

const NativeSharedDefaults = NativeModules.SharedDefaults;

console.log('[NativeModules]', NativeModules);

class SharedDefaults {
  public async set(obj: Record<string, any>) {
    try {
      console.log('[NativeSharedDefaults]', NativeSharedDefaults);
      console.log('[obj]', obj);
      const res: boolean = await NativeSharedDefaults.set(JSON.stringify(obj));
      console.log('[res]', res);
      return res;
    } catch (e) {
      console.log('[e]', e);
      console.warn('[SHARED DEFAULTS]', e);
      return false;
    }
  }
}

export default new SharedDefaults();


