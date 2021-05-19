import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
  padding: 40px;
  justify-content: center;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.75);
    color: white;
    padding: 1rem 2rem;
    border: 1px solid rgba(0, 0, 0, 0.75);
    border-radius: 20px;
    font-size: 1.2rem;

    cursor: pointer;
    transition: background-color 250ms;
    outline: none;
    margin-bottom: 10px;

    span + span {
      margin-left: 5px;
      margin-top: 3px;
    }
  }

  h1 {
    text-align: center;
    font-size: 4rem;
  }

  h2 {
    text-align: center;
    font-size: 2rem;
  }
`;

export const CardList = styled.div`
  margin-top: 4rem;
`;
