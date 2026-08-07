import { useState, useMemo } from "react";

import { Project, ScoringConfig } from "../../types";
import {
  FileText,
  ShoppingCart,
  Users,
  Download,
  X,
  ChevronDown,
  BarChart3,
  Database,
  Briefcase,
  Sparkles,
  CheckCircle2,
  Paperclip,
  Calculator,
  Landmark,
  MapPin,
  Calendar,
  Briefcase as BriefcaseIcon,
  Share2,
  Scale,
  Megaphone,
  Circle,
  Shield,
  Cloud,
} from "lucide-react";
import { SmartStatusBadge } from "../common/SmartStatusBadge";

// ==========================================
// --- 组件: 项目详情透视 (最终完善版：含联系人+详细评分) ---
// ==========================================

export const ProjectDetailModal = ({
  project,
  config,
  onClose,
  isAdmin,
}: {
  project: Project;
  config: ScoringConfig;
  onClose: () => void;
  isAdmin: boolean;
}) => {
  const [isScoreDetailsOpen, setIsScoreDetailsOpen] = useState(true); // 默认展开评分详情，方便查看

  // 模拟生成 100-150 字的项目简介
  const longDescription = useMemo(() => {
    return `${project.name} 成立于 ${project.established}，总部位于${
      project.location
    }，是一家专注于${project.track}赛道的${project.trackLevel}企业。公司${
      project.oneLiner
    }。核心产品为“${project.productIntro}”，目前在${project.scenario.join(
      "、"
    )}等场景已实现落地。${
      project.keyClients ? `主要服务客户包括${project.keyClients}。` : ""
    }作为${
      project.tags?.[0] || ""
    }代表性企业，团队拥有深厚的技术积累，致力于通过技术创新解决行业核心痛点。目前公司已获得${
      project.investors
    }等知名机构投资，营收规模达到${
      project.revenue
    }，展现出强劲的市场竞争力和增长潜力。`;
  }, [project]);

  // 评分数据兜底
  const scoreData = project.detailedScores || {
    team: { ceo: 0, teamAvg: 0, total: project.rawScores?.team || 0 },
    tech: {
      moat: 0,
      product: 0,
      track: 0,
      total: project.rawScores?.tech || 0,
    },
    ops: {
      financial: 0,
      operational: 0,
      total: project.rawScores?.finance || 0,
    },
    capital: { history: 0, total: project.rawScores?.market || 0 },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header: 仅保留基础操作栏 */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white shrink-0 z-20">
          <div className="flex gap-4 text-xs text-slate-400">
            <span className="font-mono bg-slate-50 px-2 py-1 rounded border border-slate-100">
              ID: {project.id}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={14} /> {project.track}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6 bg-slate-50/50">
          {/* =======================
              1. 超级企名片 (统领信息)
             ======================= */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            {/* 装饰背景 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[100px] -mr-8 -mt-8 z-0 pointer-events-none"></div>

            <div className="relative z-10">
              {/* 1.1 头部：Logo + 名称 + 标签 (合并显示) */}
              <div className="flex flex-col md:flex-row md:items-start gap-5 mb-6 border-b border-slate-100 pb-6">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-200 shrink-0">
                  {project.companyName
                    ? project.companyName.substring(0, 1)
                    : "企"}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black text-slate-900">
                      {project.companyName || project.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-xs font-bold">
                        {project.track}
                      </span>
                      {project.tags?.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 基础工商信息 (含来源) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-xs text-slate-500 mt-3">
                    <div className="flex items-center gap-2">
                      <Landmark size={14} className="text-slate-400" /> 法人：
                      <span className="text-slate-700 font-bold">
                        {project.legalRep}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" /> 成立：
                      <span className="text-slate-700 font-bold">
                        {project.established}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400" /> 地区：
                      <span className="text-slate-700 font-bold">
                        {project.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BriefcaseIcon size={14} className="text-slate-400" />{" "}
                      规模：
                      <span className="text-slate-700 font-bold">
                        {project.scale}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 size={14} className="text-slate-400" /> 来源：
                      <span className="text-indigo-600 font-bold">
                        {project.source}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1.2 项目简介 */}
              <div className="mb-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FileText size={14} /> 项目简介
                </h4>
                <p className="text-sm text-slate-700 leading-7 bg-slate-50 p-4 rounded-xl border border-slate-100 text-justify">
                  {longDescription}
                </p>
              </div>

              {/* 1.3 业务与财务 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[60px] mt-0.5">
                        场景应用
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.scenario.map((s) => (
                          <span
                            key={s}
                            className="px-1.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-[4px] text-xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[60px] mt-0.5">
                        主要客户
                      </span>
                      <span className="text-xs text-slate-600 font-medium">
                        {project.keyClients || "暂未披露"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[60px] mt-0.5">
                        投资机构
                      </span>
                      <span className="text-xs text-slate-600 font-medium">
                        {project.investors || "暂未披露"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 mb-1">
                      营收规模
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      {project.revenue}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-indigo-200/50"></div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 mb-1">
                      净利润
                    </div>
                    <div
                      className={`text-sm font-black ${
                        project.profit.includes("-")
                          ? "text-rose-500"
                          : "text-emerald-600"
                      }`}
                    >
                      {project.profit}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-indigo-200/50"></div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 mb-1">
                      最新轮次
                    </div>
                    <div className="text-sm font-black text-indigo-600">
                      {project.funding}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-indigo-200/50"></div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 mb-1">
                      投后估值
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      {project.valuation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =======================
              2. AI 智能评估长条 (合并版 + 详细评分还原)
             ======================= */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* 主栏 */}
            <div
              className="p-6 flex flex-col md:flex-row gap-6 cursor-pointer hover:bg-slate-50 transition-colors relative"
              onClick={() => setIsScoreDetailsOpen(!isScoreDetailsOpen)}
            >
              <div className="flex-1 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Sparkles size={16} fill="currentColor" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">
                    AI 智能评估简报
                  </h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 md:pr-8">
                  {project.assessmentBrief ||
                    "基于多维数据模型，该项目展现出较强的技术壁垒，但在商业化落地方面仍需进一步验证。"}
                </p>
              </div>

              <div className="flex items-center gap-6 md:border-l md:border-slate-100 md:pl-6 shrink-0">
                <div className="text-right">
                  <div className="text-3xl font-black text-indigo-600 leading-none">
                    {project.score}
                    <span className="text-sm text-slate-300 ml-1 font-bold">
                      / 100
                    </span>
                  </div>
                  <div className="mt-1 flex justify-end">
                    <SmartStatusBadge score={project.score} />
                  </div>
                </div>
                <div
                  className={`w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 transition-transform duration-300 ${
                    isScoreDetailsOpen
                      ? "rotate-180 bg-indigo-100 text-indigo-500"
                      : ""
                  }`}
                >
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* 折叠区域：高保真还原详细评分 */}
            {isScoreDetailsOpen && (
              <div className="border-t border-slate-100 p-8 bg-slate-50/30 animate-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {/* 1. 团队画像 */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-800 text-sm">
                        1. 团队画像 (30%)
                      </h4>
                      <span className="font-black text-blue-600 text-lg">
                        {scoreData.team.total}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-32 shrink-0">
                          CEO评分 (学历/履历)
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.team.ceo}%` }}
                            className="h-full bg-blue-500 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.team.ceo}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-32 shrink-0">
                          核心团队均分
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.team.teamAvg}%` }}
                            className="h-full bg-blue-400 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.team.teamAvg}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2. 技术与赛道 */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-800 text-sm">
                        2. 技术与赛道 (30%)
                      </h4>
                      <span className="font-black text-purple-600 text-lg">
                        {scoreData.tech.total}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-24 shrink-0">
                          技术护城河
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.tech.moat}%` }}
                            className="h-full bg-purple-500 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.tech.moat}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-24 shrink-0">
                          产品成熟度
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.tech.product}%` }}
                            className="h-full bg-purple-400 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.tech.product}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-24 shrink-0">
                          赛道潜力
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.tech.track}%` }}
                            className="h-full bg-purple-300 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.tech.track}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. 运营与财务 */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-800 text-sm">
                        3. 运营与财务 (30%)
                      </h4>
                      <span className="font-black text-emerald-600 text-lg">
                        {scoreData.ops.total}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-32 shrink-0">
                          财务健康度
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.ops.financial}%` }}
                            className="h-full bg-emerald-500 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.ops.financial}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-32 shrink-0">
                          运营数据评分
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.ops.operational}%` }}
                            className="h-full bg-emerald-400 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.ops.operational}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4. 资本背书 */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-800 text-sm">
                        4. 资本背书 (10%)
                      </h4>
                      <span className="font-black text-amber-600 text-lg">
                        {scoreData.capital.total}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-24 shrink-0">
                          历史资方评级
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.capital.history}%` }}
                            className="h-full bg-amber-500 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.capital.history}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =======================
              3. 附件列表 (Middle)
             ======================= */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Paperclip size={16} className="text-slate-400" /> 附件与报告
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 text-red-500 rounded-xl flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                      {project.fileName}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      原始 BP • PDF • {project.submitTime}
                    </div>
                  </div>
                </div>
                <button className="p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-lg shadow-sm">
                  <Download size={16} />
                </button>
              </div>

              {project.reportName && (
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-500 rounded-xl flex items-center justify-center">
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                        {project.reportName}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        AI 深度诊断报告 • 自动生成
                      </div>
                    </div>
                  </div>
                  <button className="p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-lg shadow-sm">
                    <Download size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* =======================
              4. 项目申请的生态服务需求 (Ecosystem Service Requests) - 三货架设计
              仅超级管理员可见
             ======================= */}
          {isAdmin && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase size={16} className="text-slate-400" />{" "}
                  项目申请的生态服务需求
                </h3>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">
                  仅管理员可见
                </span>
              </div>

              {/* 货架1：合规与生存 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                  <h4 className="text-xs font-bold text-slate-700">
                    合规与生存
                  </h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* 法律/法务对接 - 已申请 */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-amber-200 transition-colors">
                      <Scale size={20} className="text-amber-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      法律/法务对接
                    </h4>
                    <p className="text-xs text-slate-500">合规咨询、合同审核</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-amber-600 font-bold">
                      <CheckCircle2 size={12} /> 已申请服务
                    </div>
                  </div>

                  {/* 财税/审计对接 - 已申请 */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                      <Calculator size={20} className="text-orange-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      财税/审计对接
                    </h4>
                    <p className="text-xs text-slate-500">财务规划、税务筹划</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-orange-600 font-bold">
                      <CheckCircle2 size={12} /> 已申请服务
                    </div>
                  </div>

                  {/* 政策申报 - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <FileText size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      政策申报
                    </h4>
                    <p className="text-xs text-slate-400">政策咨询、项目申报</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>

                  {/* 知识产权 - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Shield size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      知识产权
                    </h4>
                    <p className="text-xs text-slate-400">专利申请、商标注册</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>
                </div>
              </div>

              {/* 货架2：增长与交易 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                  <h4 className="text-xs font-bold text-slate-700">
                    增长与交易
                  </h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* 订单对接 - 已申请 */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-emerald-200 transition-colors">
                      <ShoppingCart size={20} className="text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      订单对接
                    </h4>
                    <p className="text-xs text-slate-500">业务对接、订单撮合</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                      <CheckCircle2 size={12} /> 已申请服务
                    </div>
                  </div>

                  {/* FA顾问 - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Briefcase size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      FA顾问
                    </h4>
                    <p className="text-xs text-slate-400">
                      投融资顾问、资本对接
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>

                  {/* 品牌PR - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Megaphone size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      品牌PR
                    </h4>
                    <p className="text-xs text-slate-400">品牌传播、媒体曝光</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>
                </div>
              </div>

              {/* 货架3：要素与基建 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                  <h4 className="text-xs font-bold text-slate-700">
                    要素与基建
                  </h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* 人才/猎头对接 - 已申请 */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                      <Users size={20} className="text-blue-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      人才/猎头对接
                    </h4>
                    <p className="text-xs text-slate-500">
                      高端人才招聘、团队组建
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-blue-600 font-bold">
                      <CheckCircle2 size={12} /> 已申请服务
                    </div>
                  </div>

                  {/* 数据服务 - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Database size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      数据服务
                    </h4>
                    <p className="text-xs text-slate-400">数据分析、市场洞察</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>

                  {/* 云资源与算力服务 - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Cloud size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      云资源与算力
                    </h4>
                    <p className="text-xs text-slate-400">云服务、算力支持</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
