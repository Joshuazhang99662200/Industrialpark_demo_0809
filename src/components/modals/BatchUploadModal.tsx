import React, { useState } from "react";
import {
  FileText,
  Download,
  X,
  Upload,
} from "lucide-react";

// ==========================================
// --- 组件: 批量上传模态框 ---
// ==========================================

export const BatchUploadModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    // 模拟上传逻辑
    alert(`准备上传 ${uploadedFiles.length} 个文件`);
    setUploadedFiles([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Upload size={24} className="text-indigo-600" />
              批量上传项目
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              支持 Excel (.xlsx, .xls)、CSV 等格式文件
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 拖放上传区域 */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              dragActive
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <Upload size={32} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 mb-1">
                  拖放文件到此处
                </p>
                <p className="text-sm text-slate-500">或点击下方按钮选择文件</p>
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <div className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transition-all">
                  选择文件
                </div>
              </label>
            </div>
          </div>

          {/* 上传模板下载 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FileText className="text-blue-600 shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <h4 className="font-bold text-blue-900 text-sm mb-1">
                  下载上传模板
                </h4>
                <p className="text-xs text-blue-700 mb-3">
                  首次上传？请先下载标准模板，按格式填写项目信息后上传
                </p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm">
                  <Download size={14} className="inline mr-1" />
                  下载 Excel 模板
                </button>
              </div>
            </div>
          </div>

          {/* 已选文件列表 */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText size={16} />
                已选择文件 ({uploadedFiles.length})
              </h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <FileText size={20} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <X size={16} className="text-slate-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
          >
            取消
          </button>
          <button
            onClick={handleUpload}
            disabled={uploadedFiles.length === 0}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              uploadedFiles.length > 0
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            开始上传 ({uploadedFiles.length})
          </button>
        </div>
      </div>
    </div>
  );
};
