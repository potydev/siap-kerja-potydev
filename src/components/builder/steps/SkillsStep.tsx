import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Lightbulb } from 'lucide-react';

interface SkillsStepProps {
  data: string[];
  onChange: (data: string[]) => void;
}

const suggestedSkills = [
  'Microsoft Office', 'Microsoft Excel', 'Google Sheets', 'Canva',
  'Adobe Photoshop', 'Figma', 'JavaScript', 'Python',
  'Public Speaking', 'Leadership', 'Problem Solving', 'Teamwork',
  'Communication', 'Time Management', 'Critical Thinking', 'Adaptability',
  'Social Media Marketing', 'Content Writing', 'Data Analysis', 'SEO',
];

export const SkillsStep = ({ data, onChange }: SkillsStepProps) => {
  const [inputValue, setInputValue] = useState('');

  const addSkill = () => {
    const skill = inputValue.trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setInputValue('');
    }
  };

  const addSuggestedSkill = (skill: string) => {
    if (!data.includes(skill)) {
      onChange([...data, skill]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const availableSuggestions = suggestedSkills.filter(s => !data.includes(s));

  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Skill & Keahlian</h2>
        <p className="text-muted-foreground text-sm">
          Tambahkan skill teknis dan soft skill yang Anda kuasai
        </p>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Ketik skill dan tekan Enter"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={addSkill} disabled={!inputValue.trim()}>
          <Plus className="w-4 h-4" />
          Tambah
        </Button>
      </div>

      {/* Current skills */}
      {data.length > 0 && (
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Skill Anda:</p>
          <div className="flex flex-wrap gap-2">
            {data.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-3 py-1.5 text-sm flex items-center gap-1.5"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-1 hover:text-destructive transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      {availableSuggestions.length > 0 && (
        <div className="bg-accent rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-primary" />
            <p className="text-sm font-medium text-accent-foreground">Saran Skill Populer:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {availableSuggestions.slice(0, 12).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="px-3 py-1.5 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => addSuggestedSkill(skill)}
              >
                <Plus className="w-3 h-3 mr-1" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
