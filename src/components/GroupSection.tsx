import { TaskGroup, Task } from '../types';
import { ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import { TaskItem } from './TaskItem';

interface GroupSectionProps {
  group: TaskGroup;
  tasks: Task[];
  onToggleExpand: (id: string) => void;
  onDeleteGroup: (id: string) => void;
  onToggleTimer: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onAddSubtask: (parentId: string) => void;
  onToggleTaskExpand: (id: string) => void;
  theme: any;
}

export const GroupSection = ({
  group,
  tasks,
  onToggleExpand,
  onDeleteGroup,
  onToggleTimer,
  onToggleComplete,
  onDeleteTask,
  onAddSubtask,
  onToggleTaskExpand,
  theme,
}: GroupSectionProps) => {
  const topLevelTasks = tasks.filter(t => !t.parentId);

  return (
    <div className="mb-6">
      <div
        className="flex items-center gap-3 p-4 rounded-lg mb-3 cursor-pointer"
        style={{ backgroundColor: group.color }}
        onClick={() => onToggleExpand(group.id)}
      >
        {group.expanded ? (
          <ChevronDown size={20} color="white" />
        ) : (
          <ChevronRight size={20} color="white" />
        )}
        <h2 className="text-lg font-semibold text-white flex-1">{group.name}</h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDeleteGroup(group.id);
          }}
          className="p-2 rounded-lg hover:bg-black/10 transition-colors"
        >
          <Trash2 size={18} color="white" />
        </button>
      </div>

      {group.expanded && (
        <div className="space-y-3">
          {topLevelTasks.map(task => {
            const subtasks = tasks.filter(t => t.parentId === task.id);
            return (
              <TaskItem
                key={task.id}
                task={task}
                subtasks={subtasks}
                onToggleTimer={onToggleTimer}
                onToggleComplete={onToggleComplete}
                onDelete={onDeleteTask}
                onAddSubtask={onAddSubtask}
                onToggleExpand={onToggleTaskExpand}
                theme={theme}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
