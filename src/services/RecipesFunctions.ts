export const dataCat = async (title: string) => {
  const dataCategorie = title === 'meals' ? await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list') : await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

  const respCat = await dataCategorie.json();
  return respCat[title];
};

export const dataItem = async (title: string) => {
  const dataI = title === 'meals' ? await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=') : await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

  const respItem = await dataI.json();
  return respItem[title];
};

export const setItemsByCategory = async (title: string, cat: string) => {
  const data = title === 'meals' ? await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`) : await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`);
  const resp = await data.json();
  return resp[title];
};
