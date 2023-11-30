export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getItem = () => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : undefined;
  };
  // const removeItem = () => {
  //   localStorage.removeItem(key);
  // };
  return { setItem, getItem };
};
