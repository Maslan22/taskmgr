import React from 'react';

interface ModalProps {
    title: string;
    message: string;
    onOk?: () => void;
    onCancel?: () => void;
    okText?: string;
    cancelText?: string;
    toggle: boolean;
}

const ModalTemplate: React.FC<ModalProps> = ({ title, message, onOk, onCancel, okText, cancelText, toggle }) => {
    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${toggle ? '' : 'hidden'}`}>
            <div className="bg-white rounded-lg p-6">
                <div className="flex justify-end">
                    <button aria-label="Close" className="px-2 py-1 text-gray-500" onClick={onCancel ? onCancel : undefined}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 1a9 9 0 100 18A9 9 0 0010 1zm4.95 12.95a.75.75 0 01-1.06 1.06L10 11.06l-3.89 3.89a.75.75 0 11-1.06-1.06L8.94 10 5.05 6.11a.75.75 0 111.06-1.06L10 8.94l3.89-3.89a.75.75 0 111.06 1.06L11.06 10l3.89 3.89z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={onOk ? onOk : undefined}>
                        {okText}
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onCancel ? onCancel : undefined}>
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalTemplate;