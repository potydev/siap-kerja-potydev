import { Button } from '@/components/ui/button';

interface NavbarProps {
  onStartBuilding: () => void;
}

export const Navbar = ({ onStartBuilding }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img 
              src="/logo-poty.png" 
              alt="SiapKerja Logo" 
              className="w-9 h-9 rounded-lg object-cover"
            />
            <span className="font-bold text-xl text-foreground">SiapKerja</span>
          </div>

          {/* CTA */}
          <Button variant="hero" size="sm" onClick={onStartBuilding}>
            Buat CV
          </Button>
        </div>
      </div>
    </nav>
  );
};
