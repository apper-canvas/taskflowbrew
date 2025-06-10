import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const FilterBar = ({ filter, onFilterChange, taskCount }) => {
  const statusOptions = [
    { value: 'all', label: 'All Tasks', icon: 'List' },
    { value: 'active', label: 'Active', icon: 'Circle' },
    { value: 'completed', label: 'Completed', icon: 'CheckCircle' }
  ]

  const handleStatusChange = (status) => {
    onFilterChange({ ...filter, status })
  }

  const handleSearchChange = (searchTerm) => {
    onFilterChange({ ...filter, searchTerm })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 max-w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        {/* Status Filter */}
        <div className="flex space-x-2 min-w-0">
          {statusOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => handleStatusChange(option.value)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 min-w-0 ${
                filter.status === option.value
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ApperIcon name={option.icon} size={16} />
              <span className="break-words">{option.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Search and Count */}
        <div className="flex items-center space-x-4 min-w-0">
          {/* Task Count */}
          <div className="text-sm text-gray-500 whitespace-nowrap">
            {taskCount} task{taskCount !== 1 ? 's' : ''}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 md:flex-none md:w-64 min-w-0">
            <ApperIcon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
            />
            <input
              type="text"
              value={filter.searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-sm max-w-full"
            />
            {filter.searchTerm && (
              <motion.button
                onClick={() => handleSearchChange('')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <ApperIcon name="X" size={14} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar