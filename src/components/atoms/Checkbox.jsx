import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ checked, onChange, className = '', ...props }) => {
  return (
    <Button
      onClick={onChange}
      className={`flex-shrink-0 mt-1 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
        checked
          ? 'bg-success border-success'
          : 'border-gray-300 hover:border-primary'
      }`}>
        <AnimatePresence>
          {checked && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ApperIcon name="Check" size={12} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Button>
  );
};

export default Checkbox;