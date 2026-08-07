import {
  Plus,
  Edit3,
  Trash2,
} from "lucide-react";
import { SmartStatusBadge } from "../components/common/SmartStatusBadge";

export const UsersPage = ({ users, isAdmin }) => {
  return (
    <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <h3 className="font-bold text-slate-800">系统用户列表</h3>
        <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
          <Plus size={14} /> 新增用户
        </button>
      </div>
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs text-slate-500 font-bold uppercase tracking-wider">
          <tr>
            <th className="px-8 py-5">用户 ID</th>
            <th className="px-8 py-5">姓名</th>
            <th className="px-8 py-5">角色权限</th>
            {isAdmin && <th className="px-8 py-5">所属租户</th>}
            <th className="px-8 py-5">状态</th>
            <th className="px-8 py-5">邮箱</th>
            <th className="px-8 py-5 text-right">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-slate-50 transition-colors"
            >
              <td className="px-8 py-6 font-mono text-xs text-slate-400">
                {user.id}
              </td>
              <td className="px-8 py-6 font-bold text-slate-900">
                {user.name}
              </td>
              <td className="px-8 py-6">
                <span
                  className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                    user.role === "租户管理员"
                      ? "bg-purple-50 text-purple-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {user.role}
                </span>
              </td>
              {isAdmin && (
                <td className="px-8 py-6 text-slate-500">
                  {user.tenant}
                </td>
              )}
              <td className="px-8 py-6">
                <SmartStatusBadge status={user.status} />
              </td>
              <td className="px-8 py-6 text-slate-400 font-mono text-xs">
                {user.email}
              </td>
              <td className="px-8 py-6 text-right">
                <div className="flex justify-end gap-3">
                  <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                    <Edit3 size={16} />
                  </button>
                  <button className="text-slate-400 hover:text-rose-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
