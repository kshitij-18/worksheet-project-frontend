import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Book, Layers, HelpCircle, FileDown, Loader2 } from 'lucide-react';
import { generateWorksheet, type WorksheetRequest } from '../api/client';
import { cn } from '../lib/utils';

const WorksheetForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<WorksheetRequest>({
    student_class: 9,
    subject: '',
    topics: [''],
    questions: ['Multiple Choice', 'Short Answer'],
  });

  const handleTopicChange = (index: number, value: string) => {
    const newTopics = [...formData.topics];
    newTopics[index] = value;
    setFormData({ ...formData, topics: newTopics });
  };

  const addTopic = () => {
    setFormData({ ...formData, topics: [...formData.topics, ''] });
  };

  const removeTopic = (index: number) => {
    const newTopics = formData.topics.filter((_, i) => i !== index);
    setFormData({ ...formData, topics: newTopics.length ? newTopics : [''] });
  };

  const toggleQuestionType = (type: string) => {
    const newQuestions = formData.questions.includes(type)
      ? formData.questions.filter((q) => q !== type)
      : [...formData.questions, type];
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const blob = await generateWorksheet({
        ...formData,
        topics: formData.topics.filter((t) => t.trim() !== ''),
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `worksheet_${formData.student_class}_${formData.subject}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error('Failed to generate worksheet:', error);
      alert('Something went wrong. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const questionOptions = [
    'Multiple Choice',
    'Short Answer',
    'Long Answer',
    'Word Problems',
    'Fill in the Blanks',
    'True/False',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-8 glass-card p-8 rounded-3xl">
        <div className="space-y-6">
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary-700">
              <GraduationCap size={20} />
              <h2 className="text-lg font-semibold">Student Information</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Class (1-12)</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.student_class}
                  onChange={(e) => setFormData({ ...formData, student_class: parseInt(e.target.value) })}
                  className="input-field"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Subject</label>
                <div className="relative">
                  <Book className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    type="text"
                    placeholder="e.g. Mathematics"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary-700">
              <Layers size={20} />
              <h2 className="text-lg font-semibold">Topics to Cover</h2>
            </div>
            <div className="space-y-3">
              {formData.topics.map((topic, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Topic ${index + 1}`}
                    value={topic}
                    onChange={(e) => handleTopicChange(index, e.target.value)}
                    className="input-field"
                    required
                  />
                  {formData.topics.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTopic(index)}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <span className="sr-only">Remove</span>
                      &times;
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addTopic}
                className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
              >
                + Add another topic
              </button>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary-700">
              <HelpCircle size={20} />
              <h2 className="text-lg font-semibold">Question Types</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {questionOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleQuestionType(option)}
                  className={cn(
                    "px-4 py-2 rounded-full border text-sm font-medium transition-all",
                    formData.questions.includes(option)
                      ? "bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-200"
                      : "bg-white border-slate-200 text-slate-600 hover:border-primary-300"
                  )}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full h-14"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Generating Worksheet...
            </>
          ) : (
            <>
              <FileDown size={20} />
              Generate & Download PDF
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default WorksheetForm;
