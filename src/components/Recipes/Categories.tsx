import { Categorias } from '../../types';

function Categories({ categorias, handleClick, handleClearAll }
: { categorias: Categorias[], handleClearAll: () => void,
  handleClick: (p: string) => void }) {
  return (
    <div className="w-screen flex flex-row justify-around items-center">
      {categorias && categorias.slice(0, 5).map(({ strCategory }) => (
        <button
          onClick={ () => handleClick(strCategory) }
          className="w-52 border border-black rounded-md mt-3 mb-1"
          data-testid={ `${strCategory}-category-filter` }
          key={ strCategory }
        >
          {strCategory}
        </button>
      ))}
      <button
        onClick={ handleClearAll }
        data-testid="All-category-filter"
      >
        All

      </button>
    </div>
  );
}

export default Categories;
