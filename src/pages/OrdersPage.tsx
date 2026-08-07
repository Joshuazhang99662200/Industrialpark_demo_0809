import { SmartStatusBadge } from "../components/common/SmartStatusBadge";

export const OrdersPage = ({ orders, isAdmin }) => {
  return (
    <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-800">点数流水记录</h3>
        <div className="text-xs font-bold text-slate-400">
          仅展示近 90 天订单
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="px-8 py-5">流水单号</th>
              <th className="px-8 py-5">点数类型</th>
              <th className="px-8 py-5">点数数值</th>
              {isAdmin && <th className="px-8 py-5">关联租户</th>}
              <th className="px-8 py-5">状态</th>
              <th className="px-8 py-5">发生时间</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-slate-50 transition-colors"
              >
                <td className="px-8 py-6 font-mono text-xs">
                  {order.id}
                </td>
                <td className="px-8 py-6 font-bold">{order.type}</td>
                <td className="px-8 py-6 font-black text-indigo-600">
                  {order.amount.toLocaleString()}{" "}
                  <span className="text-[10px] font-bold text-slate-400">
                    点
                  </span>
                </td>
                {isAdmin && (
                  <td className="px-8 py-6 text-slate-500">
                    {order.tenant}
                  </td>
                )}
                <td className="px-8 py-6">
                  <SmartStatusBadge status={order.status} />
                </td>
                <td className="px-8 py-6 text-slate-400 text-xs">
                  {order.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
