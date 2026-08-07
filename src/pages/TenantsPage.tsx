import {
  Building2,
} from "lucide-react";
import { SmartStatusBadge } from "../components/common/SmartStatusBadge";
import { Tenant } from "../types";

export const TenantsPage = ({ tenants }: { tenants: Tenant[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      {tenants.map((tenant) => (
        <div
          key={tenant.id}
          className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group"
        >
          <div className="flex justify-between items-start mb-6">
            <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
              <Building2 size={28} />
            </div>
            <SmartStatusBadge status={tenant.status} />
          </div>
          <h3 className="font-black text-xl mb-1 text-slate-900">
            {tenant.name}
          </h3>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">
            {tenant.id}
          </p>
          <div className="space-y-4 pt-4 border-t border-slate-50">
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span className="text-slate-400">联系人</span>
              <span>{tenant.contact}</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-600">
              <span className="text-slate-400">子账号</span>
              <span>{tenant.userCount}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
