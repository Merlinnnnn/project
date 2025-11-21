import { useState } from 'react';
import { FolderPlus } from 'lucide-react';

interface AddGroupFormProps {
  onAdd: (name: string, color: string) => void;
  theme: any;
}

const PRESET_COLORS = [
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#f59e0b',
  '#10b981',
  '#06b6d4',
  '#ef4444',
  '#6366f1',
];

export const AddGroupForm = ({ onAdd, theme }: AddGroupFormProps) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), color);
      setName('');
      setColor(PRESET_COLORS[0]);
      setShowForm(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="w-full px-4 py-3 rounded-lg border-2 border-dashed transition-all hover:scale-105 flex items-center justify-center gap-2"
        style={{ borderColor: theme.border, color: theme.textSecondary }}
      >
        <FolderPlus size={20} />
        <span>Add Group</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-4 rounded-lg border" style={{ borderColor: theme.border, backgroundColor: theme.surface }}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Group name..."
        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2"
        style={{
          backgroundColor: theme.background,
          borderColor: theme.border,
          color: theme.text,
        }}
        autoFocus
      />
      <div className="flex gap-2">
        {PRESET_COLORS.map(c => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className="w-8 h-8 rounded-full transition-all hover:scale-110"
            style={{
              backgroundColor: c,
              border: color === c ? '3px solid black' : 'none',
            }}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105"
          style={{ backgroundColor: theme.primary }}
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => {
            setShowForm(false);
            setName('');
            setColor(PRESET_COLORS[0]);
          }}
          className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
          style={{ backgroundColor: theme.border, color: theme.text }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
