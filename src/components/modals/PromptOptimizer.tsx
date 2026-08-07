import { useState } from "react";

import { ChatMessage, ScoringConfig } from "../../types";
import {
  FileText,
  Plus,
  X,
  Sparkles,
  UploadCloud,
  CheckCircle2,
  Send,
} from "lucide-react";

// ==========================================
// --- 组件: Prompt Optimizer (Gemini Studio Layout) ---
// ==========================================

export const PromptOptimizer = ({
  onClose,
  onGenerate,
  allConfigs,
}: {
  onClose: () => void;
  onGenerate: (config: ScoringConfig) => void;
  allConfigs: ScoringConfig[];
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "ai",
      content:
        "您好！我是您的 AI 配置助手。请描述您的筛选目标（例如：“筛选硬科技属性强的初创企业”）。您也可以上传评分标准文档，或引用现有配置进行修改。",
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsgs: ChatMessage[] = [
      ...messages,
      { role: "user", content: input },
    ];
    setMessages(newMsgs);
    setInput("");

    setTimeout(() => {
      if (step === 0) {
        setMessages([
          ...newMsgs,
          {
            role: "ai",
            content: "已解析需求。正在结合上下文构建 Skill 配置...",
          },
        ]);
        setStep(1);
        setTimeout(() => setStep(2), 1500);
      }
    }, 800);
  };

  const handleGenerateConfirm = () => {
    const newConfig: ScoringConfig = {
      id: `CONF-NEW-${Date.now()}`,
      name: "AI 生成-定制化筛选",
      description: "由配置助手根据您的对话自动生成。",
      skillId: `SKILL-GEN-${Math.floor(Math.random() * 10000)}`,
      promptTemplate:
        '{"role": "Custom Analyst", "objective": "Identify high potential startups based on user input..."}',
      weights: [
        {
          id: "team",
          label: "团队背景",
          value: 30,
          color: "bg-blue-500",
          description: "AI生成标准",
        },
        {
          id: "tech",
          label: "技术壁垒",
          value: 50,
          color: "bg-purple-500",
          description: "AI生成标准",
        },
        {
          id: "market",
          label: "市场前景",
          value: 15,
          color: "bg-amber-500",
          description: "AI生成标准",
        },
        {
          id: "finance",
          label: "财务表现",
          value: 5,
          color: "bg-emerald-500",
          description: "AI生成标准",
        },
      ],
      lastUpdated: new Date().toLocaleDateString(),
      tags: ["AI生成"],
    };
    onGenerate(newConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-5xl h-[80vh] bg-white rounded-3xl shadow-2xl flex overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500"
        >
          <X size={20} />
        </button>

        {/* 左侧：对话区 */}
        <div className="flex-1 flex flex-col border-r border-slate-100">
          <div className="p-6 border-b border-slate-100 bg-white">
            <h3 className="font-black text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="text-indigo-600" size={20} />
              配置生成助手
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              基于 Kimi Thinking 模型 · 上下文感知
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : "bg-white border border-slate-200 text-slate-700 rounded-bl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {step === 2 && (
              <div className="flex justify-start">
                <div className="bg-white border border-indigo-100 p-5 rounded-2xl rounded-bl-none shadow-md w-72">
                  <div className="flex items-center gap-2 mb-3 text-indigo-700 font-bold text-sm">
                    <CheckCircle2 size={16} /> 配置已生成
                  </div>
                  <div className="space-y-2 mb-4 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span>Skill ID:</span>{" "}
                      <span className="font-mono bg-slate-100 px-1 rounded">
                        GEN-X829
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>重点维度:</span> <span>技术壁垒 (50%)</span>
                    </div>
                  </div>
                  <button
                    onClick={handleGenerateConfirm}
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs hover:bg-indigo-700"
                  >
                    应用并重排项目库
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 底部输入区 (Gemini Style) */}
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2 bg-slate-100 rounded-2xl px-2 py-2 border border-transparent focus-within:border-indigo-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
              <div className="flex items-center gap-1 pr-1">
                <button
                  className="p-3 text-slate-500 hover:text-indigo-600 hover:bg-slate-200 rounded-xl transition-colors"
                  title="上传参考文档"
                >
                  <Plus size={20} />
                </button>
              </div>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="在此输入您的筛选逻辑..."
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium h-12 px-4 text-slate-800 placeholder:text-slate-400"
                disabled={step === 2}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || step === 2}
                className={`p-3 rounded-xl transition-all flex items-center justify-center ${
                  input.trim()
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-slate-300 text-slate-100"
                }`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 右侧：上下文/文档暂存区 */}
        <div className="w-80 bg-slate-50 p-6 flex flex-col border-l border-slate-200">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            参考文档 / 上下文
          </h4>
          <div className="flex-1 space-y-3 overflow-y-auto">
            <div className="p-4 bg-white border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-center gap-2 text-slate-400 cursor-pointer hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50/30 transition-all">
              <UploadCloud size={24} />
              <span className="text-xs font-bold">点击上传 PDF/Word</span>
            </div>
            {/* 模拟已上传文件 */}
            <div className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="w-8 h-8 bg-red-50 text-red-500 rounded-lg flex items-center justify-center">
                <FileText size={16} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-slate-700 truncate">
                  园区准入标准_2024.pdf
                </p>
                <p className="text-[10px] text-slate-400">已解析 • 2.4MB</p>
              </div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500 leading-relaxed">
              <strong className="text-slate-700">提示：</strong>{" "}
              右侧上传的文档将作为 AI 的知识库（RAG），辅助生成更精准的 Skill ID
              和评分权重。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
