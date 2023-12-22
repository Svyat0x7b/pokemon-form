import React, { MouseEventHandler } from 'react';
import Close from './icons/close';
interface IModalProps {
    children: React.ReactNode;
    handleClose: MouseEventHandler;
}

const Modal: React.FC<IModalProps> = ({ children, handleClose }) => {
    return (
        <div className="fixed inset-0 overflow-y-auto bg-gray-800 bg-opacity-50 backdrop-blur-lg">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                    <div className="flex justify-between">
                        <h1 className="text-[32px]">Your team</h1>
                        <button onClick={handleClose}>
                            <Close width="20px" height="20px" />
                        </button>
                    </div>
                    <div>{children}</div>
                    <div>
                        <div className="flex justify-end gap-5 mt-6">
                            <button
                                onClick={handleClose}
                                className="font-bold p-[10px] rounded-lg hover:bg-slate-300">
                                Cancel
                            </button>
                            <button className="bg-[#0045cf] text-white font-bold p-[10px] rounded-lg bg- hover:bg-sky-500">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
