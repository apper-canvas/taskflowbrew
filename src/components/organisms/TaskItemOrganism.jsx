import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Checkbox from '@/components/atoms/Checkbox';
import Input from '@/components/atoms/Input';
import Textarea from '@/components/atoms/Textarea';
import Button from '@/components/atoms/Button';
import PrioritySelector from '@/components/molecules/PrioritySelector';
import TaskCard from '@/components/molecules/TaskCard';

const priorityConfig = {
  high: { color: 'border-error', bg: 'bg-error/10', text: 'text-error', label: 'High' },
  medium: { color: 'border-warning', bg: 'bg-warning/10', text: 'text-warning', label: 'Medium' },
  low: { color: 'border-success', bg: 'bg-success/10', text: 'text-success', label: 'Low' }
};

const TaskItemOrganism = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const config = priorityConfig[task.priority];

  const handleToggleComplete = () => {
    onUpdate(task.id, { completed: !task.completed });
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditPriority(task.priority);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

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
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="px-3 py-2 text-base font-medium"
              autoFocus
            />
            
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Add a description..."
              rows={2}
              className="px-3 py-2 text-sm"
            />

            <PrioritySelector
              currentPriority={editPriority}
              onSelectPriority={setEditPriority}
              options={Object.entries(priorityConfig).map(([key, data]) => ({
                value: key,
                label: data.label,
                color: data.text,
                bg: data.bg
              }))}
            />

            <div className="flex items-center justify-end space-x-3">
              <Button
                onClick={handleCancelEdit}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 bg-transparent p-0"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                disabled={!editTitle.trim()}
                className={`px-4 py-2 rounded-lg font-medium ${
                  editTitle.trim()
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Save
              </Button>
            </div>
          </div>
        ) : (
          /* View Mode */
          <div className="flex items-start space-x-4">
            {/* Checkbox */}
            <Checkbox checked={task.completed} onChange={handleToggleComplete} />

            {/* Content */}
            <div className="flex-1 min-w-0 flex items-start justify-between">
              <TaskCard task={task} priorityConfig={priorityConfig} />

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-400 hover:text-primary bg-transparent"
                >
                  <ApperIcon name="Edit2" size={16} />
                </Button>
                
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 text-gray-400 hover:text-error bg-transparent"
                >
                  <ApperIcon name="Trash2" size={16} />
                </Button>
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
                <Text as="p" className="text-sm font-medium text-gray-900">Delete this task?</Text>
                <Text as="p" className="text-xs text-gray-500">This action cannot be undone.</Text>
              </div>
              <div className="flex space-x-3">
                <Button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 bg-transparent p-0"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  className="px-3 py-1.5 bg-error text-white rounded-lg text-sm font-medium hover:bg-error/90"
                >
                  Delete
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskItemOrganism;