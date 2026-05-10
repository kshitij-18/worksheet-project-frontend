import Header from './components/Header';
import WorksheetForm from './components/WorksheetForm';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-semibold">
              <Sparkles size={16} />
              <span>AI-Powered Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 leading-tight">
              Create Custom <br />
              <span className="text-primary-600">Worksheets</span> in Seconds
            </h1>
            
            <p className="text-xl text-slate-600 max-w-lg">
              Empower your teaching with personalized worksheets. Our AI scans the latest educational content to create high-quality materials for your students.
            </p>
            
            <ul className="space-y-4">
              {[
                'Aligned with modern curriculum standards',
                'Multiple question formats available',
                'Instant PDF generation and download',
                'Customizable topics for any subject'
              ].map((text, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <CheckCircle2 className="text-primary-500" size={20} />
                  <span className="font-medium">{text}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden">
                    <img 
                      src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                      alt="User avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <p className="font-bold text-slate-900">5,000+ Teachers</p>
                <p className="text-slate-500">trust our platform</p>
              </div>
            </div>
          </motion.div>

          <WorksheetForm />
        </div>
      </main>

      <footer className="border-t bg-white py-12">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Tuition Worksheet Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
