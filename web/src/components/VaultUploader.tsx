import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, XCircle, Loader2 } from 'lucide-react';

// Define the shape of our file items
interface FileItem {
    id: string;
    name: string;
    status: 'uploading' | 'success' | 'error';
    url?: string;
}

export default function VaultUploader({ subAccountId, onUploadComplete }: { subAccountId: string, onUploadComplete?: (url: string) => void }) {
    const [files, setFiles] = useState<FileItem[]>([]);

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // 1. OPTIMISTIC UPDATE: Show files immediately as "Uploading"
        const newFileItems: FileItem[] = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substring(7), // Temp ID
            name: file.name,
            status: 'uploading'
        }));

        setFiles(prev => [...prev, ...newFileItems]);

        // 2. Process Uploads in Background
        for (let i = 0; i < acceptedFiles.length; i++) {
            const file = acceptedFiles[i];
            const fileItem = newFileItems[i];

            const formData = new FormData();
            formData.append("file", file);
            formData.append("subAccountId", subAccountId);


            const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
            try {
                const res = await fetch(`${BACKEND_URL}/api/wizard/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (!res.ok) throw new Error("Upload failed");

                const data = await res.json();

                // 3. Update Status to SUCCESS
                setFiles(prev => prev.map(f =>
                    f.id === fileItem.id ? { ...f, status: 'success', url: data.url } : f
                ));

                if (onUploadComplete) onUploadComplete(data.url);

            } catch (err) {
                console.error("Upload failed for", file.name);

                // 4. Update Status to ERROR (So user sees it failed)
                setFiles(prev => prev.map(f =>
                    f.id === fileItem.id ? { ...f, status: 'error' } : f
                ));
            }
        }
    }, [subAccountId, onUploadComplete]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="space-y-4">
            {/* The Drop Zone */}
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer outline-none
          ${isDragActive ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'}
        `}
            >
                <input {...getInputProps()} />
                <Upload className="w-10 h-10 text-slate-400 mb-3" />
                <p className="text-slate-300 font-medium">Drag & Drop files here</p>
                <p className="text-slate-500 text-sm mt-1">or click to browse</p>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    {files.map((f) => (
                        <div key={f.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${f.status === 'error' ? 'bg-red-900/20 border-red-800' : 'bg-slate-800/50 border-slate-700'
                            }`}>

                            {/* Icon Logic */}
                            {f.status === 'uploading' && <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />}
                            {f.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                            {f.status === 'error' && <XCircle className="w-4 h-4 text-red-500" />}

                            <span className={`text-sm flex-1 truncate ${f.status === 'error' ? 'text-red-300' : 'text-slate-300'}`}>
                                {f.name}
                            </span>

                            {f.status === 'error' && <span className="text-xs text-red-400 font-medium">Failed</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
