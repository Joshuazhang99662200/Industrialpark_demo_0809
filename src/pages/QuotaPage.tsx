import {
  Plus,
  Coins,
} from "lucide-react";

export const QuotaPage = ({ tenants, onAdjustQuota }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {tenants.map((tenant) => (
          <div
            key={tenant.id}
            className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm overflow-hidden relative group hover:shadow-xl transition-all"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Coins className="text-indigo-600" size={100} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                  {tenant.name.substring(0, 1)}
                </div>
                <div>
                  <h4 className="font-black text-lg text-slate-900">
                    {tenant.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {tenant.id}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                    当前消耗 / 总额度
                  </span>
                  <span className="text-2xl font-black text-indigo-600">
                    {tenant.quotaUsed}{" "}
                    <span className="text-xs text-slate-300 font-medium">
                      / {tenant.quotaTotal}
                    </span>
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                  <div
                    className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${
                        (tenant.quotaUsed / tenant.quotaTotal) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <button
                onClick={() => onAdjustQuota(tenant)}
                className="mt-8 w-full py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
              >
                <Plus size={16} /> 增加点数配额
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
