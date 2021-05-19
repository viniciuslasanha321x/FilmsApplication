import React, { useState, useCallback } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import MovieInterface from '../../interfaces/IMovieInterface';

import { Container } from './styles';

interface Props {
  movie: MovieInterface;
  handleBookmark: (id: number) => void;
}

const MovieCard: React.FC<Props> = ({ movie, handleBookmark }) => {
  const [bookmarked, setBookmarked] = useState(movie.bookmarked);

  const toggleBookmark = useCallback(() => {
    setBookmarked(!bookmarked);
    handleBookmark(movie.id);
  }, [handleBookmark, movie.id, bookmarked]);

  return (
    <Container bookmarked={bookmarked}>
      <span>
        <button type="button" onClick={toggleBookmark}>
          {bookmarked ? <AiFillStar size={38} /> : <AiOutlineStar size={38} />}
        </button>
      </span>
      <img
        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
        alt={`${movie.title} poster`}
      />
      <div>
        <h3>{movie.title}</h3>
        <p>
          <small>RELEASE DATE: </small>
          {movie.release_date}
        </p>
        <p>
          <small>RATING: </small>
          {movie.vote_average}
        </p>
        <p>
          <small>SINOPSE: </small>

          {movie.overview || '...Não encontrada'}
        </p>
      </div>
    </Container>
  );
};

export default MovieCard;
