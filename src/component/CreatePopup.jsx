'use client';
import React, { useState } from "react";
import { FileImage, X } from "lucide-react";

import CreateNewPost from "./CreateNewPost";

const CreatePostPopup = ({ onClose }) => {


    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [NewPost, setNewPost] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // ✅ for preview
            setSelectedFile(file);                       // ✅ for upload
            setNewPost(true);
          }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 text-center relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <X className="w-5 h-5" />
                </button>

                {!NewPost ? (
                    <>
                        <h2 className="text-lg font-semibold mb-6">Create new post</h2>
                        <div className="flex flex-col items-center gap-4">
                            <FileImage className="w-16 h-16 text-gray-400" />
                            <p className="text-sm text-gray-500">Drag photos and videos here</p>
                          
                            <input
        type="file"
        accept="image/*"
      
        onChange={handleFileChange}
        className="cursor-pointer block border border-gray-300 px-4 py-2 rounded"
      />

                           

                        </div>
                    </>
                ) : (
                    <CreateNewPost image={selectedImage} file={selectedFile} o  onClose={() => setNewPost(false)}/>
                )}
            </div>
        </div>
    );
};

export default CreatePostPopup;
