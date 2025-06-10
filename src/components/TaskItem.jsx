import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description)
  const [editPriority, setEditPriority] = useState(task.priority)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const priorityConfig = {
    high: { color: 'border-error', bg: 'bg-error/10', text: 'text-error', label: 'High' },
    medium: { color: 'border-warning', bg: 'bg-warning/10', text: 'text-warning', label: 'Medium' },
    low: { color: 'border-success', bg: 'bg-success/10', text: 'text-success', label: 'Low' }
  }

  const config = priorityConfig[task.priority]

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed })
  }

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return
    
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority
    })
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditTitle(task.title)
    setEditDescription(task.description)
    setEditPriority(task.priority)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(task.id)
    setShowDeleteConfirm(false)
  }

  return (
    <motion.div
      layout
      whileHover={{ y: -2, transition: { duration: 0.15 } }}
      className={`bg-white rounded-xl border-l-4 ${config.color} shadow-sm hover:shadow-md transition-all duration-200 max-w-full overflow-hidden`}
    >
      <div className="p-6">
        {isEditing ? (
          /* Edit Mode */
          <div className="space-y-4">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-medium max-w-full"
              autoFocus
            />
            
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Add a description..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none max-w-full"
            />

            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Priority:</span>
              <div className="flex space-x-2">
                {Object.entries(priorityConfig).map(([key, priorityData]) => (
                  <motion.button
                    key={key}
                    type="button"
                    onClick={() => setEditPriority(key)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      editPriority === key
                        ? `${priorityData.bg} ${priorityData.text} ring-2 ring-current ring-opacity-20`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {priorityData.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <motion.button
                onClick={handleCancelEdit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleSaveEdit}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!editTitle.trim()}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  editTitle.trim()
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Save
              </motion.button>
            </div>
          </div>
        ) : (
          /* View Mode */
          <div className="flex items-start space-x-4">
            {/* Checkbox */}
            <motion.button
              onClick={handleToggleComplete}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex-shrink-0 mt-1"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                task.completed
                  ? 'bg-success border-success'
                  : 'border-gray-300 hover:border-primary'
              }`}>
                <AnimatePresence>
                  {task.completed && (
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
            </motion.button>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium transition-all duration-200 break-words ${
                    task.completed 
                      ? 'text-gray-500 line-through' 
                      : 'text-gray-900'
                  }`}>
                    {task.title}
                  </h3>
                  
                  {task.description && (
                    <p className={`mt-1 text-sm transition-all duration-200 break-words ${
                      task.completed 
                        ? 'text-gray-400 line-through' 
                        : 'text-gray-600'
                    }`}>
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center space-x-3 mt-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                      {config.label} Priority
                    </span>
                    
                    <span className="text-xs text-gray-400">
                      {format(new Date(task.createdAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <motion.button
                    onClick={() => setIsEditing(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-primary transition-colors duration-200"
                  >
                    <ApperIcon name="Edit2" size={16} />
                  </motion.button>
                  
                  <motion.button
                    onClick={() => setShowDeleteConfirm(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-gray-400 hover:text-error transition-colors duration-200"
                  >
                    <ApperIcon name="Trash2" size={16} />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-100 bg-gray-50 px-6 py-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Delete this task?</p>
                <p className="text-xs text-gray-500">This action cannot be undone.</p>
              </div>
              <div className="flex space-x-3">
                <motion.button
                  onClick={() => setShowDeleteConfirm(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleDelete}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-3 py-1.5 bg-error text-white rounded-lg text-sm font-medium hover:bg-error/90 transition-colors duration-200"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default TaskItem