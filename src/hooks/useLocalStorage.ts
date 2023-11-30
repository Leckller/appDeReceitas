export const useLocalStorage = () => {
  const setItem = (value: unknown, key: string) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getItem = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  };
  // const removeItem = () => {
  //   localStorage.removeItem(key);
  // };
  return { setItem, getItem };
};
