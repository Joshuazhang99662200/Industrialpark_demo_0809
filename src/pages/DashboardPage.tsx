import {
  FileText,
  Database,
  PieChart,
  Activity,
  Target,
  Sparkles,
  TrendingUp,
  Banknote,
  MapPin,
} from "lucide-react";
import { DonutChart } from "../components/common/DonutChart";

/// ==========================================
// --- 组件: 仪表盘 (Dashboard) - 完整版 ---
// ==========================================

export const DashboardPage = ({ projects }) => {
  const totalProjects = projects.length;
  const thisMonthCount = projects.filter((p) =>
    p.submitTime.includes("2024-02")
  ).length;
  const potentialLeads = 34;

  // --- 1. 数据统计逻辑 ---

  // A. 赛道分布
  const trackDistribution = projects.reduce((acc: any, curr) => {
    acc[curr.track] = (acc[curr.track] || 0) + 1;
    return acc;
  }, {});
  const trackData = Object.entries(trackDistribution)
    .map(([name, value]) => ({ name, value: value as number }))
    .sort((a, b) => b.value - a.value);

  // B. 融资轮次分布
  const fundingDistribution = projects.reduce((acc: any, curr) => {
    let key = "其他";
    if (curr.funding.includes("种子") || curr.funding.includes("天使"))
      key = "种子/天使轮";
    else if (curr.funding.includes("A轮") || curr.funding.includes("Pre-A"))
      key = "A轮阶段";
    else if (curr.funding.includes("B轮")) key = "B轮及以后";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const fundingData = Object.entries(fundingDistribution)
    .map(([name, value]) => ({ name, value: value as number }))
    .sort((a, b) => b.value - a.value);

  // C. 区域来源分布 (环形图逻辑)
  const locationDistribution = projects.reduce((acc: any, curr) => {
    let region = curr.location.split("·")[0];
    if (curr.location.includes("北京")) region = "北京";
    else if (curr.location.includes("上海")) region = "上海";
    else if (curr.location.includes("深圳") || curr.location.includes("广州"))
      region = "广东";
    else if (curr.location.includes("苏州") || curr.location.includes("南京"))
      region = "江苏";
    else if (curr.location.includes("杭州")) region = "浙江";
    else if (curr.location.includes("成都")) region = "四川";

    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {});

  let locationDataSorted = Object.entries(locationDistribution)
    .map(([name, value]) => ({ name, value: value as number }))
    .sort((a, b) => b.value - a.value);

  if (locationDataSorted.length > 6) {
    const top6 = locationDataSorted.slice(0, 6);
    const others = locationDataSorted
      .slice(6)
      .reduce((sum, item) => sum + item.value, 0);
    locationDataSorted = [...top6, { name: "其他地区", value: others }];
  }
  const locationData = locationDataSorted;

  // D. 质量评级统计 (补回的逻辑)
  const qualityStats = projects.reduce(
    (acc, p) => {
      if (p.score >= 90) acc.s += 1;
      else if (p.score >= 80) acc.a += 1;
      else if (p.score >= 70) acc.b += 1;
      else acc.c += 1;
      return acc;
    },
    { s: 0, a: 0, b: 0, c: 0 }
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 p-8 pb-20">
      {/* 1. 顶部 KPI 卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Database size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              +12%
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">
            {totalProjects}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            项目库累计规模 (个)
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <FileText size={24} />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
              本月
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">
            {thisMonthCount}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            本月新增入库 (个)
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl border border-indigo-500 shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Sparkles size={80} />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Target size={24} />
              </div>
              <span className="text-xs font-bold text-white/80 bg-white/10 px-2 py-1 rounded backdrop-blur-sm">
                待处理
              </span>
            </div>
            <div className="text-3xl font-black mb-1">{potentialLeads}</div>
            <div className="text-xs text-indigo-100 font-medium">
              潜在生态线索待匹配
            </div>
          </div>
        </div>
      </div>

      {/* 2. 第一排：赛道分布 + 入库趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：赛道环形图 */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <PieChart size={18} className="text-slate-400" /> 赛道分布概览
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-shrink-0">
              <DonutChart data={trackData} size={180} thickness={25} />
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-x-6 gap-y-3">
              {trackData.map((item, idx) => {
                const percent = ((item.value / totalProjects) * 100).toFixed(1);
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm group"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 bg-indigo-${
                          ((idx % 5) + 4) * 100
                        }`}
                      ></span>
                      <span className="text-slate-600 font-medium whitespace-nowrap truncate">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        {percent}%
                      </span>
                      <span className="font-bold text-slate-900 w-5 text-right">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右侧：入库趋势 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-slate-400" /> 入库趋势 (周)
          </h3>
          <div className="flex-1 flex items-end justify-between gap-3 px-2 pb-2">
            {[12, 18, 15, 24, 20, 32, 28, 35].map((val, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col items-center gap-2 group"
              >
                <div className="relative w-full bg-slate-50 rounded-t-lg h-40 overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-lg transition-all duration-700 ease-out group-hover:bg-indigo-600"
                    style={{ height: `${(val / 40) * 100}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  W{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 新增第二排：融资轮次环形图 + 区域分布环形图 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：融资轮次分布 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Banknote size={18} className="text-slate-400" /> 融资轮次分布
            </h3>
          </div>
          <div className="flex items-center justify-center gap-8">
            <div className="shrink-0">
              <DonutChart data={fundingData} size={160} thickness={25} />
            </div>
            <div className="flex-1 space-y-3 max-w-[200px]">
              {fundingData.map((item, idx) => {
                const percent = ((item.value / totalProjects) * 100).toFixed(1);
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div
                        className={`w-2.5 h-2.5 shrink-0 rounded-full bg-purple-${
                          (idx + 4) * 100
                        }`}
                      ></div>
                      <div className="text-sm font-bold text-slate-700 truncate">
                        {item.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md">
                        {percent}%
                      </span>
                      <span className="text-xs text-slate-400 w-4 text-right">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右侧：区域分布 (环形图) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <MapPin size={18} className="text-slate-400" /> 区域来源分布 (Top
              6)
            </h3>
          </div>
          <div className="flex items-center justify-center gap-8">
            <div className="shrink-0">
              <DonutChart data={locationData} size={160} thickness={25} />
            </div>
            <div className="flex-1 space-y-3 max-w-[200px]">
              {locationData.map((item, idx) => {
                const percent = ((item.value / totalProjects) * 100).toFixed(1);
                const colors = [
                  "bg-rose-500",
                  "bg-orange-500",
                  "bg-amber-500",
                  "bg-emerald-500",
                  "bg-cyan-500",
                  "bg-blue-500",
                  "bg-slate-400",
                ];
                const colorClass = colors[idx] || "bg-slate-400";

                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div
                        className={`w-2.5 h-2.5 shrink-0 rounded-full ${colorClass}`}
                      ></div>
                      <div className="text-sm font-bold text-slate-700 truncate">
                        {item.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        {percent}%
                      </span>
                      <span className="text-xs text-slate-400 w-4 text-right">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. 底部：整体质量评级概览 (补回的板块) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Activity size={18} className="text-slate-400" /> 整体质量评级概览
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(qualityStats).map(([key, val]) => {
            const labels: any = {
              s: "S级 (极优)",
              a: "A级 (推荐)",
              b: "B级 (储备)",
              c: "C级 (观察)",
            };
            const colors: any = {
              s: "text-rose-600 bg-rose-50",
              a: "text-indigo-600 bg-indigo-50",
              b: "text-emerald-600 bg-emerald-50",
              c: "text-slate-500 bg-slate-100",
            };
            return (
              <div
                key={key}
                className={`p-6 rounded-2xl flex flex-col items-center justify-center border border-transparent hover:border-slate-200 transition-all ${
                  colors[key].split(" ")[1]
                }`}
              >
                <span
                  className={`text-4xl font-black mb-2 ${
                    colors[key].split(" ")[0]
                  }`}
                >
                  {val as number}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider opacity-80">
                  {labels[key]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
