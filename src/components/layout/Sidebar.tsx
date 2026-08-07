import {
  LayoutGrid,
  ShoppingCart,
  Building2,
  Users,
  Layers,
  BarChart3,
  Sliders,
  Database,
  RotateCcw,
  LayoutDashboard,
  Handshake,
  Receipt,
  Network,
  Settings,
} from "lucide-react";

import { useBrand } from "../../context/BrandContext";
import { TabKey } from "../../types";

export const Sidebar = ({
  activeTab,
  onTabChange,
  isAdmin,
  onToggleRole,
}: {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  isAdmin: boolean;
  onToggleRole: () => void;
}) => {
  const { brand, openController } = useBrand();

  return (
  <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20 shrink-0">
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <LayoutGrid size={20} strokeWidth={2.5} />
        </div>
        <span className="font-bold text-lg tracking-tight">
          {brand.platformName}
        </span>
      </div>
      {/* 身份状态指示器 */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
        <div
          className={`w-2 h-2 rounded-full ${
            isAdmin ? "bg-indigo-500" : "bg-emerald-500"
          }`}
        />
        <span className="text-xs font-bold text-slate-300">
          {isAdmin ? "超级管理员 (Admin)" : brand.parkName}
        </span>
      </div>
    </div>

    <nav className="flex-1 px-4 overflow-y-auto space-y-8 pb-8 custom-scrollbar">
      {/* 1. 项目管理平台 */}
      <div>
        <div className="px-2 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          项目管理平台
        </div>
        <div className="space-y-1">
          <button
            onClick={() => onTabChange("dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "dashboard"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <LayoutDashboard size={18} />
            <span className="text-sm font-bold">项目概览</span>
          </button>
          <button
            onClick={() => onTabChange("project_library")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "project_library"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Database size={18} />
            <span className="text-sm font-bold">项目库</span>
          </button>
        </div>
      </div>

      {/* 2. 生态服务平台 */}
      <div>
        <div className="px-2 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          生态服务平台
        </div>
        <div className="space-y-1">
          <button
            onClick={() => onTabChange("ecosystem_dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "ecosystem_dashboard"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <LayoutGrid size={18} />
            <span className="text-sm font-bold">生态看板</span>
          </button>
          <button
            onClick={() => onTabChange("ecosystem_connect")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "ecosystem_connect"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Handshake size={18} />
            <span className="text-sm font-bold">生态对接</span>
          </button>
          {/* 仅管理员可见：生态资源方 */}
          {isAdmin && (
            <button
              onClick={() => onTabChange("ecosystem_partners")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === "ecosystem_partners"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Network size={18} />
              <span className="text-sm font-bold">生态资源方</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. 智能分润系统 */}
      <div>
        <div className="px-2 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          智能分润系统
        </div>
        <div className="space-y-1">
          <button
            onClick={() => onTabChange("financial_dashboard")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "financial_dashboard"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <BarChart3 size={18} />
            <span className="text-sm font-bold">收入看板</span>
          </button>
          <button
            onClick={() => onTabChange("financial_transactions")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "financial_transactions"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Receipt size={18} />
            <span className="text-sm font-bold">收入流水</span>
          </button>
        </div>
      </div>

      {/* 4. 基础运营 */}
      <div>
        <div className="px-2 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
          基础运营
        </div>
        <div className="space-y-1">
          <button
            onClick={() => onTabChange("configs")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "configs"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Sliders size={18} />
            <span className="text-sm font-bold">配置管理器</span>
          </button>
          <button
            onClick={() => onTabChange("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "orders"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <ShoppingCart size={18} />
            <span className="text-sm font-bold">点数订单</span>
          </button>
          {/* 仅管理员可见：租户管理 */}
          {isAdmin && (
            <button
              onClick={() => onTabChange("tenants")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === "tenants"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Building2 size={18} />
              <span className="text-sm font-bold">租户管理</span>
            </button>
          )}
          <button
            onClick={() => onTabChange("users")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "users"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Users size={18} />
            <span className="text-sm font-bold">用户管理</span>
          </button>
          <button
            onClick={() => onTabChange("quota")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === "quota"
                ? "bg-indigo-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Layers size={18} />
            <span className="text-sm font-bold">配额管理</span>
          </button>
        </div>
      </div>
    </nav>

    {/* 身份切换器 + 集成控制器入口 */}
    <div className="p-6 mt-auto border-t border-slate-800 space-y-2">
      <button
        onClick={onToggleRole}
        className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw size={14} />
        {isAdmin ? "切换至租户视角" : "切换至管理员视角"}
      </button>
      <button
        onClick={openController}
        title="修改平台名 / 园区名"
        className="w-full py-3 px-4 bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700/60 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
      >
        <Settings size={14} />
        集成控制器
      </button>
    </div>
  </aside>
  );
};
