import React from "react";

import { Tenant } from "../../types";
import {
  X,
  AlertCircle,
} from "lucide-react";

// 配额充值抽屉
export const QuotaDrawer = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-xl text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-8 space-y-8">{children}</div>
        <div className="p-8 border-t border-slate-100 bg-slate-50 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            取消
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            确认保存
          </button>
        </div>
      </div>
    </div>
  );
};

// 点数调整抽屉 (配额管理页专用)
export const QuotaAdjustDrawer = ({
  isOpen,
  onClose,
  activeTenant,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeTenant: Tenant | null;
}) => {
  return (
    <QuotaDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={`点数调整: ${activeTenant?.name || ""}`}
    >
      <div className="space-y-8">
        <div className="p-6 bg-indigo-50 rounded-3xl">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">
            当前剩余点数
          </p>
          <h5 className="text-3xl font-black text-indigo-900">
            {(
              (activeTenant?.quotaTotal || 0) - (activeTenant?.quotaUsed || 0)
            ).toLocaleString()}{" "}
            <span className="text-sm font-bold opacity-60 ml-1">点</span>
          </h5>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            增加点数额度
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[100, 500, 1000, 5000].map((val) => (
              <button
                key={val}
                className="py-4 border border-slate-100 rounded-2xl text-sm font-black hover:border-indigo-600 hover:bg-indigo-50 transition-all"
              >
                +{val} 点
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
            手动输入点数
          </label>
          <input
            type="number"
            placeholder="请输入数值"
            className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold"
          />
        </div>
        <div className="p-6 bg-amber-50 rounded-3xl flex gap-4 border border-amber-100">
          <AlertCircle className="text-amber-500 shrink-0" size={20} />
          <p className="text-xs font-bold text-amber-800 leading-relaxed">
            点数增加将立即反映在租户账户。该操作作为“管理员手动充值点数”记录在流水中。
          </p>
        </div>
      </div>
    </QuotaDrawer>
  );
};
