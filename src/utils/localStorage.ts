export const setItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export const getItem = <T>(key: string) => {
  const item = localStorage.getItem(key) || '[]';
  return JSON.parse(item) as T;
};
export const clearStorage = () => {
  localStorage.clear();
};
