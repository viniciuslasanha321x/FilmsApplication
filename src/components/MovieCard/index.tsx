import React, { useState, useCallback, useEffect } from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import MovieInterface from '../../interfaces/IMovieInterface';

import { Container } from './styles';

interface Props {
  movie: MovieInterface;
  isFavorited: boolean;
  handleBookmark: (id: number) => void;
}

const MovieCard: React.FC<Props> = ({ movie, handleBookmark, isFavorited }) => {
  const [bookmarked, setBookmarked] = useState(isFavorited);

  const toggleBookmark = useCallback(() => {
    setBookmarked(isFavorited);
    handleBookmark(movie.id);
  }, [handleBookmark, movie.id, isFavorited]);

  useEffect(() => {
    setBookmarked(isFavorited);
  }, [isFavorited]);

  return (
    <Container bookmarked={bookmarked}>
      <span>
        <button type="button" onClick={toggleBookmark}>
          {isFavorited ? <AiFillStar size={38} /> : <AiOutlineStar size={38} />}
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
