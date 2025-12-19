import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

export default function ContributorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-gray-900">Contributors</h1>
        <p className="text-gray-600 mt-2">
          View and manage contributors from your synced GitHub repositories.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
        <FontAwesomeIcon icon={faUsers} className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-gray-900 mb-2">Contributors Page</h2>
        <p className="text-gray-600">Coming soon...</p>
      </div>
    </div>
  );
}

