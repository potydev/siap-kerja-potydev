import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/landing/Navbar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { TemplatePreview } from '@/components/landing/TemplatePreview';
import { CTA } from '@/components/landing/CTA';
import { Footer } from '@/components/landing/Footer';

const Index = () => {
  const navigate = useNavigate();

  const handleStartBuilding = () => {
    navigate('/builder');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onStartBuilding={handleStartBuilding} />
      <Hero onStartBuilding={handleStartBuilding} />
      <Features />
      <TemplatePreview onStartBuilding={handleStartBuilding} />
      <CTA onStartBuilding={handleStartBuilding} />
      <Footer />
    </div>
  );
};

export default Index;
