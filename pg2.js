import React from 'react';
import { animals } from './dataArrs'

const Page2 = ({ onGenerate }) => {
  const handleClick = () => {
    const randomWord = animals[Math.floor(Math.random() * animals.length)];
    onGenerate(randomWord);
  };

  return (
    <div>
      <h1>Page 2</h1>
      <button onClick={handleClick}>Generate Word</button>
    </div>
  );
};

export default Page2;
