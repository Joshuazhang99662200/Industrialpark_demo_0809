import { useState, useMemo } from "react";
import {
  Sliders,
  Sparkles,
  CheckCircle2,
  ArrowLeft,
  Send,
  Save,
  Copy,
  BookOpen,
  AlertTriangle,
} from "lucide-react";

// ==========================================
// --- 组件: Config Detail Editor (配置微调) ---
// ==========================================

export const ConfigDetailEditor = ({
  config,
  allConfigs,
  onClose,
  onUpdate,
  onApply,
}) => {
  const [localWeights, setLocalWeights] = useState(config.weights);
  const [localPrompt, setLocalPrompt] = useState(config.promptTemplate);
  const [activeTab, setActiveTab] = useState("weights");
  const [isOverride, setIsOverride] = useState(false);
  const [promptChatInput, setPromptChatInput] = useState("");
  const [promptChatHistory, setPromptChatHistory] = useState<any[]>([]);

  // 计算总权重
  const totalWeight = useMemo(
    () => localWeights.reduce((sum, w) => sum + w.value, 0),
    [localWeights]
  );
  const isWeightValid = Math.abs(totalWeight - 100) < 0.1;

  const handleWeightChange = (id, newValue) => {
    const validValue = Math.max(0, Math.min(100, newValue));
    const newWeights = localWeights.map((w) =>
      w.id === id ? { ...w, value: validValue } : w
    );
    setLocalWeights(newWeights);
    setIsOverride(true);
  };

  const handleImportConfig = (targetConfigId) => {
    const target = allConfigs.find((c) => c.id === targetConfigId);
    if (target) {
      setLocalWeights(target.weights);
      setLocalPrompt(target.promptTemplate);
      setIsOverride(true);
    }
  };

  const handlePromptChatSend = () => {
    if (!promptChatInput.trim()) return;
    const newHistory = [
      ...promptChatHistory,
      { role: "user", content: promptChatInput },
    ];
    setPromptChatHistory(newHistory);
    setPromptChatInput("");

    // 模拟 AI 修改 Prompt
    setTimeout(() => {
      setPromptChatHistory([
        ...newHistory,
        { role: "ai", content: "已根据您的要求优化了 Prompt 标准。" },
      ]);
      setLocalPrompt(
        (prev) =>
          prev + `\n// Note: Adjusted based on feedback: ${promptChatInput}`
      );
      setIsOverride(true);
    }, 800);
  };

  const handleSave = (isNew) => {
    // 门控机制：如果总和不为100，禁止保存
    if (!isWeightValid) {
      return;
    }
    onUpdate(config.id, localWeights, localPrompt, isNew);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-slate-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-500"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              {config.name}
              {isOverride && (
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full font-bold">
                  已修改
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400">配置ID: {config.id}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleSave(true)}
            className={`flex items-center gap-2 px-4 py-2 bg-white border border-indigo-200 text-indigo-700 rounded-xl font-bold hover:bg-indigo-50 shadow-sm transition-all ${
              !isWeightValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isWeightValid}
          >
            <Copy size={16} /> 另存为新策略(覆盖)
          </button>
          <button
            onClick={() => handleSave(false)}
            className={`flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all ${
              !isWeightValid ? "opacity-50 cursor-not-allowed grayscale" : ""
            }`}
            disabled={!isWeightValid}
          >
            <Save size={16} /> 保存当前配置
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        {/* 中间：Prompt 编辑与调优 */}
        <div className="flex-1 flex flex-col gap-6">
          {/* 上半部分：源码编辑 */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <BookOpen size={18} className="text-indigo-600" />{" "}
                评分与分类标准 (Prompt/JSON)
              </h3>
              <span className="text-xs font-mono bg-slate-200 text-slate-600 px-2 py-1 rounded">
                JSON Mode
              </span>
            </div>
            <textarea
              className="flex-1 p-6 font-mono text-sm text-slate-700 outline-none resize-none leading-relaxed"
              value={localPrompt}
              onChange={(e) => {
                setLocalPrompt(e.target.value);
                setIsOverride(true);
              }}
              spellCheck={false}
            />
          </div>

          {/* 下半部分：Prompt 调优 Chatbot */}
          <div className="h-64 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <div className="p-3 border-b border-slate-100 bg-slate-50 flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-600" />
              <span className="text-xs font-bold text-slate-700">
                Prompt 调优助手
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
              {promptChatHistory.length === 0 && (
                <p className="text-xs text-slate-400 text-center mt-4">
                  输入指令（如“提高对技术专利的重视程度”），AI 将自动调整上方
                  Prompt。
                </p>
              )}
              {promptChatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[90%] px-3 py-2 rounded-xl text-xs ${
                      msg.role === "user"
                        ? "bg-indigo-100 text-indigo-800"
                        : "bg-white border border-slate-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 border-t border-slate-100 flex gap-2">
              <input
                className="flex-1 bg-slate-100 rounded-lg px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="输入优化指令..."
                value={promptChatInput}
                onChange={(e) => setPromptChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handlePromptChatSend()}
              />
              <button
                onClick={handlePromptChatSend}
                className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 右侧边栏：引用器 & 调整器 */}
        <div className="w-96 flex flex-col gap-6">
          {/* 右上：配置引用器 */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 h-fit">
            <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold text-sm">
              <Copy size={16} className="text-indigo-500" /> 引用其他配置
            </div>
            <div className="space-y-2">
              <p className="text-xs text-slate-400 mb-2">
                快速应用其他配置的权重与标准作为基准：
              </p>
              <select
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium outline-none text-slate-700"
                onChange={(e) => handleImportConfig(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>
                  选择配置模板...
                </option>
                {allConfigs
                  .filter((c) => c.id !== config.id)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* 右下：评分配置标准调整器 (Weights) */}
          <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 mb-4 text-slate-800 font-bold text-sm">
              <Sliders size={16} className="text-indigo-500" /> 评分权重配置
            </div>
            <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
              {localWeights.map((w) => (
                <div key={w.id} className="group">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${w.color}`}
                      ></span>{" "}
                      {w.label}
                    </span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={w.value}
                        onChange={(e) =>
                          handleWeightChange(w.id, parseFloat(e.target.value))
                        }
                        className="w-12 text-right bg-slate-50 border border-slate-200 rounded px-1 py-0.5 text-xs font-mono font-bold text-indigo-600 focus:outline-none focus:border-indigo-500"
                      />
                      <span className="text-xs text-slate-400">%</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={w.value}
                    onChange={(e) =>
                      handleWeightChange(w.id, parseFloat(e.target.value))
                    }
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              ))}
            </div>

            {/* 底部：门控校验 */}
            <div
              className={`mt-4 pt-4 border-t ${
                isWeightValid ? "border-slate-100" : "border-rose-100"
              } text-center transition-colors`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-500">当前总权重:</span>
                <span
                  className={`text-sm font-black font-mono ${
                    isWeightValid ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {totalWeight}%
                </span>
              </div>
              {!isWeightValid && (
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-rose-500 font-bold bg-rose-50 py-1.5 rounded-lg">
                  <AlertTriangle size={12} />
                  总和必须等于 100% 才能保存
                </div>
              )}
              {isWeightValid && (
                <div className="text-[10px] text-emerald-600 font-bold bg-emerald-50 py-1.5 rounded-lg flex items-center justify-center gap-1">
                  <CheckCircle2 size={12} /> 配置校验通过
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
