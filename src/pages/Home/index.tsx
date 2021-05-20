import React, { useState, useCallback, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Container } from './styles';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');

  const history = useHistory();

  const searchMovies = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (!query) {
        toast.error('Campo De Busca Em Branco');
      } else {
        history.push(`/search?query=${query}`);
      }
    },
    [history, query]
  );

  return (
    <Container>
      <h1>React Typescript</h1>
      <h2>Movie Search</h2>

      <form className="form" onSubmit={searchMovies}>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="i.e. Jurassic Park"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button className="button" type="submit">
          Search
        </button>
      </form>
    </Container>
  );
};

export default Home;
