import React, { useState } from 'react';

const Category: React.FC = () => {
  const [message] = useState('Category');
  return <div>{message}</div>;
};

export default Category;
