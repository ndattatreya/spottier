import Filters from "./Filters";

export default function MobileFilters({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
            <p className="text-sm text-gray-600 mt-1">Refine your search</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close filters"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filters Content */}
        <div className="px-6 py-6">
          <Filters />
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 btn btn-secondary py-3 font-semibold rounded-lg"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="flex-1 btn btn-primary py-3 font-semibold rounded-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
