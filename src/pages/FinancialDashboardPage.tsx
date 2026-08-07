import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Network,
  Package,
} from "lucide-react";

export const FinancialDashboardPage = ({
  isEcoServiceExpanded,
  onToggleEcoService,
}: {
  isEcoServiceExpanded: boolean;
  onToggleEcoService: () => void;
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 页面头部 */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-2xl font-black text-slate-900">
            收入看板
          </h3>
          <p className="text-slate-500 mt-2">
            查看所有流水的大盘统计和分润分析
          </p>
        </div>
      </div>

      {(() => {
        // 固定累计分润总金额为 15,069,277 元
        const totalProfit = 15069277;
        const totalProfitInWan = (totalProfit / 10000).toFixed(2);

        // 统计科技产品明细（基于项目库和生态看板的实际数据）
        const diagnosticCount = 3596; // 项目库初筛规模
        const conversionRate = 43.6; // 转化率
        const optimizationCount = Math.round(
          diagnosticCount * (conversionRate / 100)
        ); // 1568份

        // 总单数 = 初步诊断服务 + 商业优化建议书
        const totalBusinessCount = diagnosticCount + optimizationCount; // 5164份

        // 根据业务量分配分润金额
        const projectCount = 3596; // 项目库初筛
        const ecoCount = 2451; // 生态服务需求
        const totalCount = projectCount + ecoCount;

        const businessProfit = Math.round(
          totalProfit * (projectCount / totalCount)
        ); // 约 8,958,683元
        const ecoProfit = totalProfit - businessProfit; // 约 6,110,594元

        // 统计生态服务明细（按服务类型分组）- 使用模拟数据
        const ecoServiceProfits: Record<string, number> = {
          "财税/审计": Math.round(ecoProfit * 0.127),
          "法律/法务": Math.round(ecoProfit * 0.117),
          知识产权: Math.round(ecoProfit * 0.108),
          政策申报: Math.round(ecoProfit * 0.099),
          订单对接: Math.round(ecoProfit * 0.093),
          投融资服务: Math.round(ecoProfit * 0.088),
          品牌PR: Math.round(ecoProfit * 0.082),
          云与算力: Math.round(ecoProfit * 0.077),
          数据服务: Math.round(ecoProfit * 0.113),
          "人才/猎头": Math.round(ecoProfit * 0.096),
        };

        // 12个月数据（2024年2月-2025年1月）- 总金额15,069,277元随机分配
        const monthsData = [
          { month: "2月", amount: 1098765 },
          { month: "3月", amount: 1234567 },
          { month: "4月", amount: 1156789 },
          { month: "5月", amount: 1389012 },
          { month: "6月", amount: 1278945 },
          { month: "7月", amount: 1456321 },
          { month: "8月", amount: 1187654 },
          { month: "9月", amount: 1345678 },
          { month: "10月", amount: 1267890 },
          { month: "11月", amount: 1423456 },
          { month: "12月", amount: 1198765 },
          { month: "1月", amount: 1031435 }, // 总计为 15,069,277
        ];

        return (
          <>
            {/* 顶部：大金额 + 12个月数据 */}
            <div className="grid grid-cols-3 gap-6">
              {/* 左侧：累计分润总金额（超大字报） */}
              <div className="col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 text-white shadow-2xl">
                <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-4">
                  累计分润总金额
                </div>
                <div className="text-6xl font-black mb-3">
                  {totalProfitInWan}
                </div>
                <div className="text-xl font-bold opacity-90">万元</div>
              </div>

              {/* 右侧：12个月分润柱状图 */}
              <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
                <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-indigo-600" />
                  近12个月分润明细
                </h4>
                <div className="flex justify-between gap-2">
                  {monthsData.map((data, idx) => {
                    // 计算环比增速
                    const change =
                      idx > 0
                        ? data.amount - monthsData[idx - 1].amount
                        : 0;
                    const growthRate =
                      idx > 0
                        ? (
                            (change / monthsData[idx - 1].amount) *
                            100
                          ).toFixed(1)
                        : "0.0";
                    const isIncrease = change > 0;

                    // 转换为万元
                    const amountInWan = (data.amount / 10000).toFixed(
                      2
                    );

                    // 计算柱子高度像素（基于最大值，固定最大高度160px）
                    const maxAmount = Math.max(
                      ...monthsData.map((m) => m.amount)
                    );
                    const heightPx = Math.round(
                      (data.amount / maxAmount) * 160
                    );

                    return (
                      <div
                        key={idx}
                        className="flex-1 flex flex-col items-center gap-1"
                      >
                        {/* 金额显示（万元） */}
                        <div className="text-[10px] font-black text-slate-900 mb-1 h-5">
                          {amountInWan}万
                        </div>

                        {/* 柱状图容器 */}
                        <div className="w-full h-40 flex items-end">
                          <div
                            className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg hover:from-indigo-700 hover:to-indigo-500 transition-all cursor-pointer"
                            style={{ height: `${heightPx}px` }}
                            title={`${
                              data.month
                            }: ¥${data.amount.toLocaleString()}（${amountInWan}万元）`}
                          ></div>
                        </div>

                        {/* 环比增速 */}
                        <div className="h-4">
                          {idx > 0 ? (
                            <div
                              className={`text-[10px] font-bold ${
                                isIncrease
                                  ? "text-red-600"
                                  : "text-emerald-600"
                              }`}
                            >
                              {isIncrease ? "↑" : "↓"}{" "}
                              {Math.abs(parseFloat(growthRate))}%
                            </div>
                          ) : null}
                        </div>

                        {/* 月份标签 */}
                        <div className="text-[10px] text-slate-500 font-bold">
                          {data.month}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 下方：科技产品分润 + 生态服务分润 */}
            <div className="grid grid-cols-2 gap-6">
              {/* 左下：科技产品分润 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col">
                <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                  <Package size={20} className="text-blue-600" />
                  科技产品分润
                </h4>
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-4">
                  <div className="text-sm font-bold opacity-80 mb-2">
                    累计分润金额
                  </div>
                  <div className="text-4xl font-black">
                    {(businessProfit / 10000).toFixed(2)}
                  </div>
                  <div className="text-lg font-bold opacity-90 mt-1">
                    万元
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700">
                      初步诊断服务（Uni）
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      {diagnosticCount} 份
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700">
                      商业优化建议书
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      {optimizationCount} 份
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-700">
                      总单数
                    </span>
                    <span className="text-lg font-black text-slate-900">
                      {totalBusinessCount} 份
                    </span>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-blue-700">
                        转化率
                      </span>
                      <span className="text-2xl font-black text-blue-900">
                        {conversionRate}%
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1 text-right">
                      ({optimizationCount}/{diagnosticCount}*100%)
                    </div>
                  </div>
                </div>
              </div>

              {/* 右下：生态服务分润 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                    <Network size={20} className="text-emerald-600" />
                    生态服务分润
                  </h4>
                  <button
                    onClick={onToggleEcoService}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
                  >
                    {isEcoServiceExpanded ? (
                      <>
                        <ChevronUp size={14} />
                        收起
                      </>
                    ) : (
                      <>
                        <ChevronDown size={14} />
                        展开全部
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white mb-4">
                  <div className="text-sm font-bold opacity-80 mb-2">
                    累计分润金额
                  </div>
                  <div className="text-4xl font-black">
                    {(ecoProfit / 10000).toFixed(2)}
                  </div>
                  <div className="text-lg font-bold opacity-90 mt-1">
                    万元
                  </div>
                </div>
                <div
                  className={`bg-slate-50 rounded-xl p-5 space-y-3 flex-1 overflow-hidden transition-all ${
                    isEcoServiceExpanded
                      ? "max-h-none overflow-y-auto"
                      : "max-h-48"
                  }`}
                >
                  {Object.entries(ecoServiceProfits)
                    .sort((a, b) => b[1] - a[1])
                    .map(([serviceType, profit]) => (
                      <div
                        key={serviceType}
                        className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0"
                      >
                        <span className="text-sm font-bold text-slate-700">
                          {serviceType}
                        </span>
                        <span className="text-lg font-black text-slate-900">
                          {(profit / 10000).toFixed(2)} 万元
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        );
      })()}
    </div>
  );
};
