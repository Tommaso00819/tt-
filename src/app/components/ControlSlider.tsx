import { Slider } from '@radix-ui/react-slider';
import { LucideIcon } from 'lucide-react';

interface ControlSliderProps {
  label: string;
  icon: LucideIcon;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  color?: 'warm' | 'cool' | 'motion';
}

export function ControlSlider({
  label,
  icon: Icon,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '%',
  color = 'warm'
}: ControlSliderProps) {
  const colorStyles = {
    warm: {
      iconBg: 'linear-gradient(135deg, #FEDA7C 0%, #E36C1A 100%)',
      badgeBg: 'linear-gradient(135deg, #E54312 0%, #E36C1A 100%)',
      trackBg: 'linear-gradient(90deg, #FEDA7C 0%, #E36C1A 100%)',
      borderColor: '#E36C1A',
      ringColor: '#FEDA7C'
    },
    cool: {
      iconBg: 'linear-gradient(135deg, #7EB6A9 0%, #192C32 100%)',
      badgeBg: 'linear-gradient(135deg, #192C32 0%, #7EB6A9 100%)',
      trackBg: 'linear-gradient(90deg, #7EB6A9 0%, #192C32 100%)',
      borderColor: '#7EB6A9',
      ringColor: '#7EB6A9'
    },
    motion: {
      iconBg: 'linear-gradient(135deg, #7EB6A9 0%, #192C32 100%)',
      badgeBg: 'linear-gradient(135deg, #7EB6A9 0%, #E36C1A 100%)',
      trackBg: 'linear-gradient(90deg, #7EB6A9 0%, #E36C1A 100%)',
      borderColor: '#7EB6A9',
      ringColor: '#E36C1A'
    }
  };

  const style = colorStyles[color];

  return (
    <div className="p-5 bg-white rounded-xl border-2 shadow-sm hover:shadow-md transition-shadow" style={{ borderColor: style.borderColor }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg" style={{ background: style.iconBg }}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <span className="text-sm font-semibold" style={{ color: '#192C32' }}>{label}</span>
        </div>
        <div className="px-3 py-1.5 rounded-full" style={{ background: style.badgeBg }}>
          <span className="text-sm font-bold text-white">
            {value}{unit}
          </span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        min={min}
        max={max}
        step={step}
        className="relative flex items-center w-full h-5"
      >
        <div className="relative h-3 w-full rounded-full overflow-hidden shadow-inner" style={{ backgroundColor: '#E5E7EB' }}>
          <div
            className="absolute h-full rounded-full transition-all"
            style={{
              width: `${((value - min) / (max - min)) * 100}%`,
              background: style.trackBg
            }}
          />
        </div>
        <div
          className="block w-6 h-6 bg-white rounded-full shadow-lg cursor-pointer hover:scale-125 transition-transform ring-4"
          style={{
            position: 'absolute',
            left: `calc(${((value - min) / (max - min)) * 100}% - 12px)`,
            borderWidth: '3px',
            borderColor: style.borderColor,
            ringColor: style.ringColor + '30'
          }}
        />
      </Slider>
    </div>
  );
}
