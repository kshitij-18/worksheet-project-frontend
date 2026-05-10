import { BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary-600 rounded-lg text-white">
            <BookOpen size={24} />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-900">
            Tuition Worksheet Pro
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">How it works</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Pricing</a>
          <a href="#" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Support</a>
        </nav>
        <div>
          <button className="px-4 py-2 text-sm font-semibold text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
