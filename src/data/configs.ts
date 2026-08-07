import { ScoringConfig } from "../types";

// ==========================================
// --- 2. 核心业务配置数据 (MOCK_CONFIGS) ---
// ==========================================
export const MOCK_CONFIGS: ScoringConfig[] = [
  {
    id: "CONF-001",
    name: "低空经济专项基金遴选",
    description: "侧重于市场潜力和技术壁垒，适用于低空经济产业园入驻筛选。",
    skillId: "SKILL-LOW-ALTITUDE-2024-V1",
    promptTemplate:
      '{"role": "Investment Analyst", "focus": ["UAM", "Drone Logistics"], "constraints": "High technical barrier required"}',
    weights: [
      {
        id: "team",
        label: "团队背景",
        value: 20,
        color: "bg-blue-500",
        description: "核心成员学历、连续创业经验、行业背景",
      },
      {
        id: "tech",
        label: "技术壁垒",
        value: 30,
        color: "bg-purple-500",
        description: "专利数量、研发投入占比、技术独特性",
      },
      {
        id: "market",
        label: "市场前景",
        value: 40,
        color: "bg-amber-500",
        description: "市场规模(TAM)、增长率(CAGR)、竞争格局",
      },
      {
        id: "finance",
        label: "财务表现",
        value: 10,
        color: "bg-emerald-500",
        description: "营收增速、毛利率、现金流健康度",
      },
    ],
    lastUpdated: "2024-01-26",
    tags: ["专项债", "产业园"],
  },
  {
    id: "CONF-002",
    name: "人工智能种子期海选",
    description: "极度看重团队背景（科学家）和技术创新，忽略早期财务表现。",
    skillId: "SKILL-AI-SEED-2024-V2",
    promptTemplate:
      "Focus on the founding team's academic background and the core algorithm innovation. Ignore short-term revenue.",
    weights: [
      {
        id: "team",
        label: "团队背景",
        value: 45,
        color: "bg-blue-500",
        description: "科学家背景、顶会论文、名校校友",
      },
      {
        id: "tech",
        label: "技术壁垒",
        value: 45,
        color: "bg-purple-500",
        description: "算法领先性、算力资源、数据壁垒",
      },
      {
        id: "market",
        label: "市场前景",
        value: 10,
        color: "bg-amber-500",
        description: "应用场景落地潜力",
      },
      {
        id: "finance",
        label: "财务表现",
        value: 0,
        color: "bg-emerald-500",
        description: "早期项目不做强制要求",
      },
    ],
    lastUpdated: "2024-01-15",
    tags: ["硬科技", "投早投小"],
  },
  {
    id: "CONF-003",
    name: "上市公司并购标的筛选",
    description:
      "寻找营收规模可观，利润为正，且所在赛道具有整合价值的成熟期项目。",
    skillId: "SKILL-MA-MERGER-V1",
    promptTemplate:
      "Identify targets with stable cash flow and strategic value for M&A...",
    weights: [
      {
        id: "team",
        label: "团队背景",
        value: 10,
        color: "bg-blue-500",
        description: "团队稳定性、合规性",
      },
      {
        id: "tech",
        label: "技术壁垒",
        value: 20,
        color: "bg-purple-500",
        description: "技术成熟度、专利布局",
      },
      {
        id: "market",
        label: "市场前景",
        value: 20,
        color: "bg-amber-500",
        description: "市场份额、协同效应",
      },
      {
        id: "finance",
        label: "财务表现",
        value: 50,
        color: "bg-emerald-500",
        description: "净利润、现金流、负债率",
      },
    ],
    lastUpdated: "2024-01-20",
    tags: ["并购", "稳健型"],
  },
  {
    id: "CONF-004",
    name: "Pre-IPO 财务合规筛选",
    description: "针对拟上市企业，重点审查财务合规性、营收规模及利润指标。",
    skillId: "SKILL-PRE-IPO-V3",
    promptTemplate:
      "Strictly check financial compliance and revenue scale for Pre-IPO standards.",
    weights: [
      {
        id: "team",
        label: "团队背景",
        value: 10,
        color: "bg-blue-500",
        description: "管理层稳定性",
      },
      {
        id: "tech",
        label: "技术壁垒",
        value: 10,
        color: "bg-purple-500",
        description: "科创属性",
      },
      {
        id: "market",
        label: "市场前景",
        value: 10,
        color: "bg-amber-500",
        description: "行业地位",
      },
      {
        id: "finance",
        label: "财务表现",
        value: 70,
        color: "bg-emerald-500",
        description: "营收、利润、合规性",
      },
    ],
    lastUpdated: "2024-01-28",
    tags: ["Pre-IPO", "财务审计"],
  },
  {
    id: "CONF-005",
    name: "出海项目专项扶持",
    description: "筛选具备海外市场拓展能力、产品国际化潜力的项目。",
    skillId: "SKILL-GLOBAL-EXPANSION-V1",
    promptTemplate:
      "Evaluate global market potential and team international experience.",
    weights: [
      {
        id: "team",
        label: "团队背景",
        value: 30,
        color: "bg-blue-500",
        description: "海外留学/工作背景",
      },
      {
        id: "tech",
        label: "技术壁垒",
        value: 20,
        color: "bg-purple-500",
        description: "国际专利",
      },
      {
        id: "market",
        label: "市场前景",
        value: 40,
        color: "bg-amber-500",
        description: "海外市场需求、渠道能力",
      },
      {
        id: "finance",
        label: "财务表现",
        value: 10,
        color: "bg-emerald-500",
        description: "海外营收占比",
      },
    ],
    lastUpdated: "2024-01-29",
    tags: ["跨境出海", "国际化"],
  },
];
