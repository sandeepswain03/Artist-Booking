
declare module 'react-rating' {
    import * as React from 'react';
  
    interface RatingProps {
      initialRating?: number;
      emptySymbol?: React.ReactNode | string;
      fullSymbol?: React.ReactNode | string;
      readonly?: boolean;
      onClick?: (value: number) => void;
      onHover?: (value: number) => void;
      stop?: number;
      step?: number;
      fractions?: number;
    }
  
    const Rating: React.FC<RatingProps>;
  
    export default Rating;
  }