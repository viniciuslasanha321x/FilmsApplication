/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

import movieApiConfig from '../../config/movieApiConfig';
import IMovieInterface from '../../interfaces/IMovieInterface';

type IMoviesContext = {
  movies: IMovieInterface[];
  bookmarks: IMovieInterface[];
  handleBookmark: (id: number) => void;
  searchMovies: (codequery: string | null) => Promise<unknown>;
  savedBookmarks: (bookmarks: any) => Promise<void>;
};

type MoviesProviderProps = {
  children: ReactNode;
};

export const MoviesContext = createContext({} as IMoviesContext);

export const MoviesProvider = ({ children }: MoviesProviderProps) => {
  const [movies, setMovies] = useState<IMovieInterface[]>([]);
  const [bookmarks, setBookmarks] = useState<IMovieInterface[]>(() => {
    const favorites = localStorage.getItem('@Movies:favorite');
    return favorites ? JSON.parse(favorites) : [];
  });

  const savedBookmarks = async (savedBookmark: any) => {
    setBookmarks(savedBookmark);
  };

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

      const getData = localStorage.getItem('@Movies:favorite');

      if (getData) {
        const teste = JSON.parse(getData);
        console.log('getData:', teste);
      }

      localStorage.setItem(
        '@Movies:favorite',
        JSON.stringify(updatedBookmarks)
      );
    },
    [movies, bookmarks]
  );

  const searchMovies = async (codequery: string | null) => {
    const url =
      `https://api.themoviedb.org/3/search/multi?` +
      `api_key=${movieApiConfig.appKey}` +
      `&language=pt-BR&query=${codequery}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const responseMovies: IMovieInterface[] = data.results;
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
  };

  return (
    <MoviesContext.Provider
      value={{
        handleBookmark,
        searchMovies,
        bookmarks,
        savedBookmarks,
        movies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
