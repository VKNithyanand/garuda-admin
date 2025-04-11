import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  delay?: number;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, delay = 0 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => {
    if (typeof value === 'number') {
      return Math.round(latest);
    }
    if (typeof value === 'string' && value.startsWith('$')) {
      return `$${Math.round(latest).toLocaleString()}`;
    }
    if (typeof value === 'string' && value.endsWith('%')) {
      return `${Math.round(latest)}%`;
    }
    return latest;
  });

  React.useEffect(() => {
    const numericValue = typeof value === 'string' ? 
      parseFloat(value.replace(/[^0-9.-]+/g, '')) : 
      value;

    const controls = animate(count, numericValue, {
      duration: 2,
      delay,
      ease: "easeOut"
    });

    return controls.stop;
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-indigo-600 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: delay + 0.5 }}
      />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <motion.h3 className="text-2xl font-bold mt-2 text-gray-900">
            {rounded}
          </motion.h3>
          {trend && (
            <div className="flex items-center mt-2">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: delay + 1 }}
                className={`flex items-center ${
                  trend > 0 ? 'text-green-500' : 'text-red-500'
                }`}
              >
                <span className="text-sm font-medium">
                  {trend > 0 ? '+' : ''}{trend}%
                </span>
                <svg
                  className={`w-4 h-4 ml-1 ${trend > 0 ? '' : 'transform rotate-180'}`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.5, delay: delay + 1.2 }}
                className="text-gray-400 text-xs ml-2"
              >
                vs last month
              </motion.span>
            </div>
          )}
        </div>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: delay + 0.3
          }}
          className="bg-indigo-100 p-3 rounded-lg"
        >
          <Icon className="w-6 h-6 text-indigo-600" />
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: delay + 0.7 }}
      />
    </motion.div>
  );
};