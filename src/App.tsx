import { useState, useMemo, useEffect } from "react";

import { MOCK_CONFIGS } from "./data/configs";
import { MOCK_OLD_DATA } from "./data/operations";
import { MOCK_EXTENDED_PROJECTS } from "./data/projects";
import {
  FilterCondition,
  FinancialTransactionFilter,
  Project,
  ScoringConfig,
  TabKey,
  Tenant,
  WeightItem,
} from "./types";

import { QuotaAdjustDrawer } from "./components/common/QuotaDrawer";
import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { AdvancedFilterModal } from "./components/modals/AdvancedFilterModal";
import { BatchUploadModal } from "./components/modals/BatchUploadModal";
import { ConfigDetailEditor } from "./components/modals/ConfigDetailEditor";
import { ProjectDetailModal } from "./components/modals/ProjectDetailModal";
import { PromptOptimizer } from "./components/modals/PromptOptimizer";

import {
  ConfigsPage,
  DashboardPage,
  EcosystemConnectPage,
  EcosystemDashboardPage,
  EcosystemPartnersPage,
  FinancialDashboardPage,
  FinancialTransactionsPage,
  OrdersPage,
  ProjectLibraryPage,
  QuotaPage,
  TenantsPage,
  UsersPage,
} from "./pages";

// 仅管理员可见的页面，切回租户视角时需要跳走
const ADMIN_ONLY_TABS: TabKey[] = ["tenants", "ecosystem_partners"];

