


export function Modal({ isOpen, onClose, item, onDelete }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg w-96 p-6 relative">

                {/* Modal content */}
                <p className="text-gray-600">
                    Are you sure you want to Delete
                </p>

                {/* Footer with buttons */}
                <div className="mt-12 flex justify-end">
                    {/* Delete Button */}
                    <button
                        className="hover:bg-slate-200 me-2 py-1 px-4 rounded-lg border"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg"
                        onClick={() => {
                            console.log(item);

                            onDelete(item?.id);
                            onClose();
                        }}
                    >
                        Delete
                    </button>

                    {/* Close Button */}

                </div>
            </div>
        </div>
    );
}
