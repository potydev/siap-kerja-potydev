import { Zap, Shield, Download, Palette, Clock, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Cepat & Mudah',
    description: 'Hanya butuh 5 menit untuk membuat CV profesional. Tanpa perlu keahlian desain.',
  },
  {
    icon: Shield,
    title: 'ATS-Friendly',
    description: 'CV Anda lolos sistem ATS yang digunakan perusahaan besar untuk menyaring kandidat.',
  },
  {
    icon: Download,
    title: 'Download PDF Gratis',
    description: 'Unduh CV Anda dalam format PDF berkualitas tinggi, siap cetak atau kirim online.',
  },
  {
    icon: Palette,
    title: '3 Template Profesional',
    description: 'Pilih dari template Minimalist, Modern, atau Creative sesuai kebutuhan Anda.',
  },
  {
    icon: Clock,
    title: 'Tersimpan Otomatis',
    description: 'Data Anda tersimpan otomatis. Lanjutkan kapan saja tanpa kehilangan progress.',
  },
  {
    icon: CheckCircle,
    title: 'Mudah Diedit',
    description: 'Edit dan perbarui CV Anda kapan saja sebelum mengunduh versi final.',
  },
];

export const Features = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
            Kenapa Pilih SiapKerja?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Platform CV generator yang dirancang khusus untuk pencari kerja Indonesia
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
