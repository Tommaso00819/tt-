import { LucideIcon } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';

interface TabButtonProps {
  value: string;
  icon: LucideIcon;
  label: string;
  gradientActive: string;
  colorInactive: string;
}

export function TabButton({ value, icon: Icon, label, gradientActive, colorInactive }: TabButtonProps) {
  return (
    <Tabs.Trigger
      value={value}
      className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all hover:opacity-80 data-[state=active]:shadow-md"
      style={{
        background: 'transparent',
        color: colorInactive
      }}
      data-gradient={gradientActive}
      onMouseEnter={(e) => {
        const trigger = e.currentTarget;
        if (trigger.getAttribute('data-state') === 'active') {
          trigger.style.background = trigger.getAttribute('data-gradient') || '';
          trigger.style.color = '#FFFFFF';
        }
      }}
      ref={(el) => {
        if (el) {
          const updateStyle = () => {
            const isActive = el.getAttribute('data-state') === 'active';
            if (isActive) {
              el.style.background = el.getAttribute('data-gradient') || '';
              el.style.color = '#FFFFFF';
            } else {
              el.style.background = 'transparent';
              el.style.color = colorInactive;
              el.style.boxShadow = 'none';
            }
          };

          updateStyle();

          const observer = new MutationObserver(updateStyle);
          observer.observe(el, { attributes: true, attributeFilter: ['data-state'] });

          return () => observer.disconnect();
        }
      }}
    >
      <Icon className="w-4 h-4" />
      <span className="hidden sm:inline">{label}</span>
    </Tabs.Trigger>
  );
}
