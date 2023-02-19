import StorageService from './Storage';

describe('Storage Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should throw on creating object', () => {
    expect(() => new StorageService()).toThrow();
  });

  it('should store value', () => {
    expect(() => StorageService.set('random', 'test')).not.toThrow();
  });

  it('should return undefined when getting value from nonexisting key', () => {
    expect(StorageService.get('random')).toBeNull();
  });

  it('should return stored value', () => {
    const key = 'random';
    const value = 'anything';
    StorageService.set(key, value);
    expect(StorageService.get(key)).toBe(value);
  });

  it('should return null for expired value', () => {
    const key = 'key1';
    StorageService.set(key, 'a value', -1);
    expect(StorageService.get(key)).toBeNull();
  });

  it('should clear stored value', () => {
    const key = 'something';
    StorageService.set(key, 'nothing');
    StorageService.clear(key);
    expect(StorageService.get(key)).toBeNull();
  });

  it('should clear whole storage', () => {
    const key1 = 'key1';
    const key2 = 'key2';
    StorageService.set(key1, 'nothing');
    StorageService.set(key2, 'nothing');
    StorageService.clear();
    expect(StorageService.get(key1)).toBeNull();
    expect(StorageService.get(key2)).toBeNull();
  });
});
