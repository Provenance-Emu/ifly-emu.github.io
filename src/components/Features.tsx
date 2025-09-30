import React from 'react';

interface FeaturesProps {
  compact?: boolean;
}

const Features: React.FC<FeaturesProps> = ({ compact = false }) => {
  const features = [
    {
      title: 'Dreamcast Games',
      description: 'Play classic Sega Dreamcast games on your iOS devices and Apple TV.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
    },
    {
      title: 'High Performance',
      description: 'Optimized for modern iOS devices with smooth gameplay and accurate emulation.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
    },
    {
      title: 'Controller Support',
      description: 'Full support for MFi controllers and touch controls for the best gaming experience.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
      ),
    },
    {
      title: 'Save States',
      description: 'Save and load your game progress anywhere with instant save states.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"/>
        </svg>
      ),
    },
    {
      title: 'Apple TV Support',
      description: 'Experience Dreamcast games on your big screen with Apple TV compatibility.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
    },
    {
      title: 'Multiple Formats',
      description: 'Support for CDI, GDI, CHD, and other Dreamcast ROM formats.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z"/>
        </svg>
      ),
    },
  ];

  const displayFeatures = compact ? features.slice(0, 3) : features;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {displayFeatures.map((feature, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center mb-4">
            <div className="text-orange-600 dark:text-orange-400 mr-3">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {feature.title}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Features;