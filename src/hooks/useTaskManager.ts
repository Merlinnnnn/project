import { useState, useEffect, useCallback } from 'react';
import { Task, TaskGroup, Settings } from '../types';
import { storage, defaultSettings } from '../utils/storage';
import { playBellSound } from '../utils/time';

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [groups, setGroups] = useState<TaskGroup[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [originalTitle] = useState(document.title);

  useEffect(() => {
    setTasks(storage.getTasks());
    setGroups(storage.getGroups());
    setSettings(storage.getSettings());
  }, []);

  useEffect(() => {
    storage.saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    storage.saveGroups(groups);
  }, [groups]);

  useEffect(() => {
    storage.saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(prevTasks => {
        const updatedTasks = prevTasks.map(task => {
          if (task.isRunning && task.lastStartTime) {
            const elapsed = Math.floor((Date.now() - task.lastStartTime) / 1000);
            return {
              ...task,
              timeSpent: task.timeSpent + elapsed,
              lastStartTime: Date.now(),
            };
          }
          return task;
        });
        return updatedTasks;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const runningTask = tasks.find(t => t.isRunning);
    if (runningTask && settings.tabNotification) {
      const elapsed = runningTask.lastStartTime
        ? Math.floor((Date.now() - runningTask.lastStartTime) / 1000)
        : 0;
      const totalSeconds = runningTask.timeSpent + elapsed;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      document.title = `⏱ ${minutes}:${seconds.toString().padStart(2, '0')} - ${runningTask.title}`;
    } else {
      document.title = originalTitle;
    }
  }, [tasks, settings.tabNotification, originalTitle]);

  const addTask = useCallback((title: string, groupId?: string, parentId?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
      timeSpent: 0,
      isRunning: false,
      groupId,
      parentId,
      expanded: true,
    };
    setTasks(prev => [...prev, newTask]);
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => task.id === id ? { ...task, ...updates } : task));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id && task.parentId !== id));
  }, []);

  const toggleTaskTimer = useCallback((id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        if (task.isRunning) {
          if (settings.bellSound) {
            playBellSound();
          }
          return {
            ...task,
            isRunning: false,
            lastStartTime: undefined,
          };
        } else {
          return {
            ...task,
            isRunning: true,
            lastStartTime: Date.now(),
          };
        }
      } else if (task.isRunning) {
        return {
          ...task,
          isRunning: false,
          lastStartTime: undefined,
        };
      }
      return task;
    }));
  }, [settings.bellSound]);

  const toggleTaskComplete = useCallback((id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const completed = !task.completed;
        return {
          ...task,
          completed,
          completedAt: completed ? Date.now() : undefined,
          isRunning: false,
          lastStartTime: undefined,
        };
      }
      return task;
    }));
  }, []);

  const addGroup = useCallback((name: string, color: string) => {
    const newGroup: TaskGroup = {
      id: crypto.randomUUID(),
      name,
      color,
      expanded: true,
    };
    setGroups(prev => [...prev, newGroup]);
  }, []);

  const updateGroup = useCallback((id: string, updates: Partial<TaskGroup>) => {
    setGroups(prev => prev.map(group => group.id === id ? { ...group, ...updates } : group));
  }, []);

  const deleteGroup = useCallback((id: string) => {
    setGroups(prev => prev.filter(group => group.id !== id));
    setTasks(prev => prev.map(task => task.groupId === id ? { ...task, groupId: undefined } : task));
  }, []);

  const clearCache = useCallback(() => {
    storage.clearAll();
    setTasks([]);
    setGroups([]);
    setSettings(defaultSettings);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  return {
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
  };
};
