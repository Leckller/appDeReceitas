import { useState } from 'react';

function Search() {
  const [search, setSearch] = useState<string>('');

  return (
    <div>
      <form>
        <input
          type="text"
          name="search"
          id="search"
          data-testid="search-input"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
        />
      </form>
    </div>
  );
}

export default Search;
