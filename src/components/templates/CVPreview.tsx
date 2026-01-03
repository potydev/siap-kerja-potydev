import { CVData } from '@/types/cv';
import { MinimalistTemplate } from './MinimalistTemplate';
import { ModernTemplate } from './ModernTemplate';
import { CreativeTemplate } from './CreativeTemplate';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = ({ data }: CVPreviewProps) => {
  switch (data.template) {
    case 'modern':
      return <ModernTemplate data={data} />;
    case 'creative':
      return <CreativeTemplate data={data} />;
    case 'minimalist':
    default:
      return <MinimalistTemplate data={data} />;
  }
};
