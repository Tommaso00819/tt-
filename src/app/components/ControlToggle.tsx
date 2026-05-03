import { Switch } from '@radix-ui/react-switch';
import { LucideIcon } from 'lucide-react';

interface ControlToggleProps {
  label: string;
  icon: LucideIcon;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  description?: string;
}

export function ControlToggle({
  label,
  icon: Icon,
  enabled,
  onChange,
  description
}: ControlToggleProps) {
  return (
    <div className="p-4 bg-slate-800 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${enabled ? 'bg-blue-500/20' : 'bg-slate-700'}`}>
            <Icon className={`w-5 h-5 ${enabled ? 'text-blue-400' : 'text-slate-400'}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{label}</p>
            {description && (
              <p className="text-xs text-slate-400">{description}</p>
            )}
          </div>
        </div>
        <Switch
          checked={enabled}
          onCheckedChange={onChange}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? 'bg-blue-500' : 'bg-slate-600'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </Switch>
      </div>
    </div>
  );
}
