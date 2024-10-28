// ConfirmationModal.jsx
import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg">
        <h3 className="text-lg font-bold">削除確認</h3>
        <p>本当に削除しますか？</p>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 rounded">キャンセル</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">削除する</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
