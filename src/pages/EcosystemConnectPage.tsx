import {
  Users,
  Download,
  Search,
  MoreHorizontal,
  Edit3,
  Phone,
} from "lucide-react";
import { useMemo } from "react";

import { ECOSYSTEM_SERVICE_REQUESTS } from "../data/ecosystem";

export const EcosystemConnectPage = ({
  searchText,
  onSearchTextChange,
  serviceType,
  onServiceTypeChange,
  status,
  onStatusChange,
}: {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  serviceType: string;
  onServiceTypeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}) => {
  // 生态对接筛选逻辑
  const requests = useMemo(() => {
    let filtered = [...ECOSYSTEM_SERVICE_REQUESTS];

    // 文本搜索：企业名称、需求明细
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.companyName.toLowerCase().includes(searchLower) ||
          req.requirementDetails.toLowerCase().includes(searchLower)
      );
    }

    // 服务类型筛选
    if (serviceType) {
      filtered = filtered.filter((req) => req.serviceType === serviceType);
    }

    // 状态筛选
    if (status) {
      filtered = filtered.filter((req) => req.status === status);
    }

    return filtered;
  }, [searchText, serviceType, status]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 页面头部 */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-2xl font-black text-slate-900">
            生态对接
          </h3>
          <p className="text-slate-500 mt-2">
            管理园区内企业提交的生态服务需求，需要扶持时可联系BP诊断运营团队
          </p>
        </div>
        <div className="flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
          <Phone size={16} className="text-indigo-600" />
          <div>
            <div className="text-[10px] text-indigo-400 font-bold">
              BP诊断运营热线
            </div>
            <div className="text-sm font-black text-indigo-600">
              400-888-8888
            </div>
          </div>
        </div>
      </div>

      {/* 筛选和搜索栏 */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="搜索企业名称、需求明细..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              value={searchText}
              onChange={(e) => onSearchTextChange(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            value={serviceType}
            onChange={(e) => onServiceTypeChange(e.target.value)}
          >
            <option value="">全部服务类型</option>
            <option value="法律">法律</option>
            <option value="财税">财税</option>
            <option value="政策申报">政策申报</option>
            <option value="知识产权">知识产权</option>
            <option value="订单对接">订单对接</option>
            <option value="FA顾问">FA顾问</option>
            <option value="品牌PR">品牌PR</option>
            <option value="人才">人才</option>
            <option value="数据">数据</option>
            <option value="云资源">云资源</option>
          </select>
          <select
            className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
          >
            <option value="">全部状态</option>
            <option value="待处理需求">待处理需求</option>
            <option value="处理中需求">处理中需求</option>
            <option value="已完成需求对接">已完成需求对接</option>
          </select>
          <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
            <Download size={16} />
            导出
          </button>
        </div>
      </div>

      {/* 生态需求管理表格 */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                  企业名称
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                  服务类型
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                  需求明细
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                  潜在匹配方
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                  上传时间
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                  对接状态
                </th>
                <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900">
                      {req.companyName}
                    </div>
                    <div className="text-xs text-slate-500">
                      {req.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        [
                          "法律",
                          "财税",
                          "政策申报",
                          "知识产权",
                        ].includes(req.serviceType)
                          ? "bg-emerald-100 text-emerald-700"
                          : ["订单对接", "FA顾问", "品牌PR"].includes(
                              req.serviceType
                            )
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {req.serviceType}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-md">
                    <div className="text-sm text-slate-700 line-clamp-2">
                      {req.requirementDetails}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 flex items-center gap-1">
                      <Users size={14} className="text-slate-400" />
                      {req.potentialPartner}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600">
                      {req.uploadTime}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        req.status === "已完成需求对接"
                          ? "bg-emerald-100 text-emerald-700"
                          : req.status === "处理中需求"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 联系运营说明 */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Phone size={24} />
            </div>
            <div>
              <h4 className="text-lg font-black">需要生态扶持？</h4>
              <p className="text-indigo-100 text-sm">
                如需为园区企业对接生态服务，请联系BP诊断运营团队：400-888-8888
              </p>
            </div>
          </div>
          <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2">
            <Phone size={18} />
            联系运营
          </button>
        </div>
      </div>
    </div>
  );
};
