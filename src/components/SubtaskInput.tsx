import { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface SubtaskInputProps {
  parentTaskTitle: string;
  onAdd: (title: string) => void;
  onCancel: () => void;
  theme: any;
}

export const SubtaskInput = ({
  parentTaskTitle,
  onAdd,
  onCancel,
  theme,
}: SubtaskInputProps) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
    }
  };

  return (
    <div
      className="rounded-lg p-3 border-2"
      style={{
        backgroundColor: theme.surface,
        borderColor: theme.primary,
        borderStyle: 'dashed',
      }}
    >
      <div className="text-xs mb-2" style={{ color: theme.textSecondary }}>
        Subtask of: <span style={{ color: theme.primary, fontWeight: 600 }}>{parentTaskTitle}</span>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter subtask..."
          className="flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-2 transition-all text-sm"
          style={{
            backgroundColor: theme.background,
            borderColor: theme.border,
            color: theme.text,
          }}
          autoFocus
        />
        <button
          type="submit"
          className="p-2 rounded transition-all hover:scale-110"
          style={{ backgroundColor: theme.primary, color: 'white' }}
          title="Add subtask"
        >
          <Plus size={18} />
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 rounded transition-all hover:scale-110"
          style={{ backgroundColor: theme.border, color: theme.text }}
          title="Cancel"
        >
          <X size={18} />
        </button>
      </form>
    </div>
  );
};
