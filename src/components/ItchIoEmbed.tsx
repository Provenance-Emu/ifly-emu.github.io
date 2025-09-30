import React from 'react';

const ItchIoEmbed: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Alternative Downloads
      </h3>
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Development builds and alternative download options will be available here soon.
        </p>
        <div className="bg-white dark:bg-gray-700 rounded border p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            itch.io embed placeholder - will be activated when builds are available
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItchIoEmbed;