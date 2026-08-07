import {
  Plus,
  X,
  CheckCircle2,
  TrendingUp,
  Wallet,
  AlertTriangle,
  User,
  Calendar,
  Phone,
  Network,
  Shield,
  Package,
} from "lucide-react";
import {
  ECOSYSTEM_PARTNERS,
  ECOSYSTEM_SERVICE_RECORDS,
} from "../data/ecosystem";

export const EcosystemPartnersPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 页面头部 */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-2xl font-black text-slate-900">
            生态资源方管理
          </h3>
          <p className="text-slate-500 mt-2">
            管理三个货架的生态服务提供方及其服务记录
          </p>
        </div>
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center gap-2">
          <Plus size={18} />
          新增资源方
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">合作资源方</div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {ECOSYSTEM_PARTNERS.length}
              </div>
            </div>
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
              <Network size={24} className="text-slate-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">活跃资源方</div>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {
                  ECOSYSTEM_PARTNERS.filter(
                    (p) => p.status === "active"
                  ).length
                }
              </div>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 size={24} className="text-emerald-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">不活跃资源方</div>
              <div className="text-2xl font-black text-amber-600 mt-1">
                {
                  ECOSYSTEM_PARTNERS.filter(
                    (p) => p.status === "inactive"
                  ).length
                }
              </div>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={24} className="text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">累计分润</div>
              <div className="text-2xl font-black text-indigo-600 mt-1">
                {(
                  ECOSYSTEM_PARTNERS.reduce(
                    (sum, p) => sum + p.totalProfit,
                    0
                  ) / 10000
                ).toFixed(0)}
                万
              </div>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Wallet size={24} className="text-indigo-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 按货架分类展示资源方 */}
      <div className="space-y-6">
        {["合规与生存", "增长与交易", "要素与基建"].map((category) => {
          const categoryPartners = ECOSYSTEM_PARTNERS.filter(
            (p) => p.category === category
          );
          if (categoryPartners.length === 0) return null;

          return (
            <div
              key={category}
              className="bg-white rounded-2xl border border-slate-200 p-6"
            >
              <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                {category === "合规与生存" && (
                  <Shield size={20} className="text-emerald-600" />
                )}
                {category === "增长与交易" && (
                  <TrendingUp size={20} className="text-blue-600" />
                )}
                {category === "要素与基建" && (
                  <Package size={20} className="text-purple-600" />
                )}
                {category} · {categoryPartners.length} 家资源方
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryPartners.map((partner) => {
                  const partnerRecords =
                    ECOSYSTEM_SERVICE_RECORDS.filter(
                      (r) => r.partnerId === partner.id
                    );
                  const isInactive = partner.status === "inactive";

                  return (
                    <div
                      key={partner.id}
                      className={`border-2 rounded-xl p-5 hover:shadow-lg transition-all ${
                        isInactive
                          ? "border-amber-200 bg-amber-50"
                          : "border-slate-200 bg-white hover:border-indigo-300"
                      }`}
                    >
                      {/* 资源方头部 */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h5 className="font-black text-slate-900">
                              {partner.name}
                            </h5>
                            {isInactive && (
                              <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded">
                                不活跃
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-500">
                            {partner.serviceType}
                          </div>
                        </div>
                      </div>

                      {/* 统计数据 */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-slate-50 rounded-lg p-3">
                          <div className="text-xs text-slate-500">
                            服务次数
                          </div>
                          <div className="text-lg font-black text-slate-900">
                            {partner.serviceCount}
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-lg p-3">
                          <div className="text-xs text-slate-500">
                            累计分润
                          </div>
                          <div className="text-lg font-black text-emerald-600">
                            ¥{(partner.totalProfit / 10000).toFixed(1)}
                            万
                          </div>
                        </div>
                      </div>

                      {/* 联系信息 */}
                      <div className="mb-4 text-xs text-slate-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <User size={12} />
                          {partner.contactPerson}
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone size={12} />
                          {partner.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={12} />
                          最后活跃: {partner.lastActiveDate}
                        </div>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors">
                          查看记录
                        </button>
                        {isInactive && (
                          <button className="px-3 py-2 bg-amber-500 text-white rounded-lg text-sm font-bold hover:bg-amber-600 transition-colors flex items-center gap-1">
                            <X size={14} />
                            解除合作
                          </button>
                        )}
                      </div>

                      {/* 服务记录预览（折叠） */}
                      {partnerRecords.length > 0 && (
                        <details className="mt-4">
                          <summary className="text-xs font-bold text-slate-600 cursor-pointer hover:text-indigo-600">
                            查看 {partnerRecords.length} 条服务记录 ▼
                          </summary>
                          <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                            {partnerRecords.map((record) => (
                              <div
                                key={record.id}
                                className="bg-slate-50 rounded-lg p-3 text-xs"
                              >
                                <div className="font-bold text-slate-900 mb-1">
                                  {record.projectName}
                                </div>
                                <div className="text-slate-600 mb-2">
                                  {record.serviceDetail}
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-slate-500">
                                    {record.serviceDate}
                                  </span>
                                  <span className="font-bold text-emerald-600">
                                    分润: ¥
                                    {(
                                      record.profitShare / 10000
                                    ).toFixed(2)}
                                    万
                                  </span>
                                </div>
                                <div className="mt-1">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                      record.status === "已完成"
                                        ? "bg-emerald-100 text-emerald-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {record.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </details>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
