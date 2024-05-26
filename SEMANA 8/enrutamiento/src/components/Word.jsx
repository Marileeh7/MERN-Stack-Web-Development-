import React from 'react';
import { useParams } from 'react-router-dom';

const Word = () => {
  const { word } = useParams();
  return <h1>{word}</h1>;
};

export default Word;
