/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useContext } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useHistory, useLocation } from 'react-router-dom';
import MovieCard from '../../components/MovieCard';

import { Container, CardList } from './styles';
import { MoviesContext } from '../../components/Context/favoritesMovies';
import IMovieInterface from '../../interfaces/IMovieInterface';

const Home: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const {
    searchMovies,
    handleBookmark,
    bookmarks,
    movies,
    savedBookmarks,
  } = useContext(MoviesContext);

  useEffect(() => {
    const state = location.state as any;
    if (state) {
      savedBookmarks(state.bookmarks);
    }
  }, [savedBookmarks, location.state]);

  const handleNavigateToBookmarks = useCallback(() => {
    history.push('/bookmarks', { movies: bookmarks });
  }, [history, bookmarks]);

  const useQuery = useCallback(function useQuery() {
    return new URLSearchParams(useLocation().search);
  }, []);

  const params = useQuery();
  const codequery = params.get('query');

  const getMovies = useCallback(async () => {
    searchMovies(codequery);
  }, [searchMovies, codequery]);

  useEffect(() => {
    if (codequery) {
      getMovies();
    }
  }, [codequery, getMovies]);

  return (
    <Container>
      <h1>React Typescript</h1>
      <h2>Movie Search</h2>

      <button type="button" onClick={handleNavigateToBookmarks}>
        <span>Bookmarks</span>
        <span>
          <AiFillStar size={15} />
        </span>
      </button>
      <CardList>
        {movies.map((movie: IMovieInterface) => (
          <MovieCard
            isFavorited={movie.bookmarked}
            handleBookmark={handleBookmark}
            movie={movie}
            key={movie.id}
          />
        ))}
      </CardList>
    </Container>
  );
};

export default Home;
