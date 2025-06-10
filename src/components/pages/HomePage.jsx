import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import TaskInputForm from '@/components/organisms/TaskInputForm';
import TaskListDisplay from '@/components/organisms/TaskListDisplay';
import FilterBarOrganism from '@/components/organisms/FilterBarOrganism';
import Text from '@/components/atoms/Text';
import { taskService } from '@/services';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ status: 'all', searchTerm: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      try {
        const result = await taskService.getAll();
        setTasks(result);
      } catch (error) {
        toast.error('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [newTask, ...prev]);
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task));
      
      if (updates.completed !== undefined) {
        toast.success(updates.completed ? 'Task completed! 🎉' : 'Task marked as active');
      } else {
        toast.success('Task updated successfully!');
      }
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = 
      filter.status === 'all' || 
      (filter.status === 'active' && !task.completed) ||
      (filter.status === 'completed' && task.completed);
    
    const matchesSearch = 
      !filter.searchTerm ||
      task.title.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(filter.searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const completedCount = tasks.filter(task => task.completed).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-app">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {/* Header skeleton */}
            <div className="text-center">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
            </div>
            
            {/* Input skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>
            
            {/* Task skeletons */}
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm animate-pulse"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-5 h-5 bg-gray-200 rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-8 max-w-full overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Text as="h1" className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            TaskFlow
          </Text>
          <Text as="p" className="text-lg text-gray-600 max-w-2xl mx-auto break-words">
            Efficiently manage and complete your daily tasks with a clean, focused interface
          </Text>
          {completedCount > 0 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full"
            >
              <ApperIcon name="CheckCircle" size={16} />
              <Text as="span" className="font-medium">{completedCount} task{completedCount !== 1 ? 's' : ''} completed</Text>
            </motion.div>
          )}
        </motion.div>

        {/* Task Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <TaskInputForm onAddTask={handleAddTask} />
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <FilterBarOrganism filter={filter} onFilterChange={setFilter} taskCount={filteredTasks.length} />
        </motion.div>

        {/* Task List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TaskListDisplay
            tasks={filteredTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
            filter={filter}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;