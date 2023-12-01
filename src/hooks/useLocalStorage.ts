export const useLocalStorage = <T>() => {
  const setItem = (key: string, value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getItem = (key: string) => {
    const item = localStorage.getItem(key) || '[]';
    return JSON.parse(item) as T;
  };
  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };
  return { setItem, getItem, removeItem };
};