// ==========================================
// --- 主应用组件 ---
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>("dashboard"); // Default to dashboard for tenant view
  const [activeConfigId, setActiveConfigId] = useState("CONF-001");
  const [configs, setConfigs] = useState<ScoringConfig[]>(MOCK_CONFIGS);

  // 状态管理
  const [isAdmin, setIsAdmin] = useState(false); // 默认为租户视角
  const [showPromptOptimizer, setShowPromptOptimizer] = useState(false);
  const [editingConfig, setEditingConfig] = useState<ScoringConfig | null>(
    null
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTenant, setActiveTenant] = useState<Tenant | null>(null);

  // 筛选器状态
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterConditions, setFilterConditions] = useState<FilterCondition[]>(
    []
  );

  // 项目库搜索状态
  const [projectSearchText, setProjectSearchText] = useState("");

  // 批量上传状态
  const [isBatchUploadModalOpen, setIsBatchUploadModalOpen] = useState(false);

  // 生态对接筛选状态
  const [ecoSearchText, setEcoSearchText] = useState("");
  const [ecoServiceType, setEcoServiceType] = useState("");
  const [ecoStatus, setEcoStatus] = useState("");

  // 收入流水筛选状态
  const [financialTransactionType, setFinancialTransactionType] =
    useState<FinancialTransactionFilter>("全部");

  // 生态服务分润的展开/折叠状态
  const [isEcoServiceExpanded, setIsEcoServiceExpanded] = useState(false);

  const currentConfig = useMemo(
    () => configs.find((c) => c.id === activeConfigId) || configs[0],
    [configs, activeConfigId]
  );

  // 监听身份切换，如果切换为普通用户且当前在管理员独有页面，则跳转
  useEffect(() => {
    if (!isAdmin && ADMIN_ONLY_TABS.includes(activeTab)) {
      setActiveTab("dashboard");
    }
  }, [isAdmin, activeTab]);

  const updateConfig = (
    id: string,
    newWeights: WeightItem[],
    newPrompt: string,
    isNewVersion: boolean
  ) => {
    if (isNewVersion) {
      const original = configs.find((c) => c.id === id);
      if (!original) return;
      const newConfig = {
        ...original,
        id: `CONF-OVERRIDE-${Date.now()}`,
        name: `${original.name} (副本)`,
        weights: newWeights,
        promptTemplate: newPrompt,
        lastUpdated: "刚刚",
      };
      setConfigs([...configs, newConfig]);
      setActiveConfigId(newConfig.id);
    } else {
      setConfigs(
        configs.map((c) =>
          c.id === id
            ? { ...c, weights: newWeights, promptTemplate: newPrompt }
            : c
        )
      );
    }
  };

  const handleConfigGenerated = (newConfig: ScoringConfig) => {
    setConfigs([...configs, newConfig]);
    setActiveConfigId(newConfig.id);
    setActiveTab("project_library");
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Modals & Drawers */}
      {showPromptOptimizer && (
        <PromptOptimizer
          onClose={() => setShowPromptOptimizer(false)}
          onGenerate={handleConfigGenerated}
          allConfigs={configs}
        />
      )}
      {editingConfig && (
        <ConfigDetailEditor
          config={editingConfig}
          allConfigs={configs}
          onClose={() => setEditingConfig(null)}
          onUpdate={updateConfig}
          onApply={(id: string) => setActiveConfigId(id)}
        />
      )}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          config={currentConfig}
          onClose={() => setSelectedProject(null)}
          isAdmin={isAdmin}
        />
      )}
      <BatchUploadModal
        isOpen={isBatchUploadModalOpen}
        onClose={() => setIsBatchUploadModalOpen(false)}
      />
      <AdvancedFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApply={setFilterConditions}
        initialConditions={filterConditions}
      />

      {/* 配额充值抽屉 */}
      <QuotaAdjustDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeTenant={activeTenant}
      />

      {/* 侧边导航栏 */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isAdmin={isAdmin}
        onToggleRole={() => setIsAdmin(!isAdmin)}
      />

      {/* 主内容区域 */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
        <Header
          activeTab={activeTab}
          isAdmin={isAdmin}
          currentConfigName={currentConfig.name}
        />

        <div className="flex-1 overflow-auto p-8">
          {/* --- 0. 仪表盘 (新增) --- */}
          {activeTab === "dashboard" && (
            <DashboardPage projects={MOCK_EXTENDED_PROJECTS} />
          )}

          {/* --- 1. 项目库 (核心业务) --- */}
          {activeTab === "project_library" && (
            <ProjectLibraryPage
              searchText={projectSearchText}
              onSearchTextChange={setProjectSearchText}
              filterConditions={filterConditions}
              onOpenFilter={() => setIsFilterModalOpen(true)}
              onOpenBatchUpload={() => setIsBatchUploadModalOpen(true)}
              onSelectProject={setSelectedProject}
            />
          )}

          {/* --- 2. 配置管理器 (核心业务) --- */}
          {activeTab === "configs" && (
            <ConfigsPage
              configs={configs}
              activeConfigId={activeConfigId}
              onEditConfig={setEditingConfig}
              onActivateConfig={setActiveConfigId}
              onCreateConfig={() => setShowPromptOptimizer(true)}
            />
          )}

          {/* --- 生态对接页面 --- */}
          {activeTab === "ecosystem_connect" && (
            <EcosystemConnectPage
              searchText={ecoSearchText}
              onSearchTextChange={setEcoSearchText}
              serviceType={ecoServiceType}
              onServiceTypeChange={setEcoServiceType}
              status={ecoStatus}
              onStatusChange={setEcoStatus}
            />
          )}

          {/* --- 生态看板页面 --- */}
          {activeTab === "ecosystem_dashboard" && (
            <EcosystemDashboardPage
              onNavigateToConnect={() => setActiveTab("ecosystem_connect")}
            />
          )}

          {/* --- 生态资源方管理页面 --- */}
          {activeTab === "ecosystem_partners" && isAdmin && (
            <EcosystemPartnersPage />
          )}

          {/* --- 收入看板页面 --- */}
          {activeTab === "financial_dashboard" && (
            <FinancialDashboardPage
              isEcoServiceExpanded={isEcoServiceExpanded}
              onToggleEcoService={() =>
                setIsEcoServiceExpanded(!isEcoServiceExpanded)
              }
            />
          )}

          {/* --- 收入流水页面（合并业务流水与生态流水） --- */}
          {activeTab === "financial_transactions" && (
            <FinancialTransactionsPage
              transactionType={financialTransactionType}
              onTransactionTypeChange={setFinancialTransactionType}
            />
          )}

          {/* --- 4. 订单管理视图 --- */}
          {activeTab === "orders" && (
            <OrdersPage orders={MOCK_OLD_DATA.orders} isAdmin={isAdmin} />
          )}

          {/* --- 5. 租户管理视图 --- */}
          {activeTab === "tenants" && (
            <TenantsPage tenants={MOCK_OLD_DATA.tenants} />
          )}

          {/* --- 6. 用户管理视图 --- */}
          {activeTab === "users" && (
            <UsersPage users={MOCK_OLD_DATA.users} isAdmin={isAdmin} />
          )}

          {/* --- 7. 配额管理视图 --- */}
          {activeTab === "quota" && (
            <QuotaPage
              tenants={MOCK_OLD_DATA.tenants}
              onAdjustQuota={(tenant: Tenant) => {
                setActiveTenant(tenant);
                setDrawerOpen(true);
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}
