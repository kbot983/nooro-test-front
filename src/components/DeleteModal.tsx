interface DeleteModalProps {
  task: string;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  task,
  isOpen,
  onClose,
  onDelete,
}) => {
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div className="w-1/3 rounded-md bg-background p-4">
        <h2 className="mb-4 text-lg font-bold text-white">
          Are you sure you want to delete task?
        </h2>
        <p className="text-white">{task}</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="rounded-md px-4 py-2 text-white">
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="rounded-md bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
