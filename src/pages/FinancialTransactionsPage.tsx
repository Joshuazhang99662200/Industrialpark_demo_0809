import {
  Download,
} from "lucide-react";
import { useMemo } from "react";

import { BUSINESS_ORDERS } from "../data/business";
import { ECOSYSTEM_TRANSACTIONS } from "../data/ecosystem";

export const FinancialTransactionsPage = ({
  transactionType,
  onTransactionTypeChange,
}) => {
  // 收入流水筛选逻辑（合并业务流水和生态流水）
  const allFinancialTransactions = useMemo(() => {
    // 将业务流水转换为统一格式（计算分润金额）
    const businessTrans = BUSINESS_ORDERS.map((order) => ({
      id: order.id,
      type: "科技产品",
      projectName: order.projectName,
      category: order.serviceType,
      detail: `${order.serviceType}服务`,
      amount: order.amount,
      profitShare:
        order.status === "已完成" ? order.amount * order.profitRate : 0, // 根据profitRate计算分润
      time: order.uploadTime,
      status: order.status,
      uploader: order.uploader,
      paymentMethod: order.paymentMethod,
    }));

    // 将生态流水转换为统一格式
    const ecoTrans = ECOSYSTEM_TRANSACTIONS.map((trans) => ({
      id: trans.id,
      type: "生态服务",
      projectName: trans.projectName,
      category: trans.serviceType, // 直接使用serviceType（已去掉三大货架）
      detail: trans.serviceType,
      amount: trans.amount,
      profitShare: trans.profitShare,
      time: trans.createdAt,
      status: trans.dealStatus,
      partnerName: trans.partnerName,
      progress: trans.progress,
    }));

    return [...businessTrans, ...ecoTrans];
  }, []);

  const transactions = useMemo(() => {
    let filtered = [...allFinancialTransactions];

    if (transactionType !== "全部") {
      filtered = filtered.filter((trans) => trans.type === transactionType);
    }

    return filtered;
  }, [allFinancialTransactions, transactionType]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 页面头部 */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-2xl font-black text-slate-900">
            收入流水
          </h3>
          <p className="text-slate-500 mt-2">
            查看所有业务订单与生态服务交易的流水记录
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center gap-2">
            <Download size={16} /> 导出报表
          </button>
        </div>
      </div>

      {/* 流水表格 */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800">收入流水明细</h3>
          <div className="flex gap-2">
            {["全部", "科技产品", "生态服务"].map((type) => (
              <button
                key={type}
                onClick={() => onTransactionTypeChange(type)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  transactionType === type
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 w-32">流水编号</th>
              <th className="px-6 py-4 w-28">流水类型</th>
              <th className="px-6 py-4 w-40">项目名称</th>
              <th className="px-6 py-4 w-40">类别</th>
              <th className="px-6 py-4 w-44">明细</th>
              <th className="px-6 py-4 w-28">时间</th>
              <th className="px-6 py-4 w-24">交易金额</th>
              <th className="px-6 py-4 w-24">分润金额</th>
              <th className="px-6 py-4 w-28">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((trans) => (
              <tr
                key={trans.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-5 font-mono text-slate-400 text-xs">
                  {trans.id}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      trans.type === "科技产品"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {trans.type}
                  </span>
                </td>
                <td
                  className="px-6 py-5 text-slate-700 font-medium text-xs max-w-[200px] truncate"
                  title={trans.projectName}
                >
                  {trans.projectName}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className="text-xs font-bold text-slate-600">
                    {trans.category}
                  </span>
                </td>
                <td
                  className="px-6 py-5 text-slate-600 text-xs max-w-[180px] truncate whitespace-nowrap"
                  title={trans.detail}
                >
                  {trans.detail}
                </td>
                <td className="px-6 py-5 text-slate-500 text-xs">
                  {trans.time}
                </td>
                <td className="px-6 py-5 text-slate-900 font-bold">
                  ¥{trans.amount.toLocaleString()}
                </td>
                <td className="px-6 py-5 text-emerald-600 font-bold">
                  {trans.profitShare > 0 ? (
                    `¥${trans.profitShare.toLocaleString()}`
                  ) : (
                    <span className="text-slate-400">-</span>
                  )}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  {trans.type === "科技产品" ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                      已完成
                    </span>
                  ) : (
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${
                        trans.status === "已完成" ||
                        trans.status === "处理完成" ||
                        trans.status === "已完成需求对接"
                          ? "bg-emerald-50 text-emerald-600"
                          : trans.status === "处理中" ||
                            trans.status === "处理中需求"
                          ? "bg-blue-50 text-blue-600"
                          : trans.status === "待处理需求"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-slate-50 text-slate-600"
                      }`}
                    >
                      {trans.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
