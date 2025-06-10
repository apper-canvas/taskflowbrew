import React from 'react';
import { format } from 'date-fns';
import Text from '@/components/atoms/Text';

const TaskCard = ({ task, priorityConfig }) => {
  const config = priorityConfig[task.priority];

  return (
    <div className="flex-1 min-w-0">
      <Text
        as="h3"
        className={`font-medium transition-all duration-200 break-words ${
          task.completed 
            ? 'text-gray-500 line-through' 
            : 'text-gray-900'
        }`}
      >
        {task.title}
      </Text>
      
      {task.description && (
        <Text
          as="p"
          className={`mt-1 text-sm transition-all duration-200 break-words ${
            task.completed 
              ? 'text-gray-400 line-through' 
              : 'text-gray-600'
          }`}
        >
          {task.description}
        </Text>
      )}

      <div className="flex items-center space-x-3 mt-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
          {config.label} Priority
        </span>
        
        <Text as="span" className="text-xs text-gray-400">
          {format(new Date(task.createdAt), 'MMM d, yyyy')}
        </Text>
      </div>
    </div>
  );
};

export default TaskCard;