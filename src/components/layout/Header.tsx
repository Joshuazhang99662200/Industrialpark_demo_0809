import {
  UserCircle,
  Zap,
} from "lucide-react";

export const Header = ({ activeTab, isAdmin, currentConfigName }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10 shrink-0">
      <div className="flex items-center gap-4">
        <h2 className="font-bold text-xl text-slate-800">
          {activeTab === "dashboard"
            ? "项目概览"
            : activeTab === "project_library"
            ? "项目库"
            : activeTab === "ecosystem_connect"
            ? "生态对接"
            : activeTab === "ecosystem_dashboard"
            ? "生态看板"
            : activeTab === "ecosystem_partners"
            ? "生态资源方"
            : activeTab === "financial_dashboard"
            ? "收入看板"
            : activeTab === "financial_transactions"
            ? "收入流水"
            : activeTab === "configs"
            ? "配置管理器"
            : activeTab === "orders"
            ? "点数订单"
            : activeTab === "tenants"
            ? "租户管理"
            : activeTab === "users"
            ? "用户管理"
            : activeTab === "quota"
            ? "配额管理"
            : "运营中心"}
        </h2>
      </div>

      {/* 项目库专属 Header 信息 */}
      {activeTab === "project_library" ? (
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              当前操作员
            </span>
            <span className="text-sm font-bold text-slate-900">
              {isAdmin ? "Admin_01" : "Tenant_User"}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              当前生效配置
            </span>
            <div className="flex items-center gap-1.5 text-indigo-600">
              <Zap size={12} fill="currentColor" />
              <span className="text-sm font-black">
                {currentConfigName}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              当前身份
            </p>
            <p className="text-sm font-bold text-slate-700">
              {isAdmin ? "超级管理员" : "云创未来产业园"}
            </p>
          </div>
          <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
            <UserCircle size={20} />
          </div>
        </div>
      )}
    </header>
  );
};
