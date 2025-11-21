export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
  timeSpent: number;
  isRunning: boolean;
  lastStartTime?: number;
  parentId?: string;
  groupId?: string;
  expanded?: boolean;
}

export interface TaskGroup {
  id: string;
  name: string;
  color: string;
  expanded: boolean;
}

export interface Theme {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
}

export interface Settings {
  bellSound: boolean;
  tabNotification: boolean;
  theme: Theme;
}
