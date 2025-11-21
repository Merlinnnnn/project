import { useState } from 'react';
import { Task } from '../types';
import { Play, Pause, Check, Trash2, Plus, ChevronDown, ChevronRight } from 'lucide-react';
import { formatTime } from '../utils/time';
import { SubtaskInput } from './SubtaskInput';

interface TaskItemProps {
  task: Task;
  subtasks: Task[];
  onToggleTimer: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onAddSubtask: (parentId: string, title: string) => void;
  onToggleExpand: (id: string) => void;
  theme: any;
}

export const TaskItem = ({
  task,
  subtasks,
  onToggleTimer,
  onToggleComplete,
  onDelete,
  onAddSubtask,
  onToggleExpand,
  theme,
}: TaskItemProps) => {
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const currentTime = task.isRunning && task.lastStartTime
    ? task.timeSpent + Math.floor((Date.now() - task.lastStartTime) / 1000)
    : task.timeSpent;

  const handleAddSubtask = (title: string) => {
    onAddSubtask(task.id, title);
    setIsAddingSubtask(false);
  };

  return (
    <div className="space-y-2">
      <div
        className="rounded-lg p-4 shadow-sm border transition-all"
        style={{
          backgroundColor: theme.surface,
          borderColor: task.isRunning ? theme.primary : theme.border,
          borderWidth: task.isRunning ? '2px' : '1px',
          opacity: task.completed ? 0.6 : 1,
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {subtasks.length > 0 && (
              <button
                onClick={() => onToggleExpand(task.id)}
                className="p-1 rounded transition-colors"
                style={{ color: theme.text }}
              >
                {task.expanded ? (
                  <ChevronDown size={20} />
                ) : (
                  <ChevronRight size={20} />
                )}
              </button>
            )}

            <button
              onClick={() => onToggleComplete(task.id)}
              className="p-2 rounded-lg transition-all hover:scale-110 flex-shrink-0"
              style={{
                backgroundColor: task.completed ? theme.success : theme.border,
                color: task.completed ? 'white' : theme.textSecondary,
              }}
            >
              <Check size={18} />
            </button>
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className="font-medium truncate"
              style={{
                color: theme.text,
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </h3>
            <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
              {formatTime(currentTime)}
            </p>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => setIsAddingSubtask(true)}
              className="p-2 rounded-lg transition-all hover:scale-110"
              style={{ backgroundColor: theme.border, color: theme.text }}
              title="Add subtask"
            >
              <Plus size={18} />
            </button>

            <button
              onClick={() => onToggleTimer(task.id)}
              className="p-2 rounded-lg transition-all hover:scale-110"
              style={{
                backgroundColor: task.isRunning ? theme.error : theme.primary,
                color: 'white',
              }}
              disabled={task.completed}
            >
              {task.isRunning ? <Pause size={18} /> : <Play size={18} />}
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="p-2 rounded-lg transition-all hover:scale-110"
              style={{ backgroundColor: theme.error, color: 'white' }}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {isAddingSubtask && (
        <div className="ml-6">
          <SubtaskInput
            parentTaskTitle={task.title}
            onAdd={handleAddSubtask}
            onCancel={() => setIsAddingSubtask(false)}
            theme={theme}
          />
        </div>
      )}

      {task.expanded && subtasks.length > 0 && (
        <div
          className="ml-6 pl-4 space-y-2 border-l-2"
          style={{ borderColor: theme.border }}
        >
          {subtasks.map(subtask => (
            <TaskItem
              key={subtask.id}
              task={subtask}
              subtasks={[]}
              onToggleTimer={onToggleTimer}
              onToggleComplete={onToggleComplete}
              onDelete={onDelete}
              onAddSubtask={onAddSubtask}
              onToggleExpand={onToggleExpand}
              theme={theme}
            />
          ))}
        </div>
      )}
    </div>
  );
};
