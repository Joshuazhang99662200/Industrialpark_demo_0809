import {
  Plus,
  CheckCircle2,
  Power,
} from "lucide-react";

export const ConfigsPage = ({
  configs,
  activeConfigId,
  onEditConfig,
  onActivateConfig,
  onCreateConfig,
}) => {
  return (
    <div className="space-y-6 relative h-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h3 className="text-2xl font-black text-slate-900">
            配置策略库
          </h3>
          <p className="text-slate-500 mt-2">
            点击配置卡片进入详情页，可进行 Prompt 编排与权重微调。
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
        {configs.map((config) => (
          <div
            key={config.id}
            onClick={() => onEditConfig(config)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer group hover:border-indigo-300 hover:shadow-xl bg-white border-slate-200 relative overflow-hidden flex flex-col`}
          >
            {activeConfigId === config.id && (
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm">
                当前激活
              </div>
            )}

            <div className="mb-4">
              <h4
                className="font-bold text-lg mb-2 text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1"
                title={config.name}
              >
                {config.name}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {config.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-mono text-slate-500 border border-slate-200 truncate max-w-[120px]">
                {config.skillId}
              </div>
              {config.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* 卡片底部的应用按钮区 */}
            <div
              className="pt-4 mt-auto border-t border-slate-50 flex items-center justify-between gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] text-slate-400">
                最后更新: {config.lastUpdated}
              </span>
              {activeConfigId === config.id ? (
                <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold cursor-default flex items-center gap-1">
                  <CheckCircle2 size={14} /> 已应用
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onActivateConfig(config.id);
                  }}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all flex items-center gap-1.5"
                >
                  <Power size={14} /> 应用配置
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* FAB: 新建配置 */}
      <button
        onClick={onCreateConfig}
        className="fixed bottom-10 right-10 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 hover:scale-110 active:scale-95 transition-all flex items-center justify-center z-30 group"
      >
        <Plus
          size={32}
          className="group-hover:rotate-90 transition-transform duration-300"
        />
      </button>
    </div>
  );
};
