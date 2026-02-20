export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  startTime?: number;
  endTime?: number;
}

const DEFAULT_CATEGORIES = [
  'Work',
  'Personal',
  'Study',
  'Health',
  'Shopping',
];

export const getTasks = (): Task[] =>
  JSON.parse(localStorage.getItem('tasks') || '[]');

export const saveTasks = (tasks: Task[]) =>
  localStorage.setItem('tasks', JSON.stringify(tasks));

export const getCategories = (): string[] => {
  const data = localStorage.getItem('categories');
  if (!data) localStorage.setItem('categories', JSON.stringify(DEFAULT_CATEGORIES));
  return JSON.parse(localStorage.getItem('categories')!);
};

export const saveCategories = (categories: string[]): void => {
  localStorage.setItem('categories', JSON.stringify(categories));
};
