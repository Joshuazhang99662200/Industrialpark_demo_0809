// ==========================================
// --- 金额解析工具 ---
// ==========================================

// 辅助函数：解析带中文单位的金额字符串为数值 (简单实现)
export const parseCurrency = (str: string): number => {
  if (!str) return 0;
  let num = parseFloat(str);
  if (isNaN(num)) return 0;
  if (str.includes("万")) num *= 10000;
  if (str.includes("亿")) num *= 100000000;
  return num;
};
