import React, { useState, useCallback } from 'react';
import { AiFillBackward } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import MovieInterface from '../../interfaces/IMovieInterface';
import MovieCard from '../../components/MovieCard';
import { Container, CardList } from './styles';

const Bookmarks: React.FC = () => {
  const history = useHistory();
  const [bookmarks, setBookmarks] = useState<MovieInterface[]>(() => {
    const verifyFavorites = localStorage.getItem('@Movies:favorite');
    return verifyFavorites ? JSON.parse(verifyFavorites) : [];
  });

  const handleBookmark = useCallback(
    (id: number) => {
      let updatedBookmarks = bookmarks;
      updatedBookmarks = updatedBookmarks.filter(
        (bookmark) => bookmark.id !== id
      );

      const getData = localStorage.getItem('@Movies:favorite');

      if (getData) {
        const teste = JSON.parse(getData);
        console.log('getData:', teste);
      }

      localStorage.setItem(
        '@Movies:favorite',
        JSON.stringify(updatedBookmarks)
      );

      setBookmarks(updatedBookmarks);
    },
    [bookmarks]
  );

  const handleBackToHome = useCallback(() => {
    history.push('/', { bookmarks });
  }, [history, bookmarks]);

  localStorage.getItem('@Movies:favorite');

  return (
    <Container>
      <h1>React Typescript</h1>
      <h2>Movies Bookmark</h2>
      <button type="button" onClick={handleBackToHome}>
        <span>Back to home</span>
        <span>
          <AiFillBackward size={15} />
        </span>
      </button>
      <CardList>
        {bookmarks.map((movie) => (
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

export default Bookmarks;
