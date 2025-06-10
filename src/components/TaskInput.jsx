import React, { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from './ApperIcon'

const TaskInput = ({ onAddTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [isExpanded, setIsExpanded] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false
    })

    // Reset form
    setTitle('')
    setDescription('')
    setPriority('medium')
    setIsExpanded(false)
  }

  const priorityOptions = [
    { value: 'high', label: 'High', color: 'text-error', bg: 'bg-error/10' },
    { value: 'medium', label: 'Medium', color: 'text-warning', bg: 'bg-warning/10' },
    { value: 'low', label: 'Low', color: 'text-success', bg: 'bg-success/10' }
  ]

  return (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-full"
    >
      <form onSubmit={handleSubmit} className="p-6">
        {/* Title Input */}
        <div className="relative mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 text-lg border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 max-w-full"
          />
          <motion.div
            className="absolute inset-0 rounded-lg border-2 border-primary pointer-events-none opacity-0"
            animate={{ opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        {/* Expanded Options */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="space-y-4"
            >
              {/* Description */}
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description (optional)"
                  rows={2}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none max-w-full"
                />
              </div>

              {/* Priority Selector */}
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">Priority:</span>
                <div className="flex space-x-2">
                  {priorityOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => setPriority(option.value)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        priority === option.value
                          ? `${option.bg} ${option.color} ring-2 ring-current ring-opacity-20`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false)
                    setTitle('')
                    setDescription('')
                    setPriority('medium')
                  }}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={!title.trim()}
                  whileHover={{ scale: title.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: title.trim() ? 0.95 : 1 }}
                  className={`px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    title.trim()
                      ? 'bg-primary text-white shadow-lg hover:bg-primary/90 hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <ApperIcon name="Plus" size={16} />
                    <span>Add Task</span>
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Simple Add Button (when collapsed) */}
        {!isExpanded && title.trim() && (
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full mt-4 px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-200"
          >
            <span className="flex items-center justify-center space-x-2">
              <ApperIcon name="Plus" size={16} />
              <span>Add Task</span>
            </span>
          </motion.button>
        )}
      </form>
    </motion.div>
  )
}

export default TaskInput