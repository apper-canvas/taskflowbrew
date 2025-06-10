import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'
import TaskItem from './TaskItem'

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, filter }) => {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="mb-6"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
            <ApperIcon name="CheckSquare" className="w-12 h-12 text-primary" />
          </div>
        </motion.div>

        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
          {filter.status === 'completed' && 'No completed tasks yet'} 
          {filter.status === 'active' && 'No active tasks'} 
          {filter.status === 'all' && filter.searchTerm && 'No tasks found'}
          {filter.status === 'all' && !filter.searchTerm && 'Ready to get organized?'}
        </h3>
        
        <p className="text-gray-500 mb-6 max-w-md mx-auto break-words">
          {filter.status === 'completed' && 'Complete some tasks to see them here'} 
          {filter.status === 'active' && 'All tasks are completed! 🎉'} 
          {filter.status === 'all' && filter.searchTerm && `No tasks match "${filter.searchTerm}"`}
          {filter.status === 'all' && !filter.searchTerm && 'Add your first task above to start managing your daily responsibilities'}
        </p>

        {filter.status === 'all' && !filter.searchTerm && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full"
          >
            <ApperIcon name="ArrowUp" size={16} />
            <span className="font-medium">Start by adding a task above</span>
          </motion.div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="space-y-3 max-w-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ 
              duration: 0.2,
              delay: index * 0.05,
              layout: { duration: 0.3, ease: 'easeOut' }
            }}
          >
            <TaskItem
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TaskList