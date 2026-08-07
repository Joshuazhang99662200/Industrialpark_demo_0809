import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { BRAND_STORAGE_KEY, DEFAULT_BRAND, loadBrand, saveBrand } from "../lib/brand";
import { BrandConfig } from "../types";

// ==========================================
// --- 品牌名全局状态（集成控制器） ---
// 任何层级的组件都能直接 useBrand() 读写，不用逐层透传 props
// ==========================================

interface BrandContextValue {
  /** 当前生效的品牌名 */
  brand: BrandConfig;
  /** 应用新的品牌名，同时落盘 */
  setBrand: (next: BrandConfig) => void;
  /** 恢复出厂默认 */
  resetBrand: () => void;
  /** 集成控制器面板是否展开 */
  isControllerOpen: boolean;
  openController: () => void;
  closeController: () => void;
}

const BrandContext = createContext<BrandContextValue | null>(null);

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
  // 初始值直接从 localStorage 读，首屏就是上次保存的名字，不会闪一下默认值
  const [brand, setBrandState] = useState<BrandConfig>(loadBrand);
  const [isControllerOpen, setIsControllerOpen] = useState(false);

  const setBrand = useCallback((next: BrandConfig) => {
    setBrandState(next);
    saveBrand(next);
  }, []);

  const resetBrand = useCallback(() => {
    setBrandState(DEFAULT_BRAND);
    saveBrand(DEFAULT_BRAND);
  }, []);

  // 多个标签页同时开着时，一处改名另一处跟着变
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === BRAND_STORAGE_KEY) {
        setBrandState(loadBrand());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const value = useMemo<BrandContextValue>(
    () => ({
      brand,
      setBrand,
      resetBrand,
      isControllerOpen,
      openController: () => setIsControllerOpen(true),
      closeController: () => setIsControllerOpen(false),
    }),
    [brand, setBrand, resetBrand, isControllerOpen]
  );

  return (
    <BrandContext.Provider value={value}>{children}</BrandContext.Provider>
  );
};

export const useBrand = (): BrandContextValue => {
  const ctx = useContext(BrandContext);
  if (!ctx) {
    throw new Error("useBrand 必须在 <BrandProvider> 内使用");
  }
  return ctx;
};
