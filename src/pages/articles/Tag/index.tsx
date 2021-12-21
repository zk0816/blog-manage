import React, { useState } from 'react';

const Tag: React.FC = () => {
  const [message] = useState('tag');
  return <div>{message}1111111</div>;
};

export default Tag;
