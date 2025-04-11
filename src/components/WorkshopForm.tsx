import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Workshop } from '../types/dashboard';
import { X } from 'lucide-react';

interface WorkshopFormProps {
  workshop?: Workshop;
  onSubmit: (workshop: Partial<Workshop>) => void;
}

export const WorkshopForm: React.FC<WorkshopFormProps> = ({ workshop, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: workshop?.title || '',
    summary: workshop?.summary || '',
    instructor: workshop?.instructor || '',
    category: workshop?.category || '',
    isPaid: workshop?.isPaid || false,
    price: workshop?.price || 0,
    liveSessionLink: workshop?.liveSessionLink || '',
    videoUrl: workshop?.videoUrl || ''
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const notification = toast.loading('Processing your request...', {
      style: {
        border: '1px solid #4F46E5',
        padding: '16px',
        color: '#1F2937',
      },
    });

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      toast.success(`Workshop ${workshop ? 'updated' : 'created'} successfully!`, {
        id: notification,
        style: {
          border: '1px solid #4F46E5',
          padding: '16px',
          color: '#1F2937',
        },
        iconTheme: {
          primary: '#4F46E5',
          secondary: '#FFFFFF',
        },
        duration: 3000,
      });
    }, 1000);
  };

  const formFields = [
    { name: 'title', label: 'Title', type: 'text', required: true },
    { name: 'category', label: 'Category', type: 'text', required: true },
    { name: 'summary', label: 'Summary', type: 'textarea', required: true },
    { name: 'instructor', label: 'Instructor', type: 'text', required: true },
    { name: 'liveSessionLink', label: 'Live Session Link', type: 'url' },
    { name: 'videoUrl', label: 'Video URL', type: 'url' },
  ];

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 relative"
    >
      <motion.div
        className="absolute -top-4 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field, index) => (
          <motion.div
            key={field.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={field.type === 'textarea' ? 'md:col-span-2' : ''}
          >
            <label className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <div className="mt-1 relative">
              {field.type === 'textarea' ? (
                <textarea
                  value={formData[field.name as keyof typeof formData] as string}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
                  rows={3}
                  required={field.required}
                />
              ) : (
                <input
                  type={field.type}
                  value={formData[field.name as keyof typeof formData] as string}
                  onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                  onFocus={() => setFocusedField(field.name)}
                  onBlur={() => setFocusedField(null)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition-all duration-200"
                  required={field.required}
                />
              )}
              <AnimatePresence>
                {focusedField === field.name && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-indigo-600"
                  >
                    <X size={16} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex items-center space-x-4 md:col-span-2"
      >
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.isPaid}
            onChange={(e) => setFormData({ ...formData, isPaid: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition duration-150"
          />
          <label className="ml-2 block text-sm text-gray-900">Paid Workshop</label>
        </div>

        <AnimatePresence>
          {formData.isPaid && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="flex-1"
            >
              <label className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150"
                min="0"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-gradient-to-r from-indigo-600 to-purple-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
        >
          {workshop ? 'Update Workshop' : 'Create Workshop'}
        </button>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1 }}
      />
    </motion.form>
  );
};