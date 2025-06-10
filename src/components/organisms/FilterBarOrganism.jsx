import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import SearchInput from '@/components/molecules/SearchInput';

const FilterBarOrganism = ({ filter, onFilterChange, taskCount }) => {
  const statusOptions = [
    { value: 'all', label: 'All Tasks', icon: 'List' },
    { value: 'active', label: 'Active', icon: 'Circle' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' }
  ];

  const handleStatusChange = (status) => {
    onFilterChange({ ...filter, status });
  };

  const handleSearchChange = (searchTerm) => {
    onFilterChange({ ...filter, searchTerm });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 max-w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Status Filter */}
        <div className="flex space-x-2 min-w-0">
          {statusOptions.map((option) => (
            <Button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium ${
                filter.status === option.value
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ApperIcon name={option.icon} size={16} />
              <span className="break-words">{option.label}</span>
            </Button>
          ))}
        </div>

        {/* Search and Count */}
        <div className="flex items-center space-x-4 min-w-0">
          {/* Task Count */}
          <Text as="div" className="text-sm text-gray-500 whitespace-nowrap">
            {taskCount} task{taskCount !== 1 ? 's' : ''}
          </Text>

          {/* Search Input */}
          <SearchInput
            value={filter.searchTerm}
            onChange={handleSearchChange}
            onClear={() => handleSearchChange('')}
            placeholder="Search tasks..."
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBarOrganism;