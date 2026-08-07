// ==========================================
// --- 全局类型定义 ---
// ==========================================

// ---------- 导航 ----------

export type TabKey =
  | "dashboard"
  | "project_library"
  | "configs"
  | "ecosystem_dashboard"
  | "ecosystem_connect"
  | "ecosystem_partners"
  | "financial_dashboard"
  | "financial_transactions"
  | "orders"
  | "tenants"
  | "users"
  | "quota";

// ---------- 项目 ----------

export interface RawScores {
  team: number;
  tech: number;
  market: number;
  finance: number;
}

export interface DetailedScores {
  team: { ceo: number; teamAvg: number; total: number };
  tech: { moat: number; product: number; track: number; total: number };
  ops: { financial: number; operational: number; total: number };
  capital: { history: number; total: number };
}

export interface Project {
  id: string;
  name: string;
  companyName: string;
  legalRep: string;
  established: string;
  location: string;
  scale: string;
  oneLiner: string;
  productIntro: string;
  keyClients: string;
  investors: string;
  track: string;
  trackLevel: string;
  source: string;
  scenario: string[];
  revenue: string;
  profit: string;
  funding: string;
  valuation: string;
  uploaderId: string;
  /** 部分种子数据没有填写上传人姓名 */
  uploaderName?: string;
  contact: string;
  fileName: string;
  reportName: string;
  submitTime: string;
  tenant: string;
  tags: string[];
  rawScores: RawScores;
  detailedScores: DetailedScores;
  assessmentBrief: string;
  details: { missingModules: number; evaluation: string };
  score: number;
}

// ---------- 评分配置 ----------

export interface WeightItem {
  id: string;
  label: string;
  value: number;
  color: string;
  description: string;
}

export interface ScoringConfig {
  id: string;
  name: string;
  description: string;
  skillId: string;
  promptTemplate: string;
  weights: WeightItem[];
  lastUpdated: string;
  tags: string[];
}

// ---------- 基础运营 ----------

export interface OperationTask {
  id: string;
  tenant: string;
  user: string;
  status: string;
  time: string;
  fileName: string;
}

export interface PointOrder {
  id: string;
  tenant: string;
  type: string;
  amount: number;
  status: string;
  time: string;
}

export interface Tenant {
  id: string;
  name: string;
  contact: string;
  status: string;
  quotaUsed: number;
  quotaTotal: number;
  userCount: number;
}

export interface SystemUser {
  id: string;
  name: string;
  role: string;
  tenant: string;
  status: string;
  email: string;
}

export interface OperationsData {
  tasks: OperationTask[];
  orders: PointOrder[];
  tenants: Tenant[];
  users: SystemUser[];
}

// ---------- 业务流水 ----------

export interface BusinessOrder {
  id: string;
  uploader: string;
  uploadTime: string;
  serviceType: string;
  paymentMethod: string;
  amount: number;
  profitRate: number;
  status: string;
  projectName: string;
}

// ---------- 生态 ----------

export interface EcosystemTransaction {
  id: string;
  projectName: string;
  serviceType: string;
  dealStatus: string;
  progress: string;
  partnerName: string;
  amount: number;
  profitShare: number;
  createdAt: string;
  updatedAt: string;
}

export interface EcosystemServiceRequest {
  id: string;
  companyName: string;
  serviceType: string;
  requirementDetails: string;
  potentialPartner: string;
  uploadTime: string;
  status: string;
  createdAt: Date;
}

export interface EcosystemPartner {
  id: string;
  name: string;
  category: string;
  serviceType: string;
  contactPerson: string;
  phone: string;
  email: string;
  cooperationStartDate: string;
  lastActiveDate: string;
  totalRevenue: number;
  totalProfit: number;
  serviceCount: number;
  status: "active" | "inactive";
}

export interface EcosystemServiceRecord {
  id: string;
  partnerId: string;
  partnerName: string;
  projectName: string;
  companyName: string;
  serviceType: string;
  serviceDetail: string;
  serviceDate: string;
  serviceAmount: number;
  profitShare: number;
  profitRate: number;
  status: string;
}

// ---------- 收入流水（业务 + 生态合并后的统一格式） ----------

export type FinancialTransactionType = "科技产品" | "生态服务";
export type FinancialTransactionFilter = "全部" | FinancialTransactionType;

export interface FinancialTransaction {
  id: string;
  type: FinancialTransactionType;
  projectName: string;
  category: string;
  detail: string;
  amount: number;
  profitShare: number;
  time: string;
  status: string;
  uploader?: string;
  paymentMethod?: string;
  partnerName?: string;
  progress?: string;
}

// ---------- 高级筛选 ----------

export type FilterField =
  | "name"
  | "track"
  | "tenant"
  | "revenue"
  | "profit"
  | "score";

export type FilterOperator = "eq" | "contains" | "not_contains" | "gt" | "lt";

export type FilterLogic = "and" | "or";

export interface FilterCondition {
  id: string;
  field: FilterField;
  operator: FilterOperator;
  value: string;
  logic: FilterLogic;
}

// ---------- 其它 ----------

/** 环形图 / 图例的数据点 */
export interface ChartDatum {
  name: string;
  value: number;
}

export interface ChatMessage {
  role: "ai" | "user";
  content: string;
}
