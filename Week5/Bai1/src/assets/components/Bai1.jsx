import React, { useState } from 'react';
import Square from './Square';

const ColoredSquare = ({ number }) => {
  const isEvenNumber = !isNaN(number) && number % 2 === 0;

  return <Square style={{ background: isEvenNumber ? 'red' : 'green' }} />;
};

const MemoizedColoredSquare = React.memo(
  ColoredSquare,
  console.log('Rendered MemoizedColoredSquare'),
  (prevProps, nextProps) => (prevProps.number % 2) === (nextProps.number % 2)
  
);

export default function FeaturePage() {
  const [number, setNumber] = useState(0);

  
  const handleChange = (event) => {
    const value = parseInt(event.target.value, 10) || 0;
    setNumber(value);
  };

  return (
    <>
      <input
        type="number"
        value={number}
        onChange={handleChange}
      />
      {/* <ColoredSquare number={number} /> */}
      <MemoizedColoredSquare number={number} />
     
      
    </>
  );
}
