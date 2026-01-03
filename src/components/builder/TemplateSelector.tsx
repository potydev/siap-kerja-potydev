import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface TemplateOption {
  id: 'minimalist' | 'modern' | 'creative';
  name: string;
  description: string;
  color: string;
  accent: string;
}

const templates: TemplateOption[] = [
  {
    id: 'minimalist',
    name: 'Minimalist',
    description: 'Bersih & simpel untuk semua industri',
    color: 'bg-slate-50',
    accent: 'bg-slate-700',
  },
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Profesional dengan aksen biru',
    color: 'bg-blue-50',
    accent: 'bg-blue-600',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unik untuk industri kreatif',
    color: 'bg-violet-50',
    accent: 'bg-violet-600',
  },
];

interface TemplateSelectorProps {
  selected: 'minimalist' | 'modern' | 'creative';
  onChange: (template: 'minimalist' | 'modern' | 'creative') => void;
}

export const TemplateSelector = ({ selected, onChange }: TemplateSelectorProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {templates.map((template) => (
        <button
          key={template.id}
          onClick={() => onChange(template.id)}
          className={cn(
            "relative rounded-xl p-3 text-left transition-all duration-200",
            selected === template.id
              ? "ring-2 ring-primary bg-accent"
              : "bg-muted hover:bg-accent/50"
          )}
        >
          {selected === template.id && (
            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check className="w-3 h-3 text-primary-foreground" />
            </div>
          )}
          
          {/* Mini preview */}
          <div className={cn("aspect-[3/4] rounded-lg mb-2", template.color)}>
            <div className="p-2 h-full">
              <div className={cn("w-4 h-4 rounded-full mb-1", template.accent)} />
              <div className={cn("h-1 rounded mb-1 w-3/4", template.accent)} />
              <div className="h-0.5 rounded mb-0.5 w-full bg-gray-300" />
              <div className="h-0.5 rounded w-2/3 bg-gray-300" />
            </div>
          </div>
          
          <p className="text-xs font-semibold text-foreground">{template.name}</p>
          <p className="text-xs text-muted-foreground truncate">{template.description}</p>
        </button>
      ))}
    </div>
  );
};
