import { DEFAULT_EXPIRATION, KEY_PREFIX } from './Storage.constants';
import { StoredData } from './Storage.types';

class StorageService {
  constructor() {
    throw new Error('StorageService has only static methods');
  }

  public static set(key: string, value: string, expiration?: number) {
    localStorage.setItem(
      KEY_PREFIX + key,
      JSON.stringify({
        data: value,
        expiration: Date.now() + (expiration ?? DEFAULT_EXPIRATION),
      } as StoredData)
    );
  }
  public static get(key: string) {
    const stored = localStorage.getItem(KEY_PREFIX + key);
    if (!stored) {
      return null;
    }
    try {
      const parsed: StoredData = JSON.parse(stored);
      if (parsed.expiration - Date.now() > 0) {
        return parsed.data;
      }
      this.clear(key);
    } catch {}
    return null;
  }
  public static clear(key?: string) {
    if (key === undefined) {
      localStorage.clear();
    } else {
      localStorage.removeItem(KEY_PREFIX + key);
    }
  }
}

export default StorageService;
