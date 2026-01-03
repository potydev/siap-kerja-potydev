import { FileText } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">SiapKerja</span>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2025 SiapKerja. CV Siap, Kerja Makin Dekat.
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Tentang
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Bantuan
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privasi
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
