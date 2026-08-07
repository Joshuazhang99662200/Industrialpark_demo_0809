import {
  Plus,
  Search,
  X,
  Filter,
} from "lucide-react";
import { SmartStatusBadge } from "../components/common/SmartStatusBadge";
import { useProjectFilters } from "../hooks/useProjectFilters";

export const ProjectLibraryPage = ({
  searchText,
  onSearchTextChange,
  filterConditions,
  onOpenFilter,
  onOpenBatchUpload,
  onSelectProject,
}) => {
  const projects = useProjectFilters(searchText, filterConditions);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 搜索框和筛选器同行布局 */}
      <div className="flex gap-4 items-center">
        {/* 搜索框 - 75% 宽度 */}
        <div className="flex-[3]">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="搜索项目名称、上传人、赛道、标签等..."
              value={searchText}
              onChange={(e) => onSearchTextChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
            />
            {searchText && (
              <button
                onClick={() => onSearchTextChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* 筛选器 - 25% 宽度 */}
        <button
          onClick={onOpenFilter}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-sm border ${
            filterConditions.length > 0
              ? "bg-indigo-50 border-indigo-200 text-indigo-700"
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          <Filter size={16} />
          高级筛选
          {filterConditions.length > 0 && (
            <span className="bg-indigo-600 text-white text-[10px] px-1.5 rounded-full">
              {filterConditions.length}
            </span>
          )}
        </button>
      </div>

      {/* 项目统计信息 */}
      <div className="text-sm text-slate-500">
        共 {projects.length} 个项目
        {(filterConditions.length > 0 || searchText) && (
          <span className="text-indigo-600 font-medium">
            {" "}
            (已过滤
            {filterConditions.length > 0 &&
              ` ${filterConditions.length} 个筛选条件`}
            {filterConditions.length > 0 && searchText && "，"}
            {searchText && "关键词搜索"})
          </span>
        )}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full whitespace-nowrap text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="px-6 py-4 text-center w-16">排名</th>
              <th className="px-6 py-4">项目基础信息</th>
              <th className="px-6 py-4">上传信息</th>
              <th className="px-6 py-4">赛道</th>
              <th className="px-6 py-4">场景</th>
              <th className="px-6 py-4">财务与融资</th>
              <th className="px-6 py-4">标签库</th>
              <th className="px-6 py-4">综合得分</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {projects.map((project, index) => (
              <tr
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
              >
                <td className="px-6 py-4 text-center">
                  <div
                    className={`w-8 h-8 rounded-lg mx-auto flex items-center justify-center text-sm font-black ${
                      index === 0
                        ? "bg-amber-100 text-amber-600"
                        : index === 1
                        ? "bg-slate-100 text-slate-600"
                        : index === 2
                        ? "bg-orange-50 text-orange-600"
                        : "text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-800 text-sm mb-1">
                    {project.name}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    {project.id}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col text-xs text-slate-600">
                    <span className="font-bold">
                      {project.uploaderName}
                    </span>
                    <span className="text-slate-400 scale-90 origin-left">
                      {project.submitTime}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-bold border border-slate-200">
                    {project.track}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap max-w-[150px]">
                    {project.scenario.map((s) => (
                      <span
                        key={s}
                        className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium border border-blue-100"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 w-6">营收</span>{" "}
                      <span className="font-medium text-slate-700">
                        {project.revenue}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 w-6">利润</span>{" "}
                      <span
                        className={`font-medium ${
                          project.profit.includes("-")
                            ? "text-rose-500"
                            : "text-emerald-600"
                        }`}
                      >
                        {project.profit}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-400 w-6">融资</span>{" "}
                      <span className="font-bold text-indigo-600">
                        {project.funding}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1 flex-wrap max-w-[200px]">
                    {project.tags.map((t) => (
                      <span
                        key={t}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                          t.includes("清北") || t.includes("海外")
                            ? "bg-purple-50 text-purple-700 border-purple-100"
                            : t.includes("营收")
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-black text-slate-900 tracking-tight">
                      {project.score}
                    </span>
                    <SmartStatusBadge score={project.score} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 批量上传按钮 */}
      <div className="flex justify-center">
        <button
          onClick={onOpenBatchUpload}
          className="group flex items-center gap-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
        >
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all">
            <Plus size={20} />
          </div>
          批量上传项目
        </button>
      </div>
    </div>
  );
};
