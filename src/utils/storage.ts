import { Task, TaskGroup, Settings, Theme } from '../types';

const STORAGE_KEYS = {
  TASKS: 'taskManager_tasks',
  GROUPS: 'taskManager_groups',
  SETTINGS: 'taskManager_settings',
};

export const defaultTheme: Theme = {
  primary: '#2563eb',
  secondary: '#64748b',
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#0f172a',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  success: '#10b981',
  error: '#ef4444',
};

export const defaultSettings: Settings = {
  bellSound: false,
  tabNotification: true,
  theme: defaultTheme,
};

export const storage = {
  getTasks: (): Task[] => {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    return data ? JSON.parse(data) : [];
  },

  saveTasks: (tasks: Task[]): void => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  },

  getGroups: (): TaskGroup[] => {
    const data = localStorage.getItem(STORAGE_KEYS.GROUPS);
    return data ? JSON.parse(data) : [];
  },

  saveGroups: (groups: TaskGroup[]): void => {
    localStorage.setItem(STORAGE_KEYS.GROUPS, JSON.stringify(groups));
  },

  getSettings: (): Settings => {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? JSON.parse(data) : defaultSettings;
  },

  saveSettings: (settings: Settings): void => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  },

  clearAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
};
