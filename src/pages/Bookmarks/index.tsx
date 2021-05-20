import React, { useCallback, useContext } from 'react';

import { AiFillBackward } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import { MoviesContext } from '../../components/Context/favoritesMovies';
import MovieCard from '../../components/MovieCard';
import { Container, CardList } from './styles';

const Bookmarks: React.FC = () => {
  const history = useHistory();

  const { handleBookmark, bookmarks } = useContext(MoviesContext);

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

export default Bookmarks;
