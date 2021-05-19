/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useHistory, useLocation } from 'react-router-dom';
import ApiConfig from '../../config/movieApiConfig';
import MovieCard from '../../components/MovieCard';
import MovieInterface from '../../interfaces/IMovieInterface';

import { Container, CardList } from './styles';

const Home: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [movies, setMovies] = useState<MovieInterface[]>([]);
  const [bookmarks, setBookmarks] = useState<MovieInterface[]>(() => {
    const verifyFavorites = localStorage.getItem('@Movies:favorite');
    return verifyFavorites ? JSON.parse(verifyFavorites) : [];
  });

  useEffect(() => {
    const state = location.state as any;
    if (state) {
      const savedBookmarks = state.bookmarks;
      setBookmarks(savedBookmarks);
    }
  }, [location.state]);

  const handleBookmark = useCallback(
    (id: number) => {
      let updatedBookmarks = bookmarks;
      const movieIndex = movies.findIndex((movie) => movie.id === id);
      const bookmarkIndex = updatedBookmarks.findIndex(
        (movie) => movie.id === id
      );

      if (bookmarkIndex >= 0) {
        updatedBookmarks = updatedBookmarks.filter(
          (bookmark) => bookmark.id !== id
        );
      } else {
        updatedBookmarks.push({ ...movies[movieIndex], bookmarked: true });
      }

      setBookmarks(updatedBookmarks);
    },
    [movies, bookmarks]
  );

  useEffect(() => {
    if (bookmarks) {
      localStorage.setItem('@Movies:favorite', JSON.stringify(bookmarks));
    }
  }, [bookmarks]);

  const handleNavigateToBookmarks = useCallback(() => {
    history.push('/bookmarks', { movies: bookmarks });
  }, [history, bookmarks]);

  const useQuery = useCallback(function useQuery() {
    return new URLSearchParams(useLocation().search);
  }, []);

  const params = useQuery();
  const codequery = params.get('query');

  const searchMovies = useCallback(async () => {
    const url =
      `https://api.themoviedb.org/3/search/multi?` +
      `api_key=${ApiConfig.appKey}` +
      `&language=pt-BR&query=${codequery}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const responseMovies: MovieInterface[] = data.results;
      const markBookmarkedMovies = responseMovies.map((movie) => {
        return {
          ...movie,
          bookmarked:
            bookmarks.findIndex((bookmark) => bookmark.id === movie.id) >= 0,
        };
      });
      setMovies(markBookmarkedMovies);
    } catch (err) {
      console.error(err);
    }
  }, [codequery, bookmarks]);

  useEffect(() => {
    if (codequery) {
      searchMovies();
    }
  }, [codequery, searchMovies]);

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
        {movies.map((movie) => (
          <MovieCard
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
