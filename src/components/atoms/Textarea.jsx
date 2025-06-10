import React from 'react';

const Textarea = ({ className = '', rows = 2, ...props }) => {
  return (
    <textarea
      rows={rows}
      className={`w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none max-w-full ${className}`}
      {...props}
    />
  );
};

export default Textarea;