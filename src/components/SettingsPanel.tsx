import { Settings as SettingsIcon, Bell, FileText, Palette, Trash2 } from 'lucide-react';
import { Settings, Theme } from '../types';
import { useState } from 'react';

interface SettingsPanelProps {
  settings: Settings;
  onUpdateSettings: (settings: Partial<Settings>) => void;
  onClearCache: () => void;
}

export const SettingsPanel = ({ settings, onUpdateSettings, onClearCache }: SettingsPanelProps) => {
  const [showPanel, setShowPanel] = useState(false);

  const handleThemeChange = (key: keyof Theme, value: string) => {
    onUpdateSettings({
      theme: {
        ...settings.theme,
        [key]: value,
      },
    });
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      onClearCache();
      setShowPanel(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="p-3 rounded-lg shadow-lg transition-all hover:scale-110"
        style={{ backgroundColor: settings.theme.primary, color: 'white' }}
      >
        <SettingsIcon size={24} />
      </button>

      {showPanel && (
        <div
          className="absolute top-16 right-0 w-96 rounded-lg shadow-2xl p-6 max-h-[80vh] overflow-y-auto"
          style={{ backgroundColor: settings.theme.surface, border: `1px solid ${settings.theme.border}` }}
        >
          <h2 className="text-xl font-bold mb-4" style={{ color: settings.theme.text }}>
            Settings
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Bell size={18} style={{ color: settings.theme.text }} />
                <h3 className="font-semibold" style={{ color: settings.theme.text }}>
                  Notifications
                </h3>
              </div>
              <label className="flex items-center gap-2 mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.bellSound}
                  onChange={(e) => onUpdateSettings({ bellSound: e.target.checked })}
                  className="w-4 h-4"
                />
                <span style={{ color: settings.theme.textSecondary }}>Bell sound when timer stops</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.tabNotification}
                  onChange={(e) => onUpdateSettings({ tabNotification: e.target.checked })}
                  className="w-4 h-4"
                />
                <span style={{ color: settings.theme.textSecondary }}>Show timer in tab title</span>
              </label>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Palette size={18} style={{ color: settings.theme.text }} />
                <h3 className="font-semibold" style={{ color: settings.theme.text }}>
                  Theme Colors
                </h3>
              </div>
              <div className="space-y-2">
                {Object.entries(settings.theme).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => handleThemeChange(key as keyof Theme, e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer"
                    />
                    <label className="text-sm capitalize" style={{ color: settings.theme.textSecondary }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Trash2 size={18} style={{ color: settings.theme.error }} />
                <h3 className="font-semibold" style={{ color: settings.theme.text }}>
                  Data Management
                </h3>
              </div>
              <button
                onClick={handleClearCache}
                className="w-full px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105"
                style={{ backgroundColor: settings.theme.error }}
              >
                Clear All Data
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowPanel(false)}
            className="w-full mt-6 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105"
            style={{ backgroundColor: settings.theme.border, color: settings.theme.text }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
