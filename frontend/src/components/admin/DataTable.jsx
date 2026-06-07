import { HiOutlinePencil, HiOutlineTrash, HiOutlineEye } from 'react-icons/hi';

export default function DataTable({ columns, data, onEdit, onDelete, onView, loading }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-dark-700">
            {columns.map((col) => (
              <th key={col.key} className="text-left py-3 px-4 text-dark-400 font-medium">
                {col.label}
              </th>
            ))}
            {(onEdit || onDelete || onView) && (
              <th className="text-right py-3 px-4 text-dark-400 font-medium">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-12 text-dark-400">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-12 text-dark-400">
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={row._id || idx} className="border-b border-dark-700/50 hover:bg-dark-700/30 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-4 text-white">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {(onEdit || onDelete || onView) && (
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {onView && (
                        <button onClick={() => onView(row)} className="p-2 text-dark-400 hover:text-gym-400 transition-colors" title="View">
                          <HiOutlineEye className="text-lg" />
                        </button>
                      )}
                      {onEdit && (
                        <button onClick={() => onEdit(row)} className="p-2 text-dark-400 hover:text-blue-400 transition-colors" title="Edit">
                          <HiOutlinePencil className="text-lg" />
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)} className="p-2 text-dark-400 hover:text-red-400 transition-colors" title="Delete">
                          <HiOutlineTrash className="text-lg" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
