import { useState } from 'react';
import { useTaskManager } from './hooks/useTaskManager';
import { AddTaskForm } from './components/AddTaskForm';
import { AddGroupForm } from './components/AddGroupForm';
import { GroupSection } from './components/GroupSection';
import { TaskItem } from './components/TaskItem';
import { SettingsPanel } from './components/SettingsPanel';
import { Clock } from 'lucide-react';

function App() {
  const {
    tasks,
    groups,
    settings,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskTimer,
    toggleTaskComplete,
    addGroup,
    updateGroup,
    deleteGroup,
    clearCache,
    updateSettings,
  } = useTaskManager();

  const handleAddTask = (title: string, groupId?: string, parentId?: string) => {
    addTask(title, groupId, parentId);
  };

  const handleAddSubtask = (parentId: string, title: string) => {
    addTask(title, undefined, parentId);
  };

  const handleToggleTaskExpand = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { expanded: !task.expanded });
    }
  };

  const handleToggleGroupExpand = (id: string) => {
    const group = groups.find(g => g.id === id);
    if (group) {
      updateGroup(id, { expanded: !group.expanded });
    }
  };

  const ungroupedTasks = tasks.filter(t => !t.groupId && !t.parentId);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: settings.theme.background }}
    >
      <SettingsPanel
        settings={settings}
        onUpdateSettings={updateSettings}
        onClearCache={clearCache}
      />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="p-3 rounded-lg"
            style={{ backgroundColor: settings.theme.primary }}
          >
            <Clock size={32} color="white" />
          </div>
          <h1 className="text-4xl font-bold" style={{ color: settings.theme.text }}>
            Task Timer
          </h1>
        </div>

        <div className="mb-6">
          <AddTaskForm
            groups={groups}
            onAdd={handleAddTask}
            theme={settings.theme}
          />
        </div>

        <div className="mb-6">
          <AddGroupForm onAdd={addGroup} theme={settings.theme} />
        </div>

        <div className="space-y-6">
          {groups.map(group => {
            const groupTasks = tasks.filter(t => t.groupId === group.id);
            if (groupTasks.length === 0) return null;

            return (
              <GroupSection
                key={group.id}
                group={group}
                tasks={groupTasks}
                onToggleExpand={handleToggleGroupExpand}
                onDeleteGroup={deleteGroup}
                onToggleTimer={toggleTaskTimer}
                onToggleComplete={toggleTaskComplete}
                onDeleteTask={deleteTask}
                onAddSubtask={handleAddSubtask}
                onToggleTaskExpand={handleToggleTaskExpand}
                theme={settings.theme}
              />
            );
          })}

          {ungroupedTasks.length > 0 && (
            <div className="space-y-3">
              {ungroupedTasks.map(task => {
                const subtasks = tasks.filter(t => t.parentId === task.id);
                return (
                  <TaskItem
                    key={task.id}
                    task={task}
                    subtasks={subtasks}
                    onToggleTimer={toggleTaskTimer}
                    onToggleComplete={toggleTaskComplete}
                    onDelete={deleteTask}
                    onAddSubtask={handleAddSubtask}
                    onToggleExpand={handleToggleTaskExpand}
                    theme={settings.theme}
                  />
                );
              })}
            </div>
          )}
        </div>

        {tasks.length === 0 && (
          <div
            className="text-center py-16 rounded-lg border-2 border-dashed"
            style={{ borderColor: settings.theme.border }}
          >
            <Clock size={64} style={{ color: settings.theme.textSecondary, margin: '0 auto' }} />
            <p className="mt-4 text-lg" style={{ color: settings.theme.textSecondary }}>
              No tasks yet. Create one to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
