import {
  Plus,
  PieChart,
} from "lucide-react";

export const EcosystemDashboardPage = ({
  onNavigateToConnect,
}: {
  onNavigateToConnect: () => void;
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 页面头部 */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-2xl font-black text-slate-900">
            生态看板
          </h3>
          <p className="text-slate-500 mt-2">
            查看所有生态服务需求的匹配状态和进展
          </p>
        </div>
        <button
          onClick={onNavigateToConnect}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center gap-2"
        >
          <Plus size={18} />
          提交新需求
        </button>
      </div>

      {/* 统计卡片（大字报形式） */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
          <div className="text-sm font-bold uppercase tracking-wider opacity-80 mb-2">
            总需求数
          </div>
          <div className="text-6xl font-black mb-2">2451</div>
          <div className="text-base opacity-80 mb-3">条</div>
          <div className="text-xs opacity-70 border-t border-white/20 pt-3">
            包含所有已提交的生态服务需求
          </div>
        </div>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl">
          <div className="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">
            待处理需求
          </div>
          <div className="text-6xl font-black mb-2">1044</div>
          <div className="text-base opacity-90 mb-3">条</div>
          <div className="text-xs opacity-80 border-t border-white/20 pt-3">
            等待资源方对接的新需求
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">
            处理中需求
          </div>
          <div className="text-6xl font-black mb-2">560</div>
          <div className="text-base opacity-90 mb-3">条</div>
          <div className="text-xs opacity-80 border-t border-white/20 pt-3">
            正在与资源方洽谈匹配中
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-8 text-white shadow-xl">
          <div className="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">
            已完成需求对接
          </div>
          <div className="text-6xl font-black mb-2">847</div>
          <div className="text-base opacity-90 mb-3">条</div>
          <div className="text-xs opacity-80 border-t border-white/20 pt-3">
            成功匹配并完成服务对接
          </div>
        </div>
      </div>

      {/* 数据可视化：按状态分布 + 按类目分布 */}
      <div className="grid grid-cols-4 gap-6">
        {/* 左侧：按状态分布饼图 - 25% */}
        <div className="col-span-1 bg-white rounded-2xl border border-slate-200 p-6">
          <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <PieChart size={20} className="text-indigo-600" />
            需求状态分布
          </h4>
          {(() => {
            // 按状态统计 - 使用固定数据与大字报一致
            const statusData = [
              {
                name: "已完成需求对接",
                count: 847,
                color: "bg-emerald-500",
                colorHex: "#10b981",
              },
              {
                name: "处理中需求",
                count: 560,
                color: "bg-blue-500",
                colorHex: "#3b82f6",
              },
              {
                name: "待处理需求",
                count: 1044,
                color: "bg-amber-500",
                colorHex: "#f59e0b",
              },
            ];
            const total = 2451; // 固定总需求数

            return (
              <div className="flex flex-col items-center">
                {/* 饼图 */}
                <div className="relative w-40 h-40 mb-4">
                  <svg
                    viewBox="0 0 200 200"
                    className="transform -rotate-90"
                  >
                    {(() => {
                      let cumulativePercent = 0;
                      return statusData.map((status, idx) => {
                        const percent = status.count / total;
                        const circumference = 2 * Math.PI * 70;
                        const offset =
                          cumulativePercent * circumference;
                        const dashArray = `${
                          percent * circumference
                        } ${circumference}`;
                        cumulativePercent += percent;

                        return (
                          <circle
                            key={idx}
                            cx="100"
                            cy="100"
                            r="70"
                            fill="none"
                            stroke={status.colorHex}
                            strokeWidth="40"
                            strokeDasharray={dashArray}
                            strokeDashoffset={-offset}
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-2xl font-black text-slate-900">
                      {total}
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold">
                      总需求
                    </div>
                  </div>
                </div>

                {/* 图例（垂直布局） */}
                <div className="w-full space-y-2">
                  {statusData.map((status, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center p-2.5 bg-slate-50 rounded-xl"
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <div
                          className={`w-2 h-2 rounded-full ${status.color}`}
                        ></div>
                        <span className="text-[10px] font-bold text-slate-700">
                          {status.name}
                        </span>
                      </div>
                      <div className="text-lg font-black text-slate-900 mb-0.5">
                        {status.count}
                      </div>
                      <div className="text-[9px] text-slate-500 font-bold">
                        {((status.count / total) * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>

        {/* 右侧：按服务类型分布（大饼图） - 75% */}
        <div className="col-span-3 bg-white rounded-2xl border border-slate-200 p-6">
          <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <PieChart size={20} className="text-emerald-600" />
            服务类型分布
          </h4>
          {(() => {
            // 定义10种固定类别
            const fixedCategories = [
              "财税/审计",
              "法律/法务",
              "知识产权",
              "政策申报",
              "订单对接",
              "投融资服务",
              "品牌PR",
              "云与算力",
              "数据服务",
              "人才/猎头",
            ];

            // 10种类别对应的颜色
            const categoryColors = [
              { bg: "bg-blue-500", hex: "#3b82f6" },
              { bg: "bg-emerald-500", hex: "#10b981" },
              { bg: "bg-amber-500", hex: "#f59e0b" },
              { bg: "bg-purple-500", hex: "#a855f7" },
              { bg: "bg-pink-500", hex: "#ec4899" },
              { bg: "bg-indigo-500", hex: "#6366f1" },
              { bg: "bg-red-500", hex: "#ef4444" },
              { bg: "bg-teal-500", hex: "#14b8a6" },
              { bg: "bg-orange-500", hex: "#f97316" },
              { bg: "bg-cyan-500", hex: "#06b6d4" },
            ];

            // 统计每个类别的数量（使用固定的模拟数据，总数为2451）
            const categoryData = fixedCategories.map((name, idx) => {
              // 模拟不同的分布比例
              const counts = [
                312, 287, 265, 243, 228, 215, 201, 189, 276, 235,
              ];
              return {
                name,
                count: counts[idx],
                color: categoryColors[idx].bg,
                colorHex: categoryColors[idx].hex,
              };
            });

            const totalServices = 2451;

            return (
              <div className="flex flex-col items-center">
                {/* 大饼图 */}
                <div className="relative w-64 h-64 mb-6">
                  <svg
                    viewBox="0 0 200 200"
                    className="transform -rotate-90"
                  >
                    {(() => {
                      let cumulativePercent = 0;
                      return categoryData.map((cat, idx) => {
                        const percent = cat.count / totalServices;
                        const circumference = 2 * Math.PI * 70;
                        const offset =
                          cumulativePercent * circumference;
                        const dashArray = `${
                          percent * circumference
                        } ${circumference}`;
                        cumulativePercent += percent;

                        return (
                          <circle
                            key={idx}
                            cx="100"
                            cy="100"
                            r="70"
                            fill="none"
                            stroke={cat.colorHex}
                            strokeWidth="40"
                            strokeDasharray={dashArray}
                            strokeDashoffset={-offset}
                          />
                        );
                      });
                    })()}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <div className="text-4xl font-black text-slate-900">
                      {totalServices}
                    </div>
                    <div className="text-sm text-slate-500 font-bold">
                      总需求
                    </div>
                  </div>
                </div>

                {/* 类别图例 - 在下方显示 */}
                <div className="w-full grid grid-cols-5 gap-3">
                  {categoryData.map((cat, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col items-center p-3 bg-slate-50 rounded-xl"
                    >
                      <div className="flex items-center gap-1.5 mb-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${cat.color}`}
                        ></div>
                        <span className="text-xs font-bold text-slate-700 truncate">
                          {cat.name}
                        </span>
                      </div>
                      <div className="text-xl font-black text-slate-900 mb-1">
                        {cat.count}
                      </div>
                      <div className="text-[10px] text-slate-500 font-bold">
                        {((cat.count / totalServices) * 100).toFixed(1)}
                        %
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
