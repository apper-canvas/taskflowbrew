import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Button from '@/components/atoms/Button';
import PrioritySelector from '@/components/molecules/PrioritySelector';

const priorityOptions = [
  { value: 'high', label: 'High', color: 'text-error', bg: 'bg-error/10' },
  { value: 'medium', label: 'Medium', color: 'text-warning', bg: 'bg-warning/10' },
  { value: 'low', label: 'Low', color: 'text-success', bg: 'bg-success/10' }
];

const TaskInputForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      completed: false
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setIsExpanded(false);
  };

  return (
    <motion.div
      layout
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-w-full"
    >
      <form onSubmit={handleSubmit} className="p-6">
        {/* Title Input */}
        <div className="relative mb-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="What needs to be done?"
            className="text-lg"
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
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description (optional)"
                />
              </div>

              {/* Priority Selector */}
              <PrioritySelector
                currentPriority={priority}
                onSelectPriority={setPriority}
                options={priorityOptions}
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <Button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setTitle('');
                    setDescription('');
                    setPriority('medium');
                  }}
                  className="text-gray-500 hover:text-gray-700 bg-transparent p-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!title.trim()}
                  className={`px-6 py-2.5 rounded-lg font-medium ${
                    title.trim()
                      ? 'bg-primary text-white shadow-lg hover:bg-primary/90 hover:shadow-xl'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  whileHover={{ scale: title.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: title.trim() ? 0.95 : 1 }}
                >
                  <span className="flex items-center space-x-2">
                    <ApperIcon name="Plus" size={16} />
                    <span>Add Task</span>
                  </span>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Simple Add Button (when collapsed) */}
        {!isExpanded && title.trim() && (
          <Button
            type="submit"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-4 px-6 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:bg-primary/90 hover:shadow-xl"
          >
            <span className="flex items-center justify-center space-x-2">
              <ApperIcon name="Plus" size={16} />
              <span>Add Task</span>
            </span>
          </Button>
        )}
      </form>
    </motion.div>
  );
};

export default TaskInputForm;