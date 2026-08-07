import { BrandConfig } from "../types";

// ==========================================
// --- 品牌名配置（集成控制器） ---
// ==========================================

const STORAGE_KEY = "acture.brand";

export const DEFAULT_BRAND: BrandConfig = {
  platformName: "Acture 智能运营平台",
  parkName: "云创未来产业园",
};

/** 从 localStorage 读取品牌名，读不到或格式不对时回落到默认值 */
export const loadBrand = (): BrandConfig => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_BRAND;

    const parsed = JSON.parse(raw) as Partial<BrandConfig>;
    return {
      platformName: parsed.platformName?.trim() || DEFAULT_BRAND.platformName,
      parkName: parsed.parkName?.trim() || DEFAULT_BRAND.parkName,
    };
  } catch {
    // 隐私模式 / 存了脏数据都走默认值，不能让演示页面崩掉
    return DEFAULT_BRAND;
  }
};

/** 写回 localStorage，失败时静默忽略（不影响当前会话的展示） */
export const saveBrand = (brand: BrandConfig): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(brand));
  } catch {
    /* 忽略写入失败 */
  }
};
