import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, className = '', onClick, type = 'button', disabled = false, whileHover, whileTap, ...props }) => {
  const motionProps = {
    whileHover: whileHover !== undefined ? whileHover : { scale: 1.05 },
    whileTap: whileTap !== undefined ? whileTap : { scale: 0.95 },
  };

  // Filter out motion props before passing to the native button element
  const buttonProps = { ...props };
  delete buttonProps.whileHover;
  delete buttonProps.whileTap;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`transition-all duration-200 ${className}`}
      disabled={disabled}
      {...motionProps}
      {...buttonProps}
    >
      {children}
    </motion.button>
  );
};

export default Button;