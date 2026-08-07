import { useEffect, useState } from "react";
import { ChevronDown, RotateCcw, Settings, Sparkles } from "lucide-react";

import { DEFAULT_BRAND } from "../../lib/brand";
import { BrandConfig } from "../../types";

// ==========================================
// --- 集成控制器：改园区 / 平台品牌名 ---
// ==========================================

export const BrandController = ({
  brand,
  onApply,
}: {
  brand: BrandConfig;
  onApply: (brand: BrandConfig) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<BrandConfig>(brand);

  // 外部（如恢复默认）改动品牌名时，同步回草稿
  useEffect(() => {
    setDraft(brand);
  }, [brand]);

  const isDirty =
    draft.platformName !== brand.platformName ||
    draft.parkName !== brand.parkName;

  const handleApply = () => {
    onApply({
      // 留空就回落到默认值，避免出现没有名字的空白标题
      platformName: draft.platformName.trim() || DEFAULT_BRAND.platformName,
      parkName: draft.parkName.trim() || DEFAULT_BRAND.parkName,
    });
  };

  const handleReset = () => {
    setDraft(DEFAULT_BRAND);
    onApply(DEFAULT_BRAND);
  };

  // 收起状态：左下角一个小胶囊按钮
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-700 hover:bg-slate-800 transition-all text-xs font-bold"
        title="修改平台名 / 园区名"
      >
        <Settings size={14} />
        集成控制器
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 w-[460px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
      {/* 标题栏 */}
      <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-400" />
          <span className="text-sm font-black">集成控制器</span>
          <span className="text-[10px] text-slate-400 font-medium">
            品牌名一处修改，全站生效
          </span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors"
          title="收起"
        >
          <ChevronDown size={18} />
        </button>
      </div>

      {/* 两列表单 */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              平台名称
            </label>
            <input
              type="text"
              value={draft.platformName}
              onChange={(e) =>
                setDraft({ ...draft, platformName: e.target.value })
              }
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              placeholder={DEFAULT_BRAND.platformName}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
            <p className="text-[10px] text-slate-400">侧边栏顶部标题</p>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              园区名称
            </label>
            <input
              type="text"
              value={draft.parkName}
              onChange={(e) => setDraft({ ...draft, parkName: e.target.value })}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              placeholder={DEFAULT_BRAND.parkName}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
            <p className="text-[10px] text-slate-400">
              租户视角的身份标识与顶栏
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RotateCcw size={13} />
            恢复默认
          </button>
          <button
            onClick={handleApply}
            disabled={!isDirty}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              isDirty
                ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            应用
          </button>
        </div>
      </div>
    </div>
  );
};
