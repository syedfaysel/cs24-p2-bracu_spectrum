import React from 'react';

interface Props {
  message: string,
}

const customError = ({message}: Props) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default customError;