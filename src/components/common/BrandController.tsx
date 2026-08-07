import { useEffect, useState } from "react";
import { ChevronDown, RotateCcw, Sparkles } from "lucide-react";

import { useBrand } from "../../context/BrandContext";
import { DEFAULT_BRAND } from "../../lib/brand";
import { BrandConfig } from "../../types";

// ==========================================
// --- 集成控制器：改园区 / 平台品牌名 ---
// 入口在侧边栏底部（身份切换器下方），这里只负责面板本身。
// 状态全部走 BrandContext，不接收任何 props。
// ==========================================

export const BrandController = () => {
  const { brand, setBrand, resetBrand, isControllerOpen, closeController } =
    useBrand();
  const [draft, setDraft] = useState<BrandConfig>(brand);

  // 外部改动（恢复默认、其它标签页同步）时把草稿拉回来
  useEffect(() => {
    setDraft(brand);
  }, [brand]);

  const isDirty =
    draft.platformName !== brand.platformName ||
    draft.parkName !== brand.parkName;

  const handleApply = () => {
    setBrand({
      // 留空就回落到默认值，避免出现没有名字的空白标题
      platformName: draft.platformName.trim() || DEFAULT_BRAND.platformName,
      parkName: draft.parkName.trim() || DEFAULT_BRAND.parkName,
    });
  };

  // Esc 收起面板
  useEffect(() => {
    if (!isControllerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeController();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isControllerOpen, closeController]);

  if (!isControllerOpen) return null;

  return (
    <div className="fixed bottom-6 left-[19.5rem] z-40 w-[460px] max-w-[calc(100vw-21rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-2 duration-200">
      {/* 标题栏 */}
      <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-indigo-400" />
          <span className="text-sm font-black">集成控制器</span>
          <span className="text-[10px] text-slate-400 font-medium">
            品牌名一处修改，全站生效并自动保存
          </span>
        </div>
        <button
          onClick={closeController}
          className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 transition-colors"
          title="收起 (Esc)"
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
            onClick={resetBrand}
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
