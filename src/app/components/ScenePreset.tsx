import { LucideIcon } from 'lucide-react';

interface ScenePresetProps {
  name: string;
  icon: LucideIcon;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

export function ScenePreset({ name, icon: Icon, description, isActive, onClick }: ScenePresetProps) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg border-2 transition-all text-left ${
        isActive
          ? 'bg-blue-500/20 border-blue-500'
          : 'bg-slate-800 border-slate-700 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-500' : 'bg-slate-700'}`}>
          <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
        </div>
        <div className="flex-1">
          <h3 className={`text-sm font-medium mb-1 ${isActive ? 'text-blue-400' : 'text-white'}`}>
            {name}
          </h3>
          <p className="text-xs text-slate-400">{description}</p>
        </div>
      </div>
    </button>
  );
}
