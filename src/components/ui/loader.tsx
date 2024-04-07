import React from 'react';
import { Dna } from 'react-loader-spinner';

const Loader = () => {

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Dna
        visible={true}
        height="150"
        width="150"
        ariaLabel="dna-loading"
      />
    </div>
  );
};

export default Loader;
