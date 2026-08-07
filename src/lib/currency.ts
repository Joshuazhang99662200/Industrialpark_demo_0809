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

/**
 * 在原值基础上随机浮动，用于生成 mock 数据。
 * 保留原有的中文单位（万 / 亿），并保证结果不为负数。
 */
export const jitterAmount = (value: string, ratio = 0.05): string => {
  const matched = value.match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  if (!matched) return value;

  const [, numStr, unit] = matched;
  const base = parseFloat(numStr);
  const next = Math.max(0, base * (1 + (Math.random() * 2 - 1) * ratio));
  // 万级的数字取整更自然，亿级/小数值保留一位小数
  const rounded = base >= 100 ? Math.round(next) : Math.round(next * 10) / 10;

  return `${rounded}${unit}`;
};
