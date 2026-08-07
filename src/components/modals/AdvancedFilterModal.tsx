import { useState, useEffect } from "react";
import {
  Plus,
  X,
  Filter,
  Trash2,
} from "lucide-react";

// ==========================================
// --- 组件: Advanced Filter Modal (多维表格筛选) ---
// ==========================================

export const AdvancedFilterModal = ({
  isOpen,
  onClose,
  onApply,
  initialConditions,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (conditions: any[]) => void;
  initialConditions: any[];
}) => {
  const [conditions, setConditions] = useState(initialConditions);

  // 初始化，如果没有条件则默认添加一个
  useEffect(() => {
    if (isOpen && conditions.length === 0) {
      setConditions([
        {
          id: `fc-${Date.now()}`,
          field: "name",
          operator: "contains",
          value: "",
          logic: "and",
        },
      ]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        id: `fc-${Date.now()}`,
        field: "name",
        operator: "contains",
        value: "",
        logic: "and",
      },
    ]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter((c: any) => c.id !== id));
  };

  const updateCondition = (id: string, key: string, val: any) => {
    setConditions(
      conditions.map((c: any) => (c.id === id ? { ...c, [key]: val } : c))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-[640px] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <Filter size={20} className="text-indigo-600" /> 高级筛选器
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {conditions.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              暂无筛选条件，请添加
            </div>
          ) : (
            <div className="space-y-3">
              {conditions.map((cond, index) => (
                <div key={cond.id} className="flex items-center gap-2">
                  {/* 逻辑连接符 (第一行隐藏) */}
                  <div className="w-16 flex-shrink-0">
                    {index > 0 && (
                      <select
                        value={cond.logic}
                        onChange={(e) =>
                          updateCondition(cond.id, "logic", e.target.value)
                        }
                        className="w-full text-xs font-bold text-slate-600 bg-slate-100 border-none rounded py-1.5 px-1 focus:ring-2 focus:ring-indigo-100 outline-none"
                      >
                        <option value="and">且 (And)</option>
                        <option value="or">或 (Or)</option>
                      </select>
                    )}
                    {index === 0 && (
                      <div className="text-xs font-bold text-slate-400 text-center">
                        当
                      </div>
                    )}
                  </div>

                  {/* 字段选择 */}
                  <select
                    value={cond.field}
                    onChange={(e) =>
                      updateCondition(cond.id, "field", e.target.value)
                    }
                    className="w-32 text-sm bg-white border border-slate-200 rounded-lg py-2 px-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  >
                    <option value="name">项目名称</option>
                    <option value="track">赛道</option>
                    <option value="tenant">所属租户</option>
                    <option value="revenue">营收 (数值)</option>
                    <option value="profit">利润 (数值)</option>
                    <option value="score">综合得分</option>
                  </select>

                  {/* 运算符选择 */}
                  <select
                    value={cond.operator}
                    onChange={(e) =>
                      updateCondition(cond.id, "operator", e.target.value)
                    }
                    className="w-24 text-sm bg-white border border-slate-200 rounded-lg py-2 px-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  >
                    <option value="eq">等于</option>
                    <option value="contains">包含</option>
                    <option value="not_contains">不包含</option>
                    <option value="gt">大于</option>
                    <option value="lt">小于</option>
                  </select>

                  {/* 值输入 */}
                  <input
                    type="text"
                    value={cond.value}
                    onChange={(e) =>
                      updateCondition(cond.id, "value", e.target.value)
                    }
                    placeholder="输入值..."
                    className="flex-1 text-sm bg-white border border-slate-200 rounded-lg py-2 px-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  />

                  {/* 删除按钮 */}
                  <button
                    onClick={() => removeCondition(cond.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={addCondition}
            className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus size={14} /> 添加条件
          </button>
        </div>
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all"
          >
            取消
          </button>
          <button
            onClick={() => {
              onApply(conditions);
              onClose();
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            应用筛选
          </button>
        </div>
      </div>
    </div>
  );
};
