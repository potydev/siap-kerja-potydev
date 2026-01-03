import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { StepperProgress } from '@/components/builder/StepperProgress';
import { TemplateSelector } from '@/components/builder/TemplateSelector';
import { PersonalDataStep } from '@/components/builder/steps/PersonalDataStep';
import { ProfileStep } from '@/components/builder/steps/ProfileStep';
import { EducationStep } from '@/components/builder/steps/EducationStep';
import { ExperienceStep } from '@/components/builder/steps/ExperienceStep';
import { SkillsStep } from '@/components/builder/steps/SkillsStep';
import { CertificateStep } from '@/components/builder/steps/CertificateStep';
import { CVPreview } from '@/components/templates/CVPreview';
import { useCVData } from '@/hooks/useCVData';
import { ArrowLeft, ArrowRight, Download, Eye, EyeOff, FileText, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CVBuilder = () => {
  const navigate = useNavigate();
  const { cvData, updateCVData, resetCVData } = useCVData();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const generatePDF = async () => {
    if (!previewRef.current) return;

    setIsGenerating(true);
    toast.loading('Membuat PDF...');

    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      const fileName = cvData.personalData.namaLengkap
        ? `CV_${cvData.personalData.namaLengkap.replace(/\s+/g, '_')}_SiapKerja.pdf`
        : 'CV_SiapKerja.pdf';

      pdf.save(fileName);
      toast.dismiss();
      toast.success('CV berhasil didownload!');
    } catch (error) {
      toast.dismiss();
      toast.error('Gagal membuat PDF. Silakan coba lagi.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    if (confirm('Yakin ingin reset semua data? Data yang sudah diisi akan hilang.')) {
      resetCVData();
      setCurrentStep(1);
      toast.success('Data berhasil direset');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalDataStep
            data={cvData.personalData}
            onChange={(data) => updateCVData({ personalData: data })}
          />
        );
      case 2:
        return (
          <ProfileStep
            data={cvData.profilSingkat}
            onChange={(data) => updateCVData({ profilSingkat: data })}
          />
        );
      case 3:
        return (
          <EducationStep
            data={cvData.pendidikan}
            onChange={(data) => updateCVData({ pendidikan: data })}
          />
        );
      case 4:
        return (
          <ExperienceStep
            data={cvData.pengalaman}
            onChange={(data) => updateCVData({ pengalaman: data })}
          />
        );
      case 5:
        return (
          <SkillsStep
            data={cvData.skills}
            onChange={(data) => updateCVData({ skills: data })}
          />
        );
      case 6:
        return (
          <CertificateStep
            data={cvData.sertifikat}
            onChange={(data) => updateCVData({ sertifikat: data })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <FileText className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground hidden sm:inline">SiapKerja</span>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="md:hidden"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button
                variant="hero"
                size="sm"
                onClick={generatePDF}
                disabled={isGenerating}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="container py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form section */}
          <div className={showPreview ? 'hidden md:block' : ''}>
            <div className="bg-card rounded-2xl shadow-card p-6">
              {/* Stepper */}
              <StepperProgress currentStep={currentStep} onStepClick={handleStepClick} />

              {/* Template selector (always visible) */}
              <div className="mb-6 pt-4 border-t border-border">
                <p className="text-sm font-medium text-foreground mb-3">Pilih Template:</p>
                <TemplateSelector
                  selected={cvData.template}
                  onChange={(template) => updateCVData({ template })}
                />
              </div>

              {/* Step content */}
              <div className="min-h-[400px]">
                {renderStep()}
              </div>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Sebelumnya
                </Button>

                {currentStep === totalSteps ? (
                  <Button variant="hero" onClick={generatePDF} disabled={isGenerating}>
                    <Download className="w-4 h-4" />
                    Download CV
                  </Button>
                ) : (
                  <Button onClick={handleNext}>
                    Selanjutnya
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Preview section */}
          <div className={!showPreview ? 'hidden md:block' : ''}>
            <div className="sticky top-24">
              <div className="bg-card rounded-2xl shadow-card p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-foreground">Preview CV</h3>
                  <span className="text-xs text-muted-foreground">Live preview</span>
                </div>
                <div
                  className="overflow-auto max-h-[calc(100vh-200px)] rounded-lg border border-border"
                  style={{ transform: 'scale(0.6)', transformOrigin: 'top left', width: '166.67%', height: 'auto' }}
                >
                  <div ref={previewRef}>
                    <CVPreview data={cvData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile preview toggle */}
      <div className="fixed bottom-4 right-4 md:hidden">
        <Button
          variant="hero"
          size="lg"
          onClick={() => setShowPreview(!showPreview)}
          className="rounded-full shadow-lg"
        >
          {showPreview ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
};

export default CVBuilder;
