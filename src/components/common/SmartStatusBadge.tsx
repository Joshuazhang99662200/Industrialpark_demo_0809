export const SmartStatusBadge = ({
  score,
  status,
}: {
  score?: number;
  status?: string;
}) => {
  if (score !== undefined) {
    let colorClass = "bg-slate-100 text-slate-600";
    let text = "C级";
    if (score >= 90) {
      colorClass = "bg-rose-100 text-rose-700";
      text = "S级";
    } else if (score >= 80) {
      colorClass = "bg-indigo-100 text-indigo-700";
      text = "A级";
    } else if (score >= 70) {
      colorClass = "bg-emerald-100 text-emerald-700";
      text = "B级";
    }
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${colorClass}`}
      >
        {text}
      </span>
    );
  }

  const styles: Record<string, string> = {
    已完成: "bg-emerald-100 text-emerald-700",
    分析中: "bg-blue-100 text-blue-700",
    失败: "bg-rose-100 text-rose-700",
    在线: "bg-emerald-100 text-emerald-700",
    支付成功: "bg-emerald-100 text-emerald-700",
    等待付款: "bg-amber-100 text-amber-700",
    已关闭: "bg-slate-100 text-slate-400",
    启用: "bg-emerald-100 text-emerald-700",
    禁用: "bg-slate-100 text-slate-600",
    离线: "bg-slate-100 text-slate-400",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
        styles[status || ""] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "未知"}
    </span>
  );
};
