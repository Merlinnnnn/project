import { useState } from 'react';
import { Plus } from 'lucide-react';
import { TaskGroup } from '../types';

interface AddTaskFormProps {
  groups: TaskGroup[];
  onAdd: (title: string, groupId?: string) => void;
  theme: any;
}

export const AddTaskForm = ({ groups, onAdd, theme }: AddTaskFormProps) => {
  const [title, setTitle] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), selectedGroup || undefined);
      setTitle('');
      setSelectedGroup('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task..."
        className="flex-1 px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all"
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.primary,
          color: theme.text,
        }}
      />
      <select
        value={selectedGroup}
        onChange={(e) => setSelectedGroup(e.target.value)}
        className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all appearance-none"
        style={{
          backgroundColor: theme.surface,
          borderColor: theme.primary,
          color: theme.text,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='${encodeURIComponent(theme.text)}' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
          paddingRight: '36px',
        }}
      >
        <option value="">No Group</option>
        {groups.map(group => (
          <option key={group.id} value={group.id}>{group.name}</option>
        ))}
      </select>
      <button
        type="submit"
        className="px-6 py-3 rounded-lg text-white font-medium transition-all hover:shadow-lg"
        style={{ backgroundColor: theme.primary }}
      >
        <Plus size={20} />
      </button>
    </form>
  );
};
