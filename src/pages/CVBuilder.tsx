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
import { ArrowLeft, ArrowRight, Download, Eye, EyeOff, RotateCcw } from 'lucide-react';
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
      
      // Get the actual CV template content (child of previewRef)
      const contentElement = element.firstElementChild as HTMLElement;
      if (!contentElement) {
        throw new Error('Content element not found');
      }

      // Create a temporary container for PDF generation (off-screen)
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'fixed';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '210mm';
      tempContainer.style.height = 'auto';
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.zIndex = '-1';
      tempContainer.style.overflow = 'visible';
      
      // Clone the content deeply
      const clone = contentElement.cloneNode(true) as HTMLElement;
      
      // Reset all transforms and set proper dimensions for the clone
      clone.style.transform = 'none !important';
      clone.style.width = '210mm';
      clone.style.maxWidth = '210mm';
      clone.style.minWidth = '210mm';
      clone.style.margin = '0';
      clone.style.padding = '0';
      clone.style.position = 'relative';
      clone.style.left = '0';
      clone.style.top = '0';
      clone.style.boxSizing = 'border-box';
      
      // Remove any transforms from all nested elements
      const allElements = clone.querySelectorAll('*');
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (htmlEl.style.transform && htmlEl.style.transform !== 'none') {
          htmlEl.style.transform = 'none';
        }
      });
      
      tempContainer.appendChild(clone);
      document.body.appendChild(tempContainer);

      // Wait for layout recalculation and images to load
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Calculate dimensions in pixels (1mm ≈ 3.779527559 pixels at 96 DPI)
      const mmToPx = 3.779527559;
      const widthPx = 210 * mmToPx;
      
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        width: widthPx,
        height: clone.scrollHeight,
        windowWidth: widthPx,
        windowHeight: clone.scrollHeight,
        onclone: (clonedDoc) => {
          // Ensure all styles are preserved and transforms removed in cloned document
          const clonedRoot = clonedDoc.body.firstElementChild as HTMLElement;
          if (clonedRoot) {
            clonedRoot.style.width = '210mm';
            clonedRoot.style.maxWidth = '210mm';
            clonedRoot.style.transform = 'none';
            clonedRoot.style.margin = '0';
            clonedRoot.style.padding = '0';
          }
          
          // Remove transforms from all elements in cloned document
          const allClonedElements = clonedDoc.querySelectorAll('*');
          allClonedElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            if (htmlEl.style.transform && htmlEl.style.transform !== 'none') {
              htmlEl.style.transform = 'none';
            }
          });
        },
      });

      // Remove temporary container
      document.body.removeChild(tempContainer);

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // A4 dimensions in mm
      const pdfWidth = 210;
      const pdfHeight = 297;
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      // If content is taller than one page, split into multiple pages
      if (imgHeight > pdfHeight) {
        let heightLeft = imgHeight;
        let position = 0;
        const pageHeight = pdfHeight;

        // Add first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Add additional pages if needed
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      }

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
                <img 
                  src="/logo-poty.png" 
                  alt="SiapKerja Logo" 
                  className="w-8 h-8 rounded-lg object-cover"
                />
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
