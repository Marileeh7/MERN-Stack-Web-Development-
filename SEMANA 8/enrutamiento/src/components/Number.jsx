import React from 'react';
import { useParams } from 'react-router-dom';

const Number = () => {
  const { number } = useParams();
  return <h1>This is a number: {number}</h1>;
};

export default Number;
