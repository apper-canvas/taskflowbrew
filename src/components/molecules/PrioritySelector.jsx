import React from 'react';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const PrioritySelector = ({ currentPriority, onSelectPriority, options, className = '' }) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Text as="span" className="text-sm font-medium text-gray-700">Priority:</Text>
      <div className="flex space-x-2">
        {options.map((option) => (
          <Button
            key={option.value}
            type="button"
            onClick={() => onSelectPriority(option.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium ${
              currentPriority === option.value
                ? `${option.bg} ${option.color} ring-2 ring-current ring-opacity-20`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default PrioritySelector;