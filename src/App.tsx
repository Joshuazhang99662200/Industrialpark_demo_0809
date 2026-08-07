import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  LayoutGrid,
  FileText,
  ShoppingCart,
  Building2,
  Users,
  Layers,
  Download,
  Plus,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  UserCircle,
  LogOut,
  X,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Clock,
  AlertCircle,
  ChevronDown,
  BarChart3,
  FileDown,
  Settings,
  Coins,
  Sliders,
  Database,
  PieChart,
  Activity,
  Briefcase,
  Target,
  Zap,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Bot,
  Sparkles,
  MessageSquare,
  UploadCloud,
  Upload,
  CheckCircle2,
  RotateCcw,
  ArrowLeft,
  Paperclip,
  Send,
  Edit3,
  Save,
  Code,
  FileUp,
  Cpu,
  Copy,
  Calculator,
  BookOpen,
  TrendingUp,
  Wallet,
  Banknote,
  Power,
  Play,
  AlertTriangle,
  Trash2,
  ShieldCheck,
  User,
  LayoutDashboard,
  LineChart,
  ChevronUp,
  Landmark,
  MapPin,
  Calendar,
  Briefcase as BriefcaseIcon,
  Share2,
  Phone,
  UserCheck,
  Handshake,
  Receipt,
  Scale,
  Megaphone,
  Building,
  HeartHandshake,
  DollarSign,
  CreditCard,
  Network,
  Globe,
  Newspaper,
  Circle,
  Shield,
  Cloud,
  Package,
  Bell,
  Link,
} from "lucide-react";

// ==========================================
// --- 1. 基础运营数据 (Legacy / 修复项) ---
// ==========================================
const MOCK_OLD_DATA = {
  tasks: [
    {
      id: "FLOW-241024-01",
      tenant: "阿里巴巴",
      user: "张三",
      status: "已完成",
      time: "2023-10-24 14:20",
      fileName: "智能机器人项目.pdf",
    },
    {
      id: "FLOW-241024-02",
      tenant: "腾讯",
      user: "李四",
      status: "分析中",
      time: "2023-10-24 15:10",
      fileName: "新能源车出海计划.pdf",
    },
    {
      id: "FLOW-241024-03",
      tenant: "字节跳动",
      user: "王五",
      status: "失败",
      time: "2023-10-24 16:05",
      fileName: "教育大模型方案.pdf",
    },
    {
      id: "FLOW-241025-01",
      tenant: "阿里巴巴",
      user: "赵六",
      status: "已完成",
      time: "2023-10-25 09:30",
      fileName: "跨境电商物流.pdf",
    },
  ],
  orders: [
    {
      id: "ORD-20231001",
      tenant: "阿里巴巴",
      type: "基础点数包充值",
      amount: 5000,
      status: "支付成功",
      time: "2023-10-24 10:00",
    },
    {
      id: "ORD-20231002",
      tenant: "腾讯",
      type: "专业版点数续费",
      amount: 12000,
      status: "等待付款",
      time: "2023-10-24 11:30",
    },
    {
      id: "ORD-20231003",
      tenant: "字节跳动",
      type: "加购额外点数",
      amount: 2000,
      status: "支付成功",
      time: "2023-10-24 14:45",
    },
    {
      id: "ORD-20231004",
      tenant: "百度",
      type: "基础点数包充值",
      amount: 5000,
      status: "已关闭",
      time: "2023-10-24 16:20",
    },
  ],
  tenants: [
    {
      id: "TEN-01",
      name: "阿里巴巴",
      contact: "马云",
      status: "启用",
      quotaUsed: 450,
      quotaTotal: 1000,
      userCount: 12,
    },
    {
      id: "TEN-02",
      name: "腾讯",
      contact: "马化腾",
      status: "启用",
      quotaUsed: 820,
      quotaTotal: 1500,
      userCount: 8,
    },
    {
      id: "TEN-03",
      name: "字节跳动",
      contact: "张一鸣",
      status: "禁用",
      quotaUsed: 120,
      quotaTotal: 500,
      userCount: 5,
    },
  ],
  users: [
    {
      id: "U-01",
      name: "张三",
      role: "租户管理员",
      tenant: "阿里巴巴",
      status: "在线",
      email: "zhang@ali.com",
    },
    {
      id: "U-02",
      name: "李四",
      role: "普通用户",
      tenant: "腾讯",
      status: "离线",
      email: "li@tencent.com",
    },
    {
      id: "U-03",
      name: "王五",
      role: "普通用户",
      tenant: "字节跳动",
      status: "离线",
      email: "wang@bytedance.com",
    },
    {
      id: "U-04",
      name: "赵六",
      role: "普通用户",
      tenant: "阿里巴巴",
      status: "在线",
      email: "zhao@ali.com",
    },
  ],
};

// ==========================================
// --- 1.1 生态伙伴数据 ---
// ==========================================
// ==========================================
// --- 1.2 业务流水数据 ---
// 分润规则：Uni(299元, 30%), DUO(599元, 35%), Tri(1999元, 30%), Omni(1299元, 35%)
// ==========================================
const BUSINESS_ORDERS = [
  {
    id: "BIZ-20240101-001",
    uploader: "张三",
    uploadTime: "2024-01-15 10:30",
    serviceType: "Uni",
    paymentMethod: "企业转账",
    amount: 299,
    profitRate: 0.3,
    status: "已完成",
    projectName: "智航低空物流网络",
  },
  {
    id: "BIZ-20240102-002",
    uploader: "李四",
    uploadTime: "2024-01-16 14:20",
    serviceType: "DUO",
    paymentMethod: "支付宝",
    amount: 599,
    profitRate: 0.35,
    status: "已完成",
    projectName: "DeepSeeker 医疗影像大模型",
  },
  {
    id: "BIZ-20240103-003",
    uploader: "王五",
    uploadTime: "2024-01-17 09:15",
    serviceType: "Tri",
    paymentMethod: "微信支付",
    amount: 1999,
    profitRate: 0.3,
    status: "已完成",
    projectName: "绿能储能聚合平台",
  },
  {
    id: "BIZ-20240104-004",
    uploader: "赵六",
    uploadTime: "2024-01-18 16:45",
    serviceType: "Omni",
    paymentMethod: "企业转账",
    amount: 1299,
    profitRate: 0.35,
    status: "已完成",
    projectName: "星舰商业航天发射服务",
  },
  {
    id: "BIZ-20240105-005",
    uploader: "钱七",
    uploadTime: "2024-02-19 11:30",
    serviceType: "Uni",
    paymentMethod: "银行卡",
    amount: 299,
    profitRate: 0.3,
    status: "已完成",
    projectName: "云边协同智能工厂",
  },
  {
    id: "BIZ-20240106-006",
    uploader: "孙八",
    uploadTime: "2024-02-20 08:00",
    serviceType: "DUO",
    paymentMethod: "支付宝",
    amount: 599,
    profitRate: 0.35,
    status: "已完成",
    projectName: "固态电池量产平台",
  },
  {
    id: "BIZ-20240107-007",
    uploader: "周九",
    uploadTime: "2024-03-21 15:20",
    serviceType: "Tri",
    paymentMethod: "企业转账",
    amount: 1999,
    profitRate: 0.3,
    status: "已完成",
    projectName: "脑机接口康复系统",
  },
  {
    id: "BIZ-20240108-008",
    uploader: "吴十",
    uploadTime: "2024-03-22 13:40",
    serviceType: "Omni",
    paymentMethod: "微信支付",
    amount: 1299,
    profitRate: 0.35,
    status: "已完成",
    projectName: "量子通信组网平台",
  },
  {
    id: "BIZ-20240109-009",
    uploader: "郑一",
    uploadTime: "2024-04-05 10:20",
    serviceType: "Uni",
    paymentMethod: "企业转账",
    amount: 299,
    profitRate: 0.3,
    status: "已完成",
    projectName: "AI内容生成平台",
  },
  {
    id: "BIZ-20240110-010",
    uploader: "冯二",
    uploadTime: "2024-04-12 14:30",
    serviceType: "DUO",
    paymentMethod: "支付宝",
    amount: 599,
    profitRate: 0.35,
    status: "已完成",
    projectName: "智能仓储管理系统",
  },
  {
    id: "BIZ-20240111-011",
    uploader: "陈三",
    uploadTime: "2024-05-08 09:15",
    serviceType: "Tri",
    paymentMethod: "微信支付",
    amount: 1999,
    profitRate: 0.3,
    status: "已完成",
    projectName: "新能源车充电网络",
  },
  {
    id: "BIZ-20240112-012",
    uploader: "褚四",
    uploadTime: "2024-05-15 16:00",
    serviceType: "Omni",
    paymentMethod: "企业转账",
    amount: 1299,
    profitRate: 0.35,
    status: "已完成",
    projectName: "工业互联网平台",
  },
  {
    id: "BIZ-20240113-013",
    uploader: "卫五",
    uploadTime: "2024-06-03 11:20",
    serviceType: "Uni",
    paymentMethod: "支付宝",
    amount: 299,
    profitRate: 0.3,
    status: "已完成",
    projectName: "社区团购SaaS",
  },
  {
    id: "BIZ-20240114-014",
    uploader: "蒋六",
    uploadTime: "2024-06-18 10:45",
    serviceType: "DUO",
    paymentMethod: "微信支付",
    amount: 599,
    profitRate: 0.35,
    status: "已完成",
    projectName: "智慧农业监测平台",
  },
  {
    id: "BIZ-20240115-015",
    uploader: "沈七",
    uploadTime: "2024-07-10 14:30",
    serviceType: "Tri",
    paymentMethod: "企业转账",
    amount: 1999,
    profitRate: 0.3,
    status: "已完成",
    projectName: "在线教育平台",
  },
  {
    id: "BIZ-20240116-016",
    uploader: "韩八",
    uploadTime: "2024-07-22 09:00",
    serviceType: "Omni",
    paymentMethod: "支付宝",
    amount: 1299,
    profitRate: 0.35,
    status: "已完成",
    projectName: "跨境电商物流系统",
  },
  {
    id: "BIZ-20240117-017",
    uploader: "杨九",
    uploadTime: "2024-08-05 15:20",
    serviceType: "Uni",
    paymentMethod: "企业转账",
    amount: 299,
    profitRate: 0.3,
    status: "已完成",
    projectName: "智能客服系统",
  },
  {
    id: "BIZ-20240118-018",
    uploader: "朱十",
    uploadTime: "2024-08-19 11:40",
    serviceType: "DUO",
    paymentMethod: "微信支付",
    amount: 599,
    profitRate: 0.35,
    status: "已完成",
    projectName: "供应链金融平台",
  },
  {
    id: "BIZ-20240119-019",
    uploader: "秦一",
    uploadTime: "2024-09-08 10:15",
    serviceType: "Tri",
    paymentMethod: "支付宝",
    amount: 1999,
    profitRate: 0.3,
    status: "已完成",
    projectName: "智慧城市管理平台",
  },
  {
    id: "BIZ-20240120-020",
    uploader: "尤二",
    uploadTime: "2024-09-25 14:00",
    serviceType: "Omni",
    paymentMethod: "企业转账",
    amount: 1299,
    profitRate: 0.35,
    status: "已完成",
    projectName: "企业数字化转型服务",
  },
  {
    id: "BIZ-20240121-021",
    uploader: "许三",
    uploadTime: "2024-10-12 09:30",
    serviceType: "Uni",
    paymentMethod: "微信支付",
    amount: 299,
    profitRate: 0.3,
    status: "已完成",
    projectName: "短视频营销工具",
  },
  {
    id: "BIZ-20240122-022",
    uploader: "何四",
    uploadTime: "2024-10-28 16:20",
    serviceType: "DUO",
    paymentMethod: "支付宝",
    amount: 599,
    profitRate: 0.35,
    status: "已完成",
    projectName: "私域流量管理系统",
  },
  {
    id: "BIZ-20240123-023",
    uploader: "吕五",
    uploadTime: "2024-11-10 11:00",
    serviceType: "Tri",
    paymentMethod: "企业转账",
    amount: 1999,
    profitRate: 0.3,
    status: "已完成",
    projectName: "数据安全防护平台",
  },
  {
    id: "BIZ-20240124-024",
    uploader: "施六",
    uploadTime: "2024-11-22 15:45",
    serviceType: "Omni",
    paymentMethod: "微信支付",
    amount: 1299,
    profitRate: 0.35,
    status: "已完成",
    projectName: "智能制造执行系统",
  },
  {
    id: "BIZ-20240125-025",
    uploader: "张七",
    uploadTime: "2024-12-05 10:10",
    serviceType: "Uni",
    paymentMethod: "支付宝",
    amount: 299,
    profitRate: 0.3,
    status: "已完成",
    projectName: "会员管理系统",
  },
  {
    id: "BIZ-20240126-026",
    uploader: "孔八",
    uploadTime: "2024-12-18 14:30",
    serviceType: "DUO",
    paymentMethod: "企业转账",
    amount: 599,
    profitRate: 0.35,
    status: "已完成",
    projectName: "智慧停车管理平台",
  },
  {
    id: "BIZ-20250101-027",
    uploader: "曹九",
    uploadTime: "2025-01-08 09:20",
    serviceType: "Tri",
    paymentMethod: "微信支付",
    amount: 1999,
    profitRate: 0.3,
    status: "已完成",
    projectName: "远程医疗服务平台",
  },
  {
    id: "BIZ-20250102-028",
    uploader: "严十",
    uploadTime: "2025-01-20 16:00",
    serviceType: "Omni",
    paymentMethod: "支付宝",
    amount: 1299,
    profitRate: 0.35,
    status: "已完成",
    projectName: "企业培训管理系统",
  },
];

// ==========================================
// --- 1.2.1 生态流水数据 (取消三大货架概念) ---
// ==========================================
const ECOSYSTEM_TRANSACTIONS = [
  {
    id: "ECO-20240101-001",
    projectName: "智航低空物流网络",
    serviceType: "法律",
    dealStatus: "处理完成",
    progress: "分润完成",
    partnerName: "盈科律师事务所",
    amount: 5000,
    profitShare: 750,
    createdAt: "2024-01-15",
    updatedAt: "2024-02-20",
  },
  {
    id: "ECO-20240102-002",
    projectName: "DeepSeeker 医疗影像大模型",
    serviceType: "订单对接",
    dealStatus: "处理完成",
    progress: "分润完成",
    partnerName: "华西医院集团",
    amount: 12000,
    profitShare: 1800,
    createdAt: "2024-01-18",
    updatedAt: "2024-03-10",
  },
  {
    id: "ECO-20240103-003",
    projectName: "绿能储能聚合平台",
    serviceType: "财税",
    dealStatus: "处理完成",
    progress: "已付款待分润",
    partnerName: "德勤会计师事务所",
    amount: 8000,
    profitShare: 1200,
    createdAt: "2024-01-20",
    updatedAt: "2024-03-15",
  },
  {
    id: "ECO-20240104-004",
    projectName: "星舰商业航天发射服务",
    serviceType: "人才",
    dealStatus: "处理中需求",
    progress: "已签约未付款",
    partnerName: "海德思哲猎头",
    amount: 15000,
    profitShare: 2250,
    createdAt: "2024-01-22",
    updatedAt: "2024-03-18",
  },
  {
    id: "ECO-20240105-005",
    projectName: "云边协同智能工厂",
    serviceType: "云资源",
    dealStatus: "处理中需求",
    progress: "待签约",
    partnerName: "阿里云",
    amount: 20000,
    profitShare: 3000,
    createdAt: "2024-01-25",
    updatedAt: "2024-03-20",
  },
  {
    id: "ECO-20240106-006",
    projectName: "量子通信组网平台",
    serviceType: "知识产权",
    dealStatus: "处理完成",
    progress: "分润完成",
    partnerName: "中科专利代理",
    amount: 6000,
    profitShare: 900,
    createdAt: "2024-01-28",
    updatedAt: "2024-03-22",
  },
  {
    id: "ECO-20240107-007",
    projectName: "智航低空物流网络",
    serviceType: "品牌PR",
    dealStatus: "待处理需求",
    progress: "待签约",
    partnerName: "蓝色光标",
    amount: 10000,
    profitShare: 1500,
    createdAt: "2024-02-01",
    updatedAt: "2024-03-24",
  },
  {
    id: "ECO-20240108-008",
    projectName: "DeepSeeker 医疗影像大模型",
    serviceType: "政策申报",
    dealStatus: "处理完成",
    progress: "分润完成",
    partnerName: "中关村科技园",
    amount: 4000,
    profitShare: 600,
    createdAt: "2024-02-05",
    updatedAt: "2024-03-25",
  },
  {
    id: "ECO-20240109-009",
    projectName: "绿能储能聚合平台",
    serviceType: "FA顾问",
    dealStatus: "处理中需求",
    progress: "已签约未付款",
    partnerName: "华兴资本",
    amount: 18000,
    profitShare: 2700,
    createdAt: "2024-02-08",
    updatedAt: "2024-03-26",
  },
  {
    id: "ECO-20240110-010",
    projectName: "星舰商业航天发射服务",
    serviceType: "数据",
    dealStatus: "待处理需求",
    progress: "待签约",
    partnerName: "明略科技",
    amount: 9000,
    profitShare: 1350,
    createdAt: "2024-02-10",
    updatedAt: "2024-03-27",
  },
];

// ==========================================
// --- 1.3 生态服务需求数据 (取消三大货架概念，serviceType直接作为一级标签) ---
// ==========================================
const ECOSYSTEM_SERVICE_REQUESTS = [
  {
    id: "ECO-REQ-001",
    companyName: "智航低空物流网络",
    serviceType: "FA顾问",
    requirementDetails:
      "寻求Pre-A轮融资，金额3000万元，用于扩大无人机物流网络覆盖范围",
    potentialPartner: "华兴资本",
    uploadTime: "2026-01-15 09:30",
    status: "已完成需求对接",
    createdAt: new Date("2026-01-15"),
  },
  {
    id: "ECO-REQ-002",
    companyName: "DeepSeeker 医疗影像大模型",
    serviceType: "法律",
    requirementDetails:
      "需要医疗AI领域合规审查，涉及数据安全和隐私保护相关法律咨询",
    potentialPartner: "金杜律师事务所",
    uploadTime: "2026-01-16 14:20",
    status: "处理中需求",
    createdAt: new Date("2026-01-16"),
  },
  {
    id: "ECO-REQ-003",
    companyName: "绿能储能聚合平台",
    serviceType: "财税",
    requirementDetails: "准备上市辅导，需要财务审计和IPO咨询服务",
    potentialPartner: "普华永道",
    uploadTime: "2026-01-17 10:15",
    status: "处理中需求",
    createdAt: new Date("2026-01-17"),
  },
  {
    id: "ECO-REQ-004",
    companyName: "星舰商业航天发射服务",
    serviceType: "品牌PR",
    requirementDetails: "首次发射成功，需要进行品牌宣传和媒体报道",
    potentialPartner: "36氪",
    uploadTime: "2026-01-18 16:45",
    status: "已完成需求对接",
    createdAt: new Date("2026-01-18"),
  },
  {
    id: "ECO-REQ-005",
    companyName: "云边协同智能工厂",
    serviceType: "人才",
    requirementDetails:
      "招聘CTO和技术总监各1名，要求有工业互联网和边缘计算背景",
    potentialPartner: "猎聘网、科锐国际",
    uploadTime: "2026-01-19 11:30",
    status: "待处理需求",
    createdAt: new Date("2026-01-19"),
  },
  {
    id: "ECO-REQ-006",
    companyName: "固态电池量产平台",
    serviceType: "FA顾问",
    requirementDetails: "寻求A轮融资，金额1.5亿元，用于固态电池生产线建设",
    potentialPartner: "红杉资本",
    uploadTime: "2026-01-20 08:00",
    status: "处理中需求",
    createdAt: new Date("2026-01-20"),
  },
  {
    id: "ECO-REQ-007",
    companyName: "脑机接口康复系统",
    serviceType: "知识产权",
    requirementDetails: "需要医疗器械认证咨询和专利申请相关法律咨询",
    potentialPartner: "待匹配",
    uploadTime: "2026-01-21 15:20",
    status: "待处理需求",
    createdAt: new Date("2026-01-21"),
  },
  {
    id: "ECO-REQ-008",
    companyName: "量子通信组网平台",
    serviceType: "知识产权",
    requirementDetails: "需要知识产权保护和专利申请相关法律咨询",
    potentialPartner: "君合律师事务所",
    uploadTime: "2026-01-18 13:40",
    status: "已完成需求对接",
    createdAt: new Date("2026-01-18"),
  },
  {
    id: "ECO-REQ-009",
    companyName: "智慧农业IoT平台",
    serviceType: "云资源",
    requirementDetails: "需要云计算资源和大数据分析平台支持，优化农业数据处理",
    potentialPartner: "阿里云、华为云",
    uploadTime: "2026-01-19 09:00",
    status: "处理中需求",
    createdAt: new Date("2026-01-19"),
  },
  {
    id: "ECO-REQ-010",
    companyName: "元宇宙虚拟会议平台",
    serviceType: "数据服务",
    requirementDetails: "需要用户行为分析和数据挖掘服务，优化产品体验",
    potentialPartner: "神策数据",
    uploadTime: "2026-01-20 14:30",
    status: "待处理需求",
    createdAt: new Date("2026-01-20"),
  },
  {
    id: "ECO-REQ-011",
    companyName: "新能源汽车充电网络",
    serviceType: "政策申报",
    requirementDetails: "申请新能源基础设施补贴和地方政策扶持",
    potentialPartner: "待匹配",
    uploadTime: "2026-01-21 10:00",
    status: "处理中需求",
    createdAt: new Date("2026-01-21"),
  },
  {
    id: "ECO-REQ-012",
    companyName: "跨境电商供应链平台",
    serviceType: "订单对接",
    requirementDetails: "寻找跨境电商大客户，建立长期供应链合作关系",
    potentialPartner: "待匹配",
    uploadTime: "2026-01-21 16:20",
    status: "待处理需求",
    createdAt: new Date("2026-01-21"),
  },
];

// ==========================================
// --- 1.4 生态资源方数据 ---
// ==========================================
const ECOSYSTEM_PARTNERS = [
  {
    id: "PARTNER-001",
    name: "猎聘",
    category: "要素与基建",
    serviceType: "人才/猎头对接",
    contactPerson: "张经理",
    phone: "138****8888",
    email: "zhang@liepin.com",
    cooperationStartDate: "2024-03-15",
    lastActiveDate: "2026-01-18",
    totalRevenue: 850000,
    totalProfit: 127500, // 15% 分润
    serviceCount: 8,
    status: "active", // active, inactive
  },
  {
    id: "PARTNER-002",
    name: "金杜律师事务所",
    category: "合规与生存",
    serviceType: "法律/法务对接",
    contactPerson: "李律师",
    phone: "139****9999",
    email: "li@kingandwood.com",
    cooperationStartDate: "2024-01-10",
    lastActiveDate: "2026-01-16",
    totalRevenue: 1200000,
    totalProfit: 180000,
    serviceCount: 6,
    status: "active",
  },
  {
    id: "PARTNER-003",
    name: "百宸律师事务所",
    category: "合规与生存",
    serviceType: "法律/法务对接",
    contactPerson: "王律师",
    phone: "137****7777",
    email: "wang@baichen.com",
    cooperationStartDate: "2023-08-20",
    lastActiveDate: "2024-11-30",
    totalRevenue: 580000,
    totalProfit: 87000,
    serviceCount: 4,
    status: "inactive", // 超过一年未活跃
  },
  {
    id: "PARTNER-004",
    name: "普华永道",
    category: "合规与生存",
    serviceType: "财税/审计对接",
    contactPerson: "周经理",
    phone: "136****6666",
    email: "zhou@pwc.com",
    cooperationStartDate: "2024-02-01",
    lastActiveDate: "2026-01-17",
    totalRevenue: 2100000,
    totalProfit: 315000,
    serviceCount: 5,
    status: "active",
  },
  {
    id: "PARTNER-005",
    name: "华兴资本",
    category: "增长与交易",
    serviceType: "FA顾问",
    contactPerson: "赵总监",
    phone: "135****5555",
    email: "zhao@huaxing.com",
    cooperationStartDate: "2024-05-10",
    lastActiveDate: "2026-01-20",
    totalRevenue: 3500000,
    totalProfit: 525000,
    serviceCount: 12,
    status: "active",
  },
  {
    id: "PARTNER-006",
    name: "36氪",
    category: "增长与交易",
    serviceType: "品牌PR",
    contactPerson: "孙编辑",
    phone: "134****4444",
    email: "sun@36kr.com",
    cooperationStartDate: "2024-06-15",
    lastActiveDate: "2026-01-18",
    totalRevenue: 450000,
    totalProfit: 67500,
    serviceCount: 9,
    status: "active",
  },
  {
    id: "PARTNER-007",
    name: "阿里云",
    category: "要素与基建",
    serviceType: "云资源与算力服务",
    contactPerson: "陈经理",
    phone: "133****3333",
    email: "chen@aliyun.com",
    cooperationStartDate: "2024-04-20",
    lastActiveDate: "2026-01-19",
    totalRevenue: 680000,
    totalProfit: 102000,
    serviceCount: 7,
    status: "active",
  },
  {
    id: "PARTNER-008",
    name: "神策数据",
    category: "要素与基建",
    serviceType: "数据服务",
    contactPerson: "刘总",
    phone: "132****2222",
    email: "liu@sensorsdata.cn",
    cooperationStartDate: "2023-12-01",
    lastActiveDate: "2024-10-15",
    totalRevenue: 320000,
    totalProfit: 48000,
    serviceCount: 3,
    status: "inactive", // 超过一年未活跃
  },
];

// ==========================================
// --- 1.5 生态服务记录数据 ---
// ==========================================
const ECOSYSTEM_SERVICE_RECORDS = [
  {
    id: "RECORD-001",
    partnerId: "PARTNER-002",
    partnerName: "金杜律师事务所",
    projectName: "DeepSeeker 医疗影像大模型",
    companyName: "DeepSeeker 医疗影像大模型",
    serviceType: "法律/法务对接",
    serviceDetail: "医疗AI合规审查、数据安全法律咨询",
    serviceDate: "2026-01-16",
    serviceAmount: 280000,
    profitShare: 42000,
    profitRate: 0.15,
    status: "已完成",
  },
  {
    id: "RECORD-002",
    partnerId: "PARTNER-005",
    partnerName: "华兴资本",
    projectName: "智航低空物流网络",
    companyName: "智航低空物流网络",
    serviceType: "FA顾问",
    serviceDetail: "Pre-A轮融资财务顾问服务",
    serviceDate: "2026-01-15",
    serviceAmount: 500000,
    profitShare: 75000,
    profitRate: 0.15,
    status: "已完成",
  },
  {
    id: "RECORD-003",
    partnerId: "PARTNER-004",
    partnerName: "普华永道",
    projectName: "绿能储能聚合平台",
    companyName: "绿能储能聚合平台",
    serviceType: "财税/审计对接",
    serviceDetail: "上市辅导、财务审计及IPO咨询",
    serviceDate: "2026-01-17",
    serviceAmount: 680000,
    profitShare: 102000,
    profitRate: 0.15,
    status: "已完成",
  },
  {
    id: "RECORD-004",
    partnerId: "PARTNER-006",
    partnerName: "36氪",
    projectName: "星舰商业航天发射服务",
    companyName: "星舰商业航天发射服务",
    serviceType: "品牌PR",
    serviceDetail: "首次发射成功品牌宣传、媒体报道",
    serviceDate: "2026-01-18",
    serviceAmount: 120000,
    profitShare: 18000,
    profitRate: 0.15,
    status: "已完成",
  },
  {
    id: "RECORD-005",
    partnerId: "PARTNER-001",
    partnerName: "猎聘",
    projectName: "云边协同智能工厂",
    companyName: "云边协同智能工厂",
    serviceType: "人才/猎头对接",
    serviceDetail: "招聘CTO和技术总监",
    serviceDate: "2026-01-19",
    serviceAmount: 180000,
    profitShare: 27000,
    profitRate: 0.15,
    status: "进行中",
  },
  {
    id: "RECORD-006",
    partnerId: "PARTNER-005",
    partnerName: "华兴资本",
    projectName: "固态电池量产平台",
    companyName: "固态电池量产平台",
    serviceType: "FA顾问",
    serviceDetail: "A轮融资财务顾问",
    serviceDate: "2026-01-20",
    serviceAmount: 800000,
    profitShare: 120000,
    profitRate: 0.15,
    status: "进行中",
  },
  {
    id: "RECORD-007",
    partnerId: "PARTNER-007",
    partnerName: "阿里云",
    projectName: "智慧农业IoT平台",
    companyName: "智慧农业IoT平台",
    serviceType: "云资源与算力服务",
    serviceDetail: "云计算资源、大数据分析平台",
    serviceDate: "2026-01-19",
    serviceAmount: 220000,
    profitShare: 33000,
    profitRate: 0.15,
    status: "进行中",
  },
  {
    id: "RECORD-008",
    partnerId: "PARTNER-002",
    partnerName: "金杜律师事务所",
    projectName: "量子通信组网平台",
    companyName: "量子通信组网平台",
    serviceType: "法律/法务对接",
    serviceDetail: "知识产权保护、专利申请咨询",
    serviceDate: "2026-01-18",
    serviceAmount: 350000,
    profitShare: 52500,
    profitRate: 0.15,
    status: "已完成",
  },
  {
    id: "RECORD-009",
    partnerId: "PARTNER-003",
    partnerName: "百宸律师事务所",
    projectName: "区块链溯源平台",
    companyName: "区块链溯源平台",
    serviceType: "法律/法务对接",
    serviceDetail: "合规审查、合同审核",
    serviceDate: "2024-11-30",
    serviceAmount: 150000,
    profitShare: 22500,
    profitRate: 0.15,
    status: "已完成",
  },
  {
    id: "RECORD-010",
    partnerId: "PARTNER-008",
    partnerName: "神策数据",
    projectName: "元宇宙虚拟会议平台",
    companyName: "元宇宙虚拟会议平台",
    serviceType: "数据服务",
    serviceDetail: "用户行为分析、数据挖掘",
    serviceDate: "2024-10-15",
    serviceAmount: 180000,
    profitShare: 27000,
    profitRate: 0.15,
    status: "已完成",
  },
];

// ==========================================
// --- 2. 核心业务配置数据 (MOCK_CONFIGS) ---
// ==========================================
const MOCK_CONFIGS = [
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

// ==========================================
// --- 3. Mock Data Generation (核心业务扩充) ---
// ==========================================

// 基础 18 个种子数据，增加了企名片相关字段
const SEED_PROJECTS = [
  {
    id: "BP-2401",
    name: "智航低空物流网络",
    companyName: "珠海智航物流科技有限公司",
    legalRep: "王强",
    established: "2021-05-12",
    location: "广东·珠海",
    scale: "50-99人",
    oneLiner:
      "利用无人机蜂群技术解决海岛与偏远山区的末端物流配送成本高、时效差痛点",
    productIntro:
      "研发高载重物流无人机及全自动蜂巢基站，提供端到端配送解决方案。",
    keyClients: "顺丰速运, 中国邮政, 珠海海岛旅游局",
    investors: "红杉中国(种子轮), 珠海高科投(天使轮)",
    track: "低空经济",
    trackLevel: "L3",
    source: "FA推荐",
    scenario: ["智慧物流", "应急救援"],
    revenue: "5000万",
    profit: "-800万",
    funding: "A轮 3000万",
    valuation: "3亿",
    uploaderId: "U-8821",
    uploaderName: "王经理",
    contact: "138****1234",
    fileName: "智航BP_v2.pdf",
    reportName: "智航_深度诊断报告.pdf",
    submitTime: "2024-01-15 10:30",
    tenant: "国信中数",
    tags: ["连续创业", "高新企业", "海外团队"],
    rawScores: { team: 92, tech: 85, market: 95, finance: 70 },
    detailedScores: {
      team: { ceo: 95, teamAvg: 88, total: 92 },
      tech: { moat: 90, product: 80, track: 95, total: 88 },
      ops: { financial: 60, operational: 85, total: 72 },
      capital: { history: 80, total: 80 },
    },
    assessmentBrief:
      "团队拥有海外Tier0院校背景，技术壁垒（PCT专利）较高。身处低空经济黄金赛道，但目前财务仍处于战略亏损期，需关注后续造血能力。",
    details: {
      missingModules: 2,
      evaluation: "团队背景扎实，技术壁垒较高，但财务模型尚需优化。",
    },
    score: 88.5,
  },
  {
    id: "BP-2402",
    name: "DeepSeeker 医疗影像大模型",
    companyName: "北京深寻智能科技有限公司",
    legalRep: "李明轩",
    established: "2023-08-20",
    location: "北京·海淀",
    scale: "15-49人",
    oneLiner:
      "基于多模态大模型解决基层医疗机构影像诊断误诊率高、医生资源匮乏的痛点",
    productIntro:
      "DeepSeeker-Med 垂直领域大模型，支持CT/MRI影像的自动标注与病灶识别。",
    keyClients: "北京协和医院(科研), 华为云",
    investors: "奇绩创坛, 百度风投",
    track: "人工智能",
    trackLevel: "L2",
    source: "自主报名",
    scenario: ["医疗健康", "辅助诊断"],
    revenue: "200万",
    profit: "-500万",
    funding: "天使轮 1000万",
    valuation: "1.5亿",
    uploaderId: "U-9932",
    uploaderName: "李博士",
    contact: "139****5678",
    fileName: "DeepSeeker_Medical.pdf",
    reportName: "DeepSeeker_诊断.pdf",
    submitTime: "2024-01-16 14:20",
    tenant: "华为云创新中心",
    tags: ["清北团队", "C9高校", "核心专利"],
    rawScores: { team: 98, tech: 96, market: 85, finance: 60 },
    detailedScores: {
      team: { ceo: 100, teamAvg: 96, total: 98 },
      tech: { moat: 100, product: 70, track: 90, total: 92 },
      ops: { financial: 40, operational: 60, total: 50 },
      capital: { history: 60, total: 60 },
    },
    assessmentBrief:
      "典型的科学家创业项目，CEO为清华博士，技术具有源头创新性（GitHub Stars 2k+）。目前仍处于早期研发阶段，无规模化收入，风险与机遇并存。",
    details: {
      missingModules: 0,
      evaluation: "技术极具创新性，学术背景深厚，处于早期研发阶段。",
    },
    score: 85.0,
  },
  {
    id: "BP-2403",
    name: "绿能储能聚合平台",
    companyName: "浙江绿能聚合能源有限公司",
    legalRep: "张建国",
    established: "2019-03-10",
    location: "浙江·杭州",
    scale: "100-299人",
    oneLiner: "通过虚拟电厂技术解决工业园区峰谷电价差大、新能源消纳难的痛点",
    productIntro:
      "工商业储能聚合管理平台，提供削峰填谷、需量管理及电力交易服务。",
    keyClients: "吉利汽车工厂, 阿里巴巴西溪园区",
    investors: "腾讯投资, 普华资本",
    track: "新能源",
    trackLevel: "L3",
    source: "园区推荐",
    scenario: ["能源电力", "工业园区"],
    revenue: "1.2亿",
    profit: "2000万",
    funding: "B轮 1亿",
    valuation: "10亿",
    uploaderId: "U-7711",
    uploaderName: "张总",
    contact: "186****9988",
    fileName: "绿能聚合.pdf",
    reportName: "绿能_评估简报.pdf",
    submitTime: "2024-01-16 09:15",
    tenant: "腾讯众创空间",
    tags: ["营收过亿", "盈亏平衡", "产业龙头背景"],
    rawScores: { team: 80, tech: 78, market: 85, finance: 95 },
    detailedScores: {
      team: { ceo: 80, teamAvg: 80, total: 80 },
      tech: { moat: 70, product: 90, track: 85, total: 82 },
      ops: { financial: 100, operational: 90, total: 95 },
      capital: { history: 80, total: 80 },
    },
    assessmentBrief:
      "财务表现极其优异（营收过亿，净利2000万），属于S4扩张期项目。运营数据健康（NRR>110%）。技术壁垒相对一般，侧重于资源整合与运营。",
    details: {
      missingModules: 3,
      evaluation: "财务表现优异，现金流健康，适合稳健型投资。",
    },
    score: 86.5,
  },
  {
    id: "BP-2404",
    name: "跨境电商SaaS ERP",
    companyName: "深圳跨海云科技有限公司",
    legalRep: "赵志刚",
    established: "2022-01-15",
    location: "广东·深圳",
    scale: "20-49人",
    oneLiner: "用AI自动化流程解决中小跨境卖家多平台订单管理混乱、库存积压痛点",
    productIntro: "一站式跨境电商ERP，集成Amazon、TikTok、Shein等多平台接口。",
    keyClients: "安克创新(部门级), 赛维时代",
    investors: "高瓴创投(Pre-A)",
    track: "企业服务",
    trackLevel: "L3",
    source: "FA推荐",
    scenario: ["电子商务"],
    revenue: "3000万",
    profit: "500万",
    funding: "Pre-A 1500万",
    valuation: "2亿",
    uploaderId: "U-6655",
    uploaderName: "赵总监",
    contact: "135****2233",
    fileName: "跨境ERP.pdf",
    reportName: "跨境ERP_分析.pdf",
    submitTime: "2024-01-17 11:00",
    tenant: "阿里巴巴",
    tags: ["首次创业", "数据合规", "盈亏平衡"],
    rawScores: { team: 75, tech: 70, market: 88, finance: 85 },
    detailedScores: {
      team: { ceo: 75, teamAvg: 75, total: 75 },
      tech: { moat: 60, product: 85, track: 80, total: 75 },
      ops: { financial: 85, operational: 85, total: 85 },
      capital: { history: 50, total: 50 },
    },
    assessmentBrief:
      "业务模式成熟（M1 SaaS类），ARR稳定增长。虽然技术门槛不高，但切中细分赛道痛点，现金流良好，是一个小而美的项目。",
    details: {
      missingModules: 1,
      evaluation: "市场切入点精准，数据合规性好，增长稳健。",
    },
    score: 75.0,
  },
  {
    id: "BP-2405",
    name: "eVTOL 动力电池包",
    companyName: "宁德航电新能源有限公司",
    legalRep: "孙浩",
    established: "2020-11-22",
    location: "福建·宁德",
    scale: "100-299人",
    oneLiner: "通过高镍三元材料创新解决电动航空器续航短、安全性差的核心痛点",
    productIntro: "航空级高能量密度动力电池包，能量密度达350Wh/kg。",
    keyClients: "亿航智能, 峰飞航空",
    investors: "宁德时代(战投), 国投招商",
    track: "低空经济",
    trackLevel: "L2",
    source: "政府招商",
    scenario: ["城市交通"],
    revenue: "8000万",
    profit: "1200万",
    funding: "B轮 1.5亿",
    valuation: "12亿",
    uploaderId: "U-3321",
    uploaderName: "孙工",
    contact: "159****8888",
    fileName: "eVTOL_Battery.pdf",
    reportName: "eVTOL_Battery_Report.pdf",
    submitTime: "2024-01-18 16:45",
    tenant: "国信中数",
    tags: ["宁德时代背景", "核心专利", "专精特新"],
    rawScores: { team: 85, tech: 90, market: 92, finance: 88 },
    detailedScores: {
      team: { ceo: 85, teamAvg: 85, total: 85 },
      tech: { moat: 95, product: 90, track: 92, total: 92 },
      ops: { financial: 88, operational: 88, total: 88 },
      capital: { history: 80, total: 80 },
    },
    assessmentBrief:
      "硬科技属性极强，拥有多项发明专利。产能利用率与良率均达到Tier 1水平。已获知名VC投资（Tier 1机构）。",
    details: {
      missingModules: 0,
      evaluation: "硬科技属性强，供应链资源丰富。",
    },
    score: 87.0,
  },
  {
    id: "BP-2406",
    name: "城市空中交通管制系统",
    companyName: "北京空域管理技术有限公司",
    legalRep: "赵刚",
    established: "2022-04-01",
    location: "北京·朝阳",
    scale: "20-49人",
    oneLiner: "利用数字孪生技术解决低空空域飞行器密度增加带来的监管盲区痛点",
    productIntro: "UAM城市空中交通指挥控制中心系统。",
    keyClients: "民航局, 北京市交通委",
    investors: "航天科工基金",
    track: "低空经济",
    trackLevel: "L3",
    source: "自主报名",
    scenario: ["政府监管", "空域管理"],
    revenue: "1500万",
    profit: "200万",
    funding: "A轮 5000万",
    valuation: "5亿",
    uploaderId: "U-4411",
    contact: "136****7777",
    fileName: "UAM_Control.pdf",
    reportName: "UAM_Report.pdf",
    submitTime: "2024-01-19",
    tenant: "华为云创新中心",
    tags: ["ToG业务", "军工背景"],
    rawScores: { team: 88, tech: 85, market: 95, finance: 75 },
    detailedScores: {
      team: { ceo: 90, teamAvg: 85, total: 87.5 },
      tech: { moat: 80, product: 80, track: 95, total: 85 },
      ops: { financial: 70, operational: 80, total: 75 },
      capital: { history: 50, total: 50 },
    },
    assessmentBrief:
      "典型的ToG业务模式，市场天花板极高（国家战略支持）。回款周期略长，但竞争壁垒主要体现在资质与准入。",
    details: {
      missingModules: 1,
      evaluation: "ToG业务，回款周期较长，但壁垒极高。",
    },
    score: 79.5,
  },
  {
    id: "BP-2407",
    name: "AI 法律顾问 Agent",
    companyName: "上海法智网络科技有限公司",
    legalRep: "陈思",
    established: "2023-11-11",
    location: "上海·静安",
    scale: "1-14人",
    oneLiner: "用AI Agent解决中小微企业聘请常年法律顾问成本高昂的痛点",
    productIntro: "LegalAI 智能合同审查与法律咨询助手。",
    keyClients: "暂无标杆客户 (C端用户为主)",
    investors: "奇绩创坛",
    track: "人工智能",
    trackLevel: "L3",
    source: "孵化器",
    scenario: ["法律服务"],
    revenue: "50万",
    profit: "-200万",
    funding: "种子轮 300万",
    valuation: "3000万",
    uploaderId: "U-5522",
    contact: "133****9999",
    fileName: "LegalAI.pdf",
    reportName: "LegalAI_Diag.pdf",
    submitTime: "2024-01-20",
    tenant: "腾讯众创空间",
    tags: ["大模型微调", "早期项目", "法律科技"],
    rawScores: { team: 90, tech: 80, market: 70, finance: 50 },
    detailedScores: {
      team: { ceo: 90, teamAvg: 90, total: 90 },
      tech: { moat: 70, product: 60, track: 80, total: 70 },
      ops: { financial: 40, operational: 50, total: 45 },
      capital: { history: 50, total: 50 },
    },
    assessmentBrief:
      "早期AI应用层项目，基于开源模型微调。团队背景较好，但技术护城河尚浅（Tier 2）。目前尚未验证PMF。",
    details: {
      missingModules: 4,
      evaluation: "早期项目，模型微调能力不错，但商业模式待验证。",
    },
    score: 68.0,
  },
  {
    id: "BP-2408",
    name: "量子计算芯片设计",
    companyName: "合肥本源量子科技股份有限公司",
    legalRep: "钱伟",
    established: "2018-09-17",
    location: "安徽·合肥",
    scale: "300-499人",
    oneLiner:
      "解决传统算力无法突破摩尔定律限制、无法解决复杂科研计算难题的痛点",
    productIntro: "量子计算芯片及量子计算机整机系统。",
    keyClients: "中科院, 某国有银行",
    investors: "深创投, 中金资本",
    track: "半导体",
    trackLevel: "L2",
    source: "高校转化",
    scenario: ["科研计算"],
    revenue: "0",
    profit: "-3000万",
    funding: "天使轮 5000万",
    valuation: "5亿",
    uploaderId: "U-1234",
    uploaderName: "钱教授",
    contact: "130****0000",
    fileName: "QuantumChip.pdf",
    reportName: "Quantum_Deep.pdf",
    submitTime: "2024-01-21",
    tenant: "国信中数",
    tags: ["科学家创业", "颠覆性技术", "长期研发"],
    rawScores: { team: 98, tech: 99, market: 60, finance: 20 },
    detailedScores: {
      team: { ceo: 100, teamAvg: 95, total: 98.25 },
      tech: { moat: 100, product: 40, track: 80, total: 80 }, // 产品落地分低
      ops: { financial: 0, operational: 40, total: 20 },
      capital: { history: 80, total: 80 },
    },
    assessmentBrief:
      "顶级科学家创业（Tier 0），技术处于垄断/源头创新级别。虽然目前无营收（S1阶段），但属于典型的DeepTech项目，估值逻辑不同。",
    details: {
      missingModules: 0,
      evaluation: "极具前瞻性的硬科技项目，团队为国际顶尖水平。",
    },
    score: 75.5,
  },
  {
    id: "BP-2409",
    name: "合成生物护肤原料",
    companyName: "杭州生物科技有限公司",
    legalRep: "吴建国",
    established: "2019-06-01",
    location: "浙江·杭州",
    scale: "50-99人",
    oneLiner: "解决传统化工原料生产污染大、成本高、活性成分不纯的痛点",
    productIntro: "重组胶原蛋白及麦角硫因原料。",
    keyClients: "珀莱雅, 华熙生物",
    investors: "IDG资本, 源码资本",
    track: "生物医药",
    trackLevel: "L2",
    source: "FA推荐",
    scenario: ["消费医疗", "美妆"],
    revenue: "4000万",
    profit: "800万",
    funding: "A轮 6000万",
    valuation: "4亿",
    uploaderId: "U-5678",
    uploaderName: "吴总",
    contact: "131****1111",
    fileName: "SynBioSkin.pdf",
    reportName: "SynBio_Report.pdf",
    submitTime: "2024-01-22",
    tenant: "杭州湾加速器",
    tags: ["消费升级", "高毛利", "自有工厂"],
    rawScores: { team: 85, tech: 90, market: 92, finance: 88 },
    detailedScores: {
      team: { ceo: 85, teamAvg: 85, total: 85 },
      tech: { moat: 80, product: 90, track: 90, total: 86 },
      ops: { financial: 90, operational: 85, total: 87.5 },
      capital: { history: 50, total: 50 },
    },
    assessmentBrief:
      "产品已实现规模化量产（Tier 0），毛利较高。消费医疗赛道增长稳健。财务健康度良好（S3阶段特征）。",
    details: {
      missingModules: 1,
      evaluation: "产品已验证，市场渠道成熟，现金流良好。",
    },
    score: 82.0,
  },
  {
    id: "BP-2410",
    name: "无人矿山运输解决方案",
    companyName: "内蒙古智慧矿山科技有限公司",
    legalRep: "郑大伟",
    established: "2020-02-14",
    location: "内蒙古·鄂尔多斯",
    scale: "100-299人",
    oneLiner: "解决矿区环境恶劣导致招工难、安全事故频发及运输效率低下的痛点",
    productIntro: "L4级无人驾驶矿卡及矿区调度指挥系统。",
    keyClients: "国家能源集团, 紫金矿业",
    investors: "源码资本, 辰韬资本",
    track: "自动驾驶",
    trackLevel: "L3",
    source: "FA推荐",
    scenario: ["智慧矿山"],
    revenue: "6000万",
    profit: "500万",
    funding: "B轮 1.2亿",
    valuation: "8亿",
    uploaderId: "U-9012",
    uploaderName: "郑工",
    contact: "132****2222",
    fileName: "AutoMine.pdf",
    reportName: "AutoMine_Report.pdf",
    submitTime: "2024-01-23",
    tenant: "华为云创新中心",
    tags: ["封闭场景", "刚需高频", "已签大单"],
    rawScores: { team: 88, tech: 85, market: 80, finance: 75 },
    detailedScores: {
      team: { ceo: 88, teamAvg: 88, total: 88 },
      tech: { moat: 85, product: 90, track: 80, total: 85 },
      ops: { financial: 80, operational: 80, total: 80 },
      capital: { history: 80, total: 80 },
    },
    assessmentBrief:
      "特定封闭场景下的自动驾驶落地典范。已签署大额订单，现金流正向。技术壁垒在于工程化落地能力。",
    details: {
      missingModules: 2,
      evaluation: "特定场景自动驾驶落地典范，商业闭环已跑通。",
    },
    score: 83.5,
  },
  {
    id: "BP-2411",
    name: "VR 职业技能培训平台",
    companyName: "北京虚拟现实教育科技有限公司",
    legalRep: "周涛",
    established: "2021-08-30",
    location: "北京·海淀",
    scale: "20-49人",
    oneLiner:
      "解决高危行业（电力/消防）实操培训成本高、风险大、场景难复现的痛点",
    productIntro: "VR电力检修培训系统及一体机硬件。",
    keyClients: "国家电网, 应急管理部",
    investors: "暂无",
    track: "元宇宙",
    trackLevel: "L3",
    source: "自主报名",
    scenario: ["职业教育"],
    revenue: "1500万",
    profit: "-200万",
    funding: "Pre-A 2000万",
    valuation: "1亿",
    uploaderId: "U-3456",
    uploaderName: "周老师",
    contact: "133****3333",
    fileName: "VREdu.pdf",
    reportName: "VREdu_Report.pdf",
    submitTime: "2024-01-24",
    tenant: "腾讯众创空间",
    tags: ["职教改革", "内容生态", "人社合作"],
    rawScores: { team: 75, tech: 80, market: 85, finance: 60 },
    detailedScores: {
      team: { ceo: 75, teamAvg: 75, total: 75 },
      tech: { moat: 60, product: 80, track: 85, total: 75 },
      ops: { financial: 60, operational: 60, total: 60 },
      capital: { history: 50, total: 50 },
    },
    assessmentBrief:
      "政策利好赛道，但技术门槛较低（Tier 2），主要依赖内容生产。客户复购率是关键运营指标。",
    details: {
      missingModules: 0,
      evaluation: "政策利好赛道，内容生产成本较高，需关注复购率。",
    },
    score: 68.0,
  },
  {
    id: "BP-2412",
    name: "固态电池电解质研发",
    companyName: "苏州固态新能源有限公司",
    legalRep: "冯博",
    established: "2022-03-15",
    location: "江苏·苏州",
    scale: "50-99人",
    oneLiner: "解决液态锂电池易燃易爆且能量密度遭遇瓶颈的痛点",
    productIntro: "硫化物固态电解质材料。",
    keyClients: "蔚来汽车, 卫蓝新能源",
    investors: "小米产投, 顺为资本",
    track: "新能源",
    trackLevel: "L2",
    source: "高校转化",
    scenario: ["新能源汽车"],
    revenue: "500万",
    profit: "-1000万",
    funding: "A轮 8000万",
    valuation: "6亿",
    uploaderId: "U-7890",
    uploaderName: "冯博士",
    contact: "134****4444",
    fileName: "SolidState.pdf",
    reportName: "SolidState_Report.pdf",
    submitTime: "2024-01-25",
    tenant: "国信中数",
    tags: ["下一代电池", "技术壁垒", "车企定点"],
    rawScores: { team: 92, tech: 95, market: 90, finance: 50 },
    detailedScores: {
      team: { ceo: 95, teamAvg: 90, total: 93.25 },
      tech: { moat: 95, product: 60, track: 95, total: 85 },
      ops: { financial: 40, operational: 60, total: 50 },
      capital: { history: 80, total: 80 },
    },
    assessmentBrief:
      "关键材料突破，技术壁垒极高（Tier 0）。已获头部车企定点测试（Tier 1验证）。财务暂处于投入期。",
    details: {
      missingModules: 1,
      evaluation: "关键材料突破，已获头部车企测试认证。",
    },
    score: 80.0,
  },
  {
    id: "BP-2413",
    name: "智能康复外骨骼机器人",
    companyName: "上海康复机器人技术有限公司",
    legalRep: "陈云",
    established: "2021-07-07",
    location: "上海·张江",
    scale: "20-49人",
    oneLiner: "解决脑卒中患者康复训练周期长、缺乏专业康复师指导的痛点",
    productIntro: "下肢康复外骨骼机器人。",
    keyClients: "上海华山医院, 泰康之家",
    investors: "张江高科",
    track: "医疗器械",
    trackLevel: "L3",
    source: "园区推荐",
    scenario: ["康复医疗", "养老"],
    revenue: "800万",
    profit: "-300万",
    funding: "天使轮 1500万",
    valuation: "8000万",
    uploaderId: "U-2345",
    uploaderName: "陈总",
    contact: "135****5555",
    fileName: "ExoSkeleton.pdf",
    reportName: "Exo_Report.pdf",
    submitTime: "2024-01-26",
    tenant: "苏州工业园",
    tags: ["老龄化趋势", "二类器械", "产学研"],
    rawScores: { team: 85, tech: 88, market: 95, finance: 55 },
    detailedScores: {
      team: { ceo: 85, teamAvg: 85, total: 85 },
      tech: { moat: 80, product: 80, track: 95, total: 85 },
      ops: { financial: 50, operational: 60, total: 55 },
      capital: { history: 50, total: 50 },
    },
    assessmentBrief:
      "面对老龄化巨大市场（Tier 0赛道）。产品处于二类器械注册阶段。需关注产品成本与市场接受度。",
    details: {
      missingModules: 3,
      evaluation: "市场需求巨大，产品体验需进一步打磨。",
    },
    score: 72.0,
  },
  {
    id: "BP-2414",
    name: "碳捕集与利用(CCUS)设备",
    companyName: "天津低碳环保科技有限公司",
    legalRep: "褚明",
    established: "2020-05-20",
    location: "天津·滨海",
    scale: "50-99人",
    oneLiner: "解决高耗能工厂碳排放超标、碳税成本高企的痛点",
    productIntro: "模块化二氧化碳捕集装置。",
    keyClients: "中国石化, 宝武钢铁",
    investors: "中石化资本",
    track: "双碳科技",
    trackLevel: "L2",
    source: "政府招商",
    scenario: ["高耗能工厂"],
    revenue: "2000万",
    profit: "200万",
    funding: "A轮 4000万",
    valuation: "3亿",
    uploaderId: "U-6789",
    uploaderName: "褚工",
    contact: "136****6666",
    fileName: "CCUS_Tech.pdf",
    reportName: "CCUS_Report.pdf",
    submitTime: "2024-01-27",
    tenant: "国信中数",
    tags: ["碳中和", "设备制造", "政策补贴"],
    rawScores: { team: 80, tech: 85, market: 80, finance: 70 },
    detailedScores: {
      team: { ceo: 80, teamAvg: 80, total: 80 },
      tech: { moat: 85, product: 85, track: 80, total: 83 },
      ops: { financial: 75, operational: 80, total: 77.5 },
      capital: { history: 50, total: 50 },
    },
    assessmentBrief:
      "符合国家双碳战略。设备制造模式（M2），产能利用率和订单量稳步上升。技术处于集成创新阶段。",
    details: {
      missingModules: 0,
      evaluation: "符合国家双碳战略，设备成本控制是关键。",
    },
    score: 75.0,
  },
  {
    id: "BP-2415",
    name: "企业级低代码开发平台",
    companyName: "杭州数智云科技有限公司",
    legalRep: "卫东",
    established: "2017-12-01",
    location: "浙江·杭州",
    scale: "300-499人",
    oneLiner: "解决大型企业内部系统开发周期长、迭代慢、成本高的痛点",
    productIntro: "PaaS级低代码开发平台。",
    keyClients: "万科集团, 招商银行",
    investors: "红杉中国, 高瓴资本",
    track: "企业服务",
    trackLevel: "L3",
    source: "FA推荐",
    scenario: ["数字化转型"],
    revenue: "8000万",
    profit: "1500万",
    funding: "B+轮 2亿",
    valuation: "15亿",
    uploaderId: "U-0123",
    uploaderName: "卫总",
    contact: "137****7777",
    fileName: "LowCodePaaS.pdf",
    reportName: "LowCode_Report.pdf",
    submitTime: "2024-01-28",
    tenant: "阿里巴巴",
    tags: ["SaaS", "高复购", "国产替代"],
    rawScores: { team: 85, tech: 80, market: 90, finance: 90 },
    detailedScores: {
      team: { ceo: 85, teamAvg: 85, total: 85 },
      tech: { moat: 75, product: 90, track: 90, total: 85 },
      ops: { financial: 95, operational: 90, total: 92.5 },
      capital: { history: 80, total: 80 },
    },
    assessmentBrief:
      "业务极其成熟，接近上市标准（S5 Pre-IPO）。NDR>120%，客户质量极高（L1超级大厂）。是优质的现金流项目。",
    details: {
      missingModules: 0,
      evaluation: "业务成熟，客户粘性高，具备上市潜力。",
    },
    score: 87.5,
  },
  {
    id: "BP-2416",
    name: "脑机接口康复系统",
    companyName: "杭州脑科学技术有限公司",
    legalRep: "蒋涛",
    established: "2023-01-01",
    location: "浙江·杭州",
    scale: "15-49人",
    oneLiner: "解决瘫痪患者神经通路重建困难、生活无法自理的痛点",
    productIntro: "侵入式脑机接口芯片及解码系统。",
    keyClients: "浙江大学附属第二医院(伦理审查中)",
    investors: "红杉种子基金",
    track: "脑科学",
    trackLevel: "L2",
    source: "高校转化",
    scenario: ["神经康复"],
    revenue: "0",
    profit: "-500万",
    funding: "种子轮 1000万",
    valuation: "1亿",
    uploaderId: "U-4567",
    uploaderName: "蒋博士",
    contact: "138****8888",
    fileName: "BCI_Rehab.pdf",
    reportName: "BCI_Report.pdf",
    submitTime: "2024-01-29",
    tenant: "华为云创新中心",
    tags: ["前沿科技", "临床试验", "高风险高回报"],
    rawScores: { team: 95, tech: 90, market: 70, finance: 30 },
    detailedScores: {
      team: { ceo: 95, teamAvg: 95, total: 95 },
      tech: { moat: 90, product: 50, track: 80, total: 75 },
      ops: { financial: 20, operational: 40, total: 30 },
      capital: { history: 50, total: 50 },
    },
    assessmentBrief:
      "前沿脑科学赛道，技术壁垒高。目前处于临床试验阶段，无证无收，风险极高，但也具备极高的潜在回报。",
    details: {
      missingModules: 2,
      evaluation: "处于技术验证阶段，需长期资本支持。",
    },
    score: 68.5,
  },
  {
    id: "BP-2417",
    name: "柔性电子皮肤传感器",
    companyName: "常州柔性感测技术有限公司",
    legalRep: "沈力",
    established: "2022-09-09",
    location: "江苏·常州",
    scale: "20-49人",
    oneLiner: "解决机器人触觉缺失、无法进行精细操作的痛点",
    productIntro: "高灵敏度柔性压力传感器阵列。",
    keyClients: "优必选, 宇树科技",
    investors: "深创投",
    track: "新材料",
    trackLevel: "L2",
    source: "自主报名",
    scenario: ["智能穿戴"],
    revenue: "500万",
    profit: "-100万",
    funding: "天使轮 1200万",
    valuation: "6000万",
    uploaderId: "U-8901",
    uploaderName: "沈总",
    contact: "139****9999",
    fileName: "FlexSensor.pdf",
    reportName: "Sensor_Report.pdf",
    submitTime: "2024-01-30",
    tenant: "腾讯众创空间",
    tags: ["可穿戴", "进口替代", "高精度"],
    rawScores: { team: 88, tech: 92, market: 85, finance: 65 },
    detailedScores: {
      team: { ceo: 88, teamAvg: 88, total: 88 },
      tech: { moat: 92, product: 80, track: 85, total: 85.5 },
      ops: { financial: 60, operational: 70, total: 65 },
      capital: { history: 50, total: 50 },
    },
    assessmentBrief:
      "技术指标领先（Tier 1），实现进口替代。正处于产能爬坡期。市场需求稳步增长。",
    details: {
      missingModules: 1,
      evaluation: "技术指标领先，正处于产能爬坡期。",
    },
    score: 75.0,
  },
  {
    id: "BP-2418",
    name: "生成式AI游戏美术工具",
    companyName: "成都幻境网络科技有限公司",
    legalRep: "韩冰",
    established: "2023-05-05",
    location: "四川·成都",
    scale: "50-99人",
    oneLiner: "解决游戏开发中美术资产制作成本高、周期长的痛点",
    productIntro: "基于Stable Diffusion的3D游戏资产生成工具。",
    keyClients: "腾讯天美工作室, 米哈游(测试)",
    investors: "腾讯投资(天使)",
    track: "AIGC",
    trackLevel: "L3",
    source: "自主报名",
    scenario: ["游戏开发"],
    revenue: "1000万",
    profit: "300万",
    funding: "A轮 3000万",
    valuation: "2亿",
    uploaderId: "U-2346",
    uploaderName: "韩总",
    contact: "150****0000",
    fileName: "GenAI_Art.pdf",
    reportName: "GenAI_Report.pdf",
    submitTime: "2024-01-31",
    tenant: "杭州湾加速器",
    tags: ["AIGC", "降本增效", "爆发式增长"],
    rawScores: { team: 90, tech: 88, market: 95, finance: 80 },
    detailedScores: {
      team: { ceo: 90, teamAvg: 90, total: 90 },
      tech: { moat: 85, product: 90, track: 95, total: 90 },
      ops: { financial: 85, operational: 85, total: 85 },
      capital: { history: 80, total: 80 },
    },
    assessmentBrief:
      "抓住了AIGC风口，用户增长迅速（Tier 0增速）。商业变现能力强，已实现盈利。团队具有大厂背景。",
    details: {
      missingModules: 0,
      evaluation: "抓住了AIGC风口，用户增长迅速，商业变现能力强。",
    },
    score: 87.5,
  },
];

// --- Mock Data Expansion Logic (数据扩充逻辑) ---
// 目标：将种子数据精确扩充到 3596 个，保持逻辑一致性但具有唯一ID
const generateExtendedProjects = () => {
  const extended: any[] = [];

  // 辅助数组，用于随机化
  const locations = [
    "北京",
    "上海",
    "深圳",
    "杭州",
    "苏州",
    "成都",
    "武汉",
    "南京",
  ];

  const targetCount = 3596; // 目标总数
  const seedCount = SEED_PROJECTS.length; // 18个种子
  const fullCycles = Math.floor(targetCount / seedCount); // 完整循环次数: 199
  const remainder = targetCount % seedCount; // 剩余需要添加的: 14

  // 完整循环
  for (let i = 0; i < fullCycles; i++) {
    SEED_PROJECTS.forEach((project, index) => {
      const newId = `BP-${2400 + extended.length + 1}`;
      const isCopy = i > 0;

      const newProject = {
        ...project,
        id: newId,
        // 如果是复制品，稍微改动一下名字和数据，避免完全重复的视觉疲劳
        name: isCopy
          ? `${project.name} ${String.fromCharCode(65 + (i % 26))}`
          : project.name,
        companyName: isCopy
          ? project.companyName.replace(
              "有限公司",
              `(${String.fromCharCode(65 + (i % 26))})科技有限公司`
            )
          : project.companyName,
        revenue: isCopy
          ? `${
              parseInt(project.revenue) + Math.floor(Math.random() * 100 - 50)
            }万`
          : project.revenue,
        location: isCopy
          ? `${locations[Math.floor(Math.random() * locations.length)]}`
          : project.location,
        submitTime: `2024-02-${String(
          Math.floor(Math.random() * 28) + 1
        ).padStart(2, "0")} ${String(Math.floor(Math.random() * 23)).padStart(
          2,
          "0"
        )}:${String(Math.floor(Math.random() * 59)).padStart(2, "0")}`,
        // 随机微调分数
        score: parseFloat((project.score + (Math.random() * 4 - 2)).toFixed(1)),
      };

      extended.push(newProject);
    });
  }

  // 添加剩余项目以达到精确的3596个
  for (let j = 0; j < remainder; j++) {
    const project = SEED_PROJECTS[j];
    const newId = `BP-${2400 + extended.length + 1}`;

    const newProject = {
      ...project,
      id: newId,
      name: `${project.name} Extra`,
      companyName: project.companyName.replace(
        "有限公司",
        "(Extra)科技有限公司"
      ),
      revenue: `${
        parseInt(project.revenue) + Math.floor(Math.random() * 100 - 50)
      }万`,
      location: `${locations[Math.floor(Math.random() * locations.length)]}`,
      submitTime: `2024-02-${String(
        Math.floor(Math.random() * 28) + 1
      ).padStart(2, "0")} ${String(Math.floor(Math.random() * 23)).padStart(
        2,
        "0"
      )}:${String(Math.floor(Math.random() * 59)).padStart(2, "0")}`,
      score: parseFloat((project.score + (Math.random() * 4 - 2)).toFixed(1)),
    };

    extended.push(newProject);
  }

  return extended;
};

const MOCK_EXTENDED_PROJECTS = generateExtendedProjects();

// --- 环形图组件 (SVG Donut Chart) ---
const DonutChart = ({
  data,
  size = 160,
  thickness = 20,
}: {
  data: any[];
  size?: number;
  thickness?: number;
}) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let currentAngle = 0;
  const radius = (size - thickness) / 2;
  const center = size / 2;

  // 颜色盘
  const colors = [
    "#6366f1",
    "#8b5cf6",
    "#ec4899",
    "#f43f5e",
    "#f59e0b",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#64748b",
    "#94a3b8",
  ];

  if (total === 0) return <div className="text-xs text-slate-400">无数据</div>;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {data.map((item, index) => {
          const sliceAngle = (item.value / total) * 360;

          // 环长
          const circumference = 2 * Math.PI * radius;
          const strokeDasharray = `${
            (item.value / total) * circumference
          } ${circumference}`;
          const strokeDashoffset = -1 * (currentAngle / 360) * circumference;

          const circleElement = (
            <circle
              key={item.name}
              cx={center}
              cy={center}
              r={radius}
              fill="transparent"
              stroke={colors[index % colors.length]}
              strokeWidth={thickness}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-300 hover:opacity-80"
            />
          );

          currentAngle += sliceAngle;
          return circleElement;
        })}
      </svg>
      {/* 中心文字 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-2xl font-black text-slate-800">{total}</span>
        <span className="text-[10px] text-slate-400 font-bold uppercase">
          Projects
        </span>
      </div>
    </div>
  );
};

// ==========================================
// --- Components ---
// ==========================================

const SmartStatusBadge = ({
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

// 配额充值抽屉
const QuotaDrawer = ({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-xl text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
          >
            <X size={24} />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-8 space-y-8">{children}</div>
        <div className="p-8 border-t border-slate-100 bg-slate-50 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            取消
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            确认保存
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// --- 组件: Advanced Filter Modal (多维表格筛选) ---
// ==========================================

const AdvancedFilterModal = ({
  isOpen,
  onClose,
  onApply,
  initialConditions,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (conditions: any[]) => void;
  initialConditions: any[];
}) => {
  const [conditions, setConditions] = useState(initialConditions);

  // 初始化，如果没有条件则默认添加一个
  useEffect(() => {
    if (isOpen && conditions.length === 0) {
      setConditions([
        {
          id: `fc-${Date.now()}`,
          field: "name",
          operator: "contains",
          value: "",
          logic: "and",
        },
      ]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const addCondition = () => {
    setConditions([
      ...conditions,
      {
        id: `fc-${Date.now()}`,
        field: "name",
        operator: "contains",
        value: "",
        logic: "and",
      },
    ]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter((c: any) => c.id !== id));
  };

  const updateCondition = (id: string, key: string, val: any) => {
    setConditions(
      conditions.map((c: any) => (c.id === id ? { ...c, [key]: val } : c))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-[640px] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <Filter size={20} className="text-indigo-600" /> 高级筛选器
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {conditions.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              暂无筛选条件，请添加
            </div>
          ) : (
            <div className="space-y-3">
              {conditions.map((cond, index) => (
                <div key={cond.id} className="flex items-center gap-2">
                  {/* 逻辑连接符 (第一行隐藏) */}
                  <div className="w-16 flex-shrink-0">
                    {index > 0 && (
                      <select
                        value={cond.logic}
                        onChange={(e) =>
                          updateCondition(cond.id, "logic", e.target.value)
                        }
                        className="w-full text-xs font-bold text-slate-600 bg-slate-100 border-none rounded py-1.5 px-1 focus:ring-2 focus:ring-indigo-100 outline-none"
                      >
                        <option value="and">且 (And)</option>
                        <option value="or">或 (Or)</option>
                      </select>
                    )}
                    {index === 0 && (
                      <div className="text-xs font-bold text-slate-400 text-center">
                        当
                      </div>
                    )}
                  </div>

                  {/* 字段选择 */}
                  <select
                    value={cond.field}
                    onChange={(e) =>
                      updateCondition(cond.id, "field", e.target.value)
                    }
                    className="w-32 text-sm bg-white border border-slate-200 rounded-lg py-2 px-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  >
                    <option value="name">项目名称</option>
                    <option value="track">赛道</option>
                    <option value="tenant">所属租户</option>
                    <option value="revenue">营收 (数值)</option>
                    <option value="profit">利润 (数值)</option>
                    <option value="score">综合得分</option>
                  </select>

                  {/* 运算符选择 */}
                  <select
                    value={cond.operator}
                    onChange={(e) =>
                      updateCondition(cond.id, "operator", e.target.value)
                    }
                    className="w-24 text-sm bg-white border border-slate-200 rounded-lg py-2 px-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  >
                    <option value="eq">等于</option>
                    <option value="contains">包含</option>
                    <option value="not_contains">不包含</option>
                    <option value="gt">大于</option>
                    <option value="lt">小于</option>
                  </select>

                  {/* 值输入 */}
                  <input
                    type="text"
                    value={cond.value}
                    onChange={(e) =>
                      updateCondition(cond.id, "value", e.target.value)
                    }
                    placeholder="输入值..."
                    className="flex-1 text-sm bg-white border border-slate-200 rounded-lg py-2 px-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none"
                  />

                  {/* 删除按钮 */}
                  <button
                    onClick={() => removeCondition(cond.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={addCondition}
            className="mt-4 flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus size={14} /> 添加条件
          </button>
        </div>
        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all"
          >
            取消
          </button>
          <button
            onClick={() => {
              onApply(conditions);
              onClose();
            }}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            应用筛选
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// --- 组件: Prompt Optimizer (Gemini Studio Layout) ---
// ==========================================

const PromptOptimizer = ({ onClose, onGenerate, allConfigs }) => {
  const [messages, setMessages] = useState([
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
    const newMsgs = [...messages, { role: "user", content: input }];
    // @ts-ignore
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
    const newConfig = {
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

// ==========================================
// --- 组件: Config Detail Editor (配置微调) ---
// ==========================================

const ConfigDetailEditor = ({
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

// ==========================================
// --- 组件: 批量上传模态框 ---
// ==========================================

const BatchUploadModal = ({ isOpen, onClose }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    // 模拟上传逻辑
    alert(`准备上传 ${uploadedFiles.length} 个文件`);
    setUploadedFiles([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <Upload size={24} className="text-indigo-600" />
              批量上传项目
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              支持 Excel (.xlsx, .xls)、CSV 等格式文件
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 拖放上传区域 */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              dragActive
                ? "border-indigo-500 bg-indigo-50"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100"
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center">
                <Upload size={32} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900 mb-1">
                  拖放文件到此处
                </p>
                <p className="text-sm text-slate-500">或点击下方按钮选择文件</p>
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  multiple
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <div className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg transition-all">
                  选择文件
                </div>
              </label>
            </div>
          </div>

          {/* 上传模板下载 */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <FileText className="text-blue-600 shrink-0 mt-0.5" size={20} />
              <div className="flex-1">
                <h4 className="font-bold text-blue-900 text-sm mb-1">
                  下载上传模板
                </h4>
                <p className="text-xs text-blue-700 mb-3">
                  首次上传？请先下载标准模板，按格式填写项目信息后上传
                </p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm">
                  <Download size={14} className="inline mr-1" />
                  下载 Excel 模板
                </button>
              </div>
            </div>
          </div>

          {/* 已选文件列表 */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileText size={16} />
                已选择文件 ({uploadedFiles.length})
              </h4>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <FileText size={20} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {(file.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="p-2 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      <X size={16} className="text-slate-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-all"
          >
            取消
          </button>
          <button
            onClick={handleUpload}
            disabled={uploadedFiles.length === 0}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              uploadedFiles.length > 0
                ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            开始上传 ({uploadedFiles.length})
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// --- 组件: 项目详情透视 (最终完善版：含联系人+详细评分) ---
// ==========================================

const ProjectDetailModal = ({ project, config, onClose, isAdmin }) => {
  const [isScoreDetailsOpen, setIsScoreDetailsOpen] = useState(true); // 默认展开评分详情，方便查看

  // 模拟生成 100-150 字的项目简介
  const longDescription = useMemo(() => {
    return `${project.name} 成立于 ${project.established}，总部位于${
      project.location
    }，是一家专注于${project.track}赛道的${project.trackLevel}企业。公司${
      project.oneLiner
    }。核心产品为“${project.productIntro}”，目前在${project.scenario.join(
      "、"
    )}等场景已实现落地。${
      project.keyClients ? `主要服务客户包括${project.keyClients}。` : ""
    }作为${
      project.tags?.[0] || ""
    }代表性企业，团队拥有深厚的技术积累，致力于通过技术创新解决行业核心痛点。目前公司已获得${
      project.investors
    }等知名机构投资，营收规模达到${
      project.revenue
    }，展现出强劲的市场竞争力和增长潜力。`;
  }, [project]);

  // 评分数据兜底
  const scoreData = project.detailedScores || {
    team: { ceo: 0, teamAvg: 0, total: project.rawScores?.team || 0 },
    tech: {
      moat: 0,
      product: 0,
      track: 0,
      total: project.rawScores?.tech || 0,
    },
    ops: {
      financial: 0,
      operational: 0,
      total: project.rawScores?.finance || 0,
    },
    capital: { history: 0, total: project.rawScores?.market || 0 },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl max-h-[95vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header: 仅保留基础操作栏 */}
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white shrink-0 z-20">
          <div className="flex gap-4 text-xs text-slate-400">
            <span className="font-mono bg-slate-50 px-2 py-1 rounded border border-slate-100">
              ID: {project.id}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase size={14} /> {project.track}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6 bg-slate-50/50">
          {/* =======================
              1. 超级企名片 (统领信息)
             ======================= */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm relative overflow-hidden">
            {/* 装饰背景 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[100px] -mr-8 -mt-8 z-0 pointer-events-none"></div>

            <div className="relative z-10">
              {/* 1.1 头部：Logo + 名称 + 标签 (合并显示) */}
              <div className="flex flex-col md:flex-row md:items-start gap-5 mb-6 border-b border-slate-100 pb-6">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-200 shrink-0">
                  {project.companyName
                    ? project.companyName.substring(0, 1)
                    : "企"}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black text-slate-900">
                      {project.companyName || project.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded text-xs font-bold">
                        {project.track}
                      </span>
                      {project.tags?.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200 rounded text-xs font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 基础工商信息 (含来源) */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-xs text-slate-500 mt-3">
                    <div className="flex items-center gap-2">
                      <Landmark size={14} className="text-slate-400" /> 法人：
                      <span className="text-slate-700 font-bold">
                        {project.legalRep}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400" /> 成立：
                      <span className="text-slate-700 font-bold">
                        {project.established}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400" /> 地区：
                      <span className="text-slate-700 font-bold">
                        {project.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BriefcaseIcon size={14} className="text-slate-400" />{" "}
                      规模：
                      <span className="text-slate-700 font-bold">
                        {project.scale}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Share2 size={14} className="text-slate-400" /> 来源：
                      <span className="text-indigo-600 font-bold">
                        {project.source}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1.2 项目简介 */}
              <div className="mb-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FileText size={14} /> 项目简介
                </h4>
                <p className="text-sm text-slate-700 leading-7 bg-slate-50 p-4 rounded-xl border border-slate-100 text-justify">
                  {longDescription}
                </p>
              </div>

              {/* 1.3 业务与财务 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[60px] mt-0.5">
                        场景应用
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.scenario.map((s) => (
                          <span
                            key={s}
                            className="px-1.5 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-[4px] text-xs"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[60px] mt-0.5">
                        主要客户
                      </span>
                      <span className="text-xs text-slate-600 font-medium">
                        {project.keyClients || "暂未披露"}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[60px] mt-0.5">
                        投资机构
                      </span>
                      <span className="text-xs text-slate-600 font-medium">
                        {project.investors || "暂未披露"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50/50 rounded-xl p-4 border border-indigo-100 flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 mb-1">
                      营收规模
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      {project.revenue}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-indigo-200/50"></div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 mb-1">
                      净利润
                    </div>
                    <div
                      className={`text-sm font-black ${
                        project.profit.includes("-")
                          ? "text-rose-500"
                          : "text-emerald-600"
                      }`}
                    >
                      {project.profit}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-indigo-200/50"></div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 mb-1">
                      最新轮次
                    </div>
                    <div className="text-sm font-black text-indigo-600">
                      {project.funding}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-indigo-200/50"></div>
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 mb-1">
                      投后估值
                    </div>
                    <div className="text-sm font-black text-slate-900">
                      {project.valuation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =======================
              2. AI 智能评估长条 (合并版 + 详细评分还原)
             ======================= */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            {/* 主栏 */}
            <div
              className="p-6 flex flex-col md:flex-row gap-6 cursor-pointer hover:bg-slate-50 transition-colors relative"
              onClick={() => setIsScoreDetailsOpen(!isScoreDetailsOpen)}
            >
              <div className="flex-1 flex flex-col justify-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg">
                    <Sparkles size={16} fill="currentColor" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base">
                    AI 智能评估简报
                  </h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 md:pr-8">
                  {project.assessmentBrief ||
                    "基于多维数据模型，该项目展现出较强的技术壁垒，但在商业化落地方面仍需进一步验证。"}
                </p>
              </div>

              <div className="flex items-center gap-6 md:border-l md:border-slate-100 md:pl-6 shrink-0">
                <div className="text-right">
                  <div className="text-3xl font-black text-indigo-600 leading-none">
                    {project.score}
                    <span className="text-sm text-slate-300 ml-1 font-bold">
                      / 100
                    </span>
                  </div>
                  <div className="mt-1 flex justify-end">
                    <SmartStatusBadge score={project.score} />
                  </div>
                </div>
                <div
                  className={`w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 transition-transform duration-300 ${
                    isScoreDetailsOpen
                      ? "rotate-180 bg-indigo-100 text-indigo-500"
                      : ""
                  }`}
                >
                  <ChevronDown size={20} />
                </div>
              </div>
            </div>

            {/* 折叠区域：高保真还原详细评分 */}
            {isScoreDetailsOpen && (
              <div className="border-t border-slate-100 p-8 bg-slate-50/30 animate-in slide-in-from-top-2 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {/* 1. 团队画像 */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-800 text-sm">
                        1. 团队画像 (30%)
                      </h4>
                      <span className="font-black text-blue-600 text-lg">
                        {scoreData.team.total}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-32 shrink-0">
                          CEO评分 (学历/履历)
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.team.ceo}%` }}
                            className="h-full bg-blue-500 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.team.ceo}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-32 shrink-0">
                          核心团队均分
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.team.teamAvg}%` }}
                            className="h-full bg-blue-400 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.team.teamAvg}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 2. 技术与赛道 */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-800 text-sm">
                        2. 技术与赛道 (30%)
                      </h4>
                      <span className="font-black text-purple-600 text-lg">
                        {scoreData.tech.total}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-24 shrink-0">
                          技术护城河
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.tech.moat}%` }}
                            className="h-full bg-purple-500 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.tech.moat}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-24 shrink-0">
                          产品成熟度
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.tech.product}%` }}
                            className="h-full bg-purple-400 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.tech.product}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-24 shrink-0">
                          赛道潜力
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.tech.track}%` }}
                            className="h-full bg-purple-300 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.tech.track}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 3. 运营与财务 */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-800 text-sm">
                        3. 运营与财务 (30%)
                      </h4>
                      <span className="font-black text-emerald-600 text-lg">
                        {scoreData.ops.total}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-32 shrink-0">
                          财务健康度
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.ops.financial}%` }}
                            className="h-full bg-emerald-500 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.ops.financial}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-32 shrink-0">
                          运营数据评分
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.ops.operational}%` }}
                            className="h-full bg-emerald-400 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.ops.operational}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4. 资本背书 */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-800 text-sm">
                        4. 资本背书 (10%)
                      </h4>
                      <span className="font-black text-amber-600 text-lg">
                        {scoreData.capital.total}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-slate-500 w-24 shrink-0">
                          历史资方评级
                        </span>
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scoreData.capital.history}%` }}
                            className="h-full bg-amber-500 rounded-full"
                          ></div>
                        </div>
                        <span className="font-mono font-bold text-slate-700 w-6 text-right">
                          {scoreData.capital.history}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =======================
              3. 附件列表 (Middle)
             ======================= */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Paperclip size={16} className="text-slate-400" /> 附件与报告
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 text-red-500 rounded-xl flex items-center justify-center">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                      {project.fileName}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      原始 BP • PDF • {project.submitTime}
                    </div>
                  </div>
                </div>
                <button className="p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-lg shadow-sm">
                  <Download size={16} />
                </button>
              </div>

              {project.reportName && (
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-indigo-200 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-500 rounded-xl flex items-center justify-center">
                      <BarChart3 size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors">
                        {project.reportName}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        AI 深度诊断报告 • 自动生成
                      </div>
                    </div>
                  </div>
                  <button className="p-2 bg-white text-slate-400 hover:text-indigo-600 rounded-lg shadow-sm">
                    <Download size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* =======================
              4. 项目申请的生态服务需求 (Ecosystem Service Requests) - 三货架设计
              仅超级管理员可见
             ======================= */}
          {isAdmin && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Briefcase size={16} className="text-slate-400" />{" "}
                  项目申请的生态服务需求
                </h3>
                <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">
                  仅管理员可见
                </span>
              </div>

              {/* 货架1：合规与生存 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                  <h4 className="text-xs font-bold text-slate-700">
                    合规与生存
                  </h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* 法律/法务对接 - 已申请 */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-amber-200 transition-colors">
                      <Scale size={20} className="text-amber-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      法律/法务对接
                    </h4>
                    <p className="text-xs text-slate-500">合规咨询、合同审核</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-amber-600 font-bold">
                      <CheckCircle2 size={12} /> 已申请服务
                    </div>
                  </div>

                  {/* 财税/审计对接 - 已申请 */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-orange-200 transition-colors">
                      <Calculator size={20} className="text-orange-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      财税/审计对接
                    </h4>
                    <p className="text-xs text-slate-500">财务规划、税务筹划</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-orange-600 font-bold">
                      <CheckCircle2 size={12} /> 已申请服务
                    </div>
                  </div>

                  {/* 政策申报 - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <FileText size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      政策申报
                    </h4>
                    <p className="text-xs text-slate-400">政策咨询、项目申报</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>

                  {/* 知识产权 - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Shield size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      知识产权
                    </h4>
                    <p className="text-xs text-slate-400">专利申请、商标注册</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>
                </div>
              </div>

              {/* 货架2：增长与交易 */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                  <h4 className="text-xs font-bold text-slate-700">
                    增长与交易
                  </h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* 订单对接 - 已申请 */}
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-emerald-200 transition-colors">
                      <ShoppingCart size={20} className="text-emerald-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      订单对接
                    </h4>
                    <p className="text-xs text-slate-500">业务对接、订单撮合</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                      <CheckCircle2 size={12} /> 已申请服务
                    </div>
                  </div>

                  {/* FA顾问 - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Briefcase size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      FA顾问
                    </h4>
                    <p className="text-xs text-slate-400">
                      投融资顾问、资本对接
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>

                  {/* 品牌PR - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Megaphone size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      品牌PR
                    </h4>
                    <p className="text-xs text-slate-400">品牌传播、媒体曝光</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>
                </div>
              </div>

              {/* 货架3：要素与基建 */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                  <h4 className="text-xs font-bold text-slate-700">
                    要素与基建
                  </h4>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {/* 人才/猎头对接 - 已申请 */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100 hover:shadow-md transition-all cursor-pointer group">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                      <Users size={20} className="text-blue-600" />
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      人才/猎头对接
                    </h4>
                    <p className="text-xs text-slate-500">
                      高端人才招聘、团队组建
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-blue-600 font-bold">
                      <CheckCircle2 size={12} /> 已申请服务
                    </div>
                  </div>

                  {/* 数据服务 - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Database size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      数据服务
                    </h4>
                    <p className="text-xs text-slate-400">数据分析、市场洞察</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>

                  {/* 云资源与算力服务 - 未申请 */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-4 border border-slate-200 transition-all cursor-pointer group opacity-60">
                    <div className="w-10 h-10 bg-slate-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                      <Cloud size={20} className="text-slate-400" />
                    </div>
                    <h4 className="font-bold text-slate-500 text-sm mb-1">
                      云资源与算力
                    </h4>
                    <p className="text-xs text-slate-400">云服务、算力支持</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                      <Circle size={12} /> 暂无需求
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/// ==========================================
// --- 组件: 仪表盘 (Dashboard) - 完整版 ---
// ==========================================

const TenantDashboard = ({ projects }) => {
  const totalProjects = projects.length;
  const thisMonthCount = projects.filter((p) =>
    p.submitTime.includes("2024-02")
  ).length;
  const potentialLeads = 34;

  // --- 1. 数据统计逻辑 ---

  // A. 赛道分布
  const trackDistribution = projects.reduce((acc: any, curr) => {
    acc[curr.track] = (acc[curr.track] || 0) + 1;
    return acc;
  }, {});
  const trackData = Object.entries(trackDistribution)
    .map(([name, value]) => ({ name, value: value as number }))
    .sort((a, b) => b.value - a.value);

  // B. 融资轮次分布
  const fundingDistribution = projects.reduce((acc: any, curr) => {
    let key = "其他";
    if (curr.funding.includes("种子") || curr.funding.includes("天使"))
      key = "种子/天使轮";
    else if (curr.funding.includes("A轮") || curr.funding.includes("Pre-A"))
      key = "A轮阶段";
    else if (curr.funding.includes("B轮")) key = "B轮及以后";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const fundingData = Object.entries(fundingDistribution)
    .map(([name, value]) => ({ name, value: value as number }))
    .sort((a, b) => b.value - a.value);

  // C. 区域来源分布 (环形图逻辑)
  const locationDistribution = projects.reduce((acc: any, curr) => {
    let region = curr.location.split("·")[0];
    if (curr.location.includes("北京")) region = "北京";
    else if (curr.location.includes("上海")) region = "上海";
    else if (curr.location.includes("深圳") || curr.location.includes("广州"))
      region = "广东";
    else if (curr.location.includes("苏州") || curr.location.includes("南京"))
      region = "江苏";
    else if (curr.location.includes("杭州")) region = "浙江";
    else if (curr.location.includes("成都")) region = "四川";

    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {});

  let locationDataSorted = Object.entries(locationDistribution)
    .map(([name, value]) => ({ name, value: value as number }))
    .sort((a, b) => b.value - a.value);

  if (locationDataSorted.length > 6) {
    const top6 = locationDataSorted.slice(0, 6);
    const others = locationDataSorted
      .slice(6)
      .reduce((sum, item) => sum + item.value, 0);
    locationDataSorted = [...top6, { name: "其他地区", value: others }];
  }
  const locationData = locationDataSorted;

  // D. 质量评级统计 (补回的逻辑)
  const qualityStats = projects.reduce(
    (acc, p) => {
      if (p.score >= 90) acc.s += 1;
      else if (p.score >= 80) acc.a += 1;
      else if (p.score >= 70) acc.b += 1;
      else acc.c += 1;
      return acc;
    },
    { s: 0, a: 0, b: 0, c: 0 }
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500 p-8 pb-20">
      {/* 1. 顶部 KPI 卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Database size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
              +12%
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">
            {totalProjects}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            项目库累计规模 (个)
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <FileText size={24} />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
              本月
            </span>
          </div>
          <div className="text-3xl font-black text-slate-900 mb-1">
            {thisMonthCount}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            本月新增入库 (个)
          </div>
        </div>
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl border border-indigo-500 shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Sparkles size={80} />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Target size={24} />
              </div>
              <span className="text-xs font-bold text-white/80 bg-white/10 px-2 py-1 rounded backdrop-blur-sm">
                待处理
              </span>
            </div>
            <div className="text-3xl font-black mb-1">{potentialLeads}</div>
            <div className="text-xs text-indigo-100 font-medium">
              潜在生态线索待匹配
            </div>
          </div>
        </div>
      </div>

      {/* 2. 第一排：赛道分布 + 入库趋势 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：赛道环形图 */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <PieChart size={18} className="text-slate-400" /> 赛道分布概览
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-shrink-0">
              <DonutChart data={trackData} size={180} thickness={25} />
            </div>
            <div className="flex-1 w-full grid grid-cols-2 gap-x-6 gap-y-3">
              {trackData.map((item, idx) => {
                const percent = ((item.value / totalProjects) * 100).toFixed(1);
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between text-sm group"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 bg-indigo-${
                          ((idx % 5) + 4) * 100
                        }`}
                      ></span>
                      <span className="text-slate-600 font-medium whitespace-nowrap truncate">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        {percent}%
                      </span>
                      <span className="font-bold text-slate-900 w-5 text-right">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右侧：入库趋势 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-slate-400" /> 入库趋势 (周)
          </h3>
          <div className="flex-1 flex items-end justify-between gap-3 px-2 pb-2">
            {[12, 18, 15, 24, 20, 32, 28, 35].map((val, idx) => (
              <div
                key={idx}
                className="w-full flex flex-col items-center gap-2 group"
              >
                <div className="relative w-full bg-slate-50 rounded-t-lg h-40 overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-lg transition-all duration-700 ease-out group-hover:bg-indigo-600"
                    style={{ height: `${(val / 40) * 100}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">
                  W{idx + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. 新增第二排：融资轮次环形图 + 区域分布环形图 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：融资轮次分布 */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Banknote size={18} className="text-slate-400" /> 融资轮次分布
            </h3>
          </div>
          <div className="flex items-center justify-center gap-8">
            <div className="shrink-0">
              <DonutChart data={fundingData} size={160} thickness={25} />
            </div>
            <div className="flex-1 space-y-3 max-w-[200px]">
              {fundingData.map((item, idx) => {
                const percent = ((item.value / totalProjects) * 100).toFixed(1);
                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div
                        className={`w-2.5 h-2.5 shrink-0 rounded-full bg-purple-${
                          (idx + 4) * 100
                        }`}
                      ></div>
                      <div className="text-sm font-bold text-slate-700 truncate">
                        {item.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded-md">
                        {percent}%
                      </span>
                      <span className="text-xs text-slate-400 w-4 text-right">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右侧：区域分布 (环形图) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <MapPin size={18} className="text-slate-400" /> 区域来源分布 (Top
              6)
            </h3>
          </div>
          <div className="flex items-center justify-center gap-8">
            <div className="shrink-0">
              <DonutChart data={locationData} size={160} thickness={25} />
            </div>
            <div className="flex-1 space-y-3 max-w-[200px]">
              {locationData.map((item, idx) => {
                const percent = ((item.value / totalProjects) * 100).toFixed(1);
                const colors = [
                  "bg-rose-500",
                  "bg-orange-500",
                  "bg-amber-500",
                  "bg-emerald-500",
                  "bg-cyan-500",
                  "bg-blue-500",
                  "bg-slate-400",
                ];
                const colorClass = colors[idx] || "bg-slate-400";

                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div
                        className={`w-2.5 h-2.5 shrink-0 rounded-full ${colorClass}`}
                      ></div>
                      <div className="text-sm font-bold text-slate-700 truncate">
                        {item.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded-md">
                        {percent}%
                      </span>
                      <span className="text-xs text-slate-400 w-4 text-right">
                        {item.value}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 4. 底部：整体质量评级概览 (补回的板块) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Activity size={18} className="text-slate-400" /> 整体质量评级概览
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(qualityStats).map(([key, val]) => {
            const labels: any = {
              s: "S级 (极优)",
              a: "A级 (推荐)",
              b: "B级 (储备)",
              c: "C级 (观察)",
            };
            const colors: any = {
              s: "text-rose-600 bg-rose-50",
              a: "text-indigo-600 bg-indigo-50",
              b: "text-emerald-600 bg-emerald-50",
              c: "text-slate-500 bg-slate-100",
            };
            return (
              <div
                key={key}
                className={`p-6 rounded-2xl flex flex-col items-center justify-center border border-transparent hover:border-slate-200 transition-all ${
                  colors[key].split(" ")[1]
                }`}
              >
                <span
                  className={`text-4xl font-black mb-2 ${
                    colors[key].split(" ")[0]
                  }`}
                >
                  {val as number}
                </span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider opacity-80">
                  {labels[key]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
// ==========================================
// --- 主应用组件 ---
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard"); // Default to dashboard for tenant view
  const [activeConfigId, setActiveConfigId] = useState("CONF-001");
  const [configs, setConfigs] = useState(MOCK_CONFIGS);

  // 状态管理
  const [isAdmin, setIsAdmin] = useState(false); // 默认为租户视角
  const [showPromptOptimizer, setShowPromptOptimizer] = useState(false);
  const [editingConfig, setEditingConfig] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTenant, setActiveTenant] = useState<any>(null);

  // 筛选器状态
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filterConditions, setFilterConditions] = useState<any[]>([]);

  // 项目库搜索状态
  const [projectSearchText, setProjectSearchText] = useState("");

  // 批量上传状态
  const [isBatchUploadModalOpen, setIsBatchUploadModalOpen] = useState(false);

  // 生态对接筛选状态
  const [ecoSearchText, setEcoSearchText] = useState("");
  const [ecoServiceType, setEcoServiceType] = useState("");
  const [ecoStatus, setEcoStatus] = useState("");

  // 业务流水筛选状态
  const [businessServiceType, setBusinessServiceType] = useState("全部");

  // 生态流水筛选状态
  const [ecosystemCategory, setEcosystemCategory] = useState("全部");

  // 收入流水筛选状态
  const [financialTransactionType, setFinancialTransactionType] =
    useState("全部");

  // 生态服务分润的展开/折叠状态
  const [isEcoServiceExpanded, setIsEcoServiceExpanded] = useState(false);

  const currentConfig = useMemo(
    () => configs.find((c) => c.id === activeConfigId) || configs[0],
    [configs, activeConfigId]
  );

  // 监听身份切换，如果切换为普通用户且当前在管理员独有页面，则跳转
  useEffect(() => {
    if (!isAdmin && activeTab === "tenants") {
      setActiveTab("dashboard");
    }
  }, [isAdmin, activeTab]);

  // 辅助函数：解析带中文单位的金额字符串为数值 (简单实现)
  const parseCurrency = (str) => {
    if (!str) return 0;
    let num = parseFloat(str);
    if (isNaN(num)) return 0;
    if (str.includes("万")) num *= 10000;
    if (str.includes("亿")) num *= 100000000;
    return num;
  };

  // 动态排序与算分逻辑 + 筛选逻辑
  const sortedAndFilteredProjects = useMemo(() => {
    let projects = [...MOCK_EXTENDED_PROJECTS].map((project) => {
      // Use existing pre-calculated score or recalculate if needed based on weights
      // Here we trust the mock score for simplicity in display
      return project;
    });

    // 1. 排序
    projects.sort((a, b) => b.score - a.score);

    // 2. 搜索过滤
    if (projectSearchText.trim()) {
      const searchLower = projectSearchText.toLowerCase();
      projects = projects.filter((project) => {
        return (
          project.name.toLowerCase().includes(searchLower) ||
          project.companyName?.toLowerCase().includes(searchLower) ||
          project.uploaderName.toLowerCase().includes(searchLower) ||
          project.id.toLowerCase().includes(searchLower) ||
          project.track.toLowerCase().includes(searchLower) ||
          project.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
      });
    }

    // 3. 高级筛选
    if (filterConditions.length > 0) {
      projects = projects.filter((project) => {
        let result = true;

        for (let i = 0; i < filterConditions.length; i++) {
          const cond: any = filterConditions[i];
          let conditionMet = false;

          const valStr = String((project as any)[cond.field] || "");
          const filterValStr = cond.value;

          if (["revenue", "profit"].includes(cond.field)) {
            // 数值比较
            const projectVal = parseCurrency(valStr);
            const filterVal = parseFloat(filterValStr) || 0;
            const filterValParsed = parseCurrency(filterValStr) || filterVal;

            if (cond.operator === "eq")
              conditionMet = projectVal === filterValParsed;
            else if (cond.operator === "gt")
              conditionMet = projectVal > filterValParsed;
            else if (cond.operator === "lt")
              conditionMet = projectVal < filterValParsed;
            else if (cond.operator === "contains")
              conditionMet = valStr.includes(filterValStr);
            else if (cond.operator === "not_contains")
              conditionMet = !valStr.includes(filterValStr);
          } else if (cond.field === "score") {
            const projectScore = project.score;
            const filterScore = parseFloat(filterValStr) || 0;
            if (cond.operator === "eq")
              conditionMet = projectScore === filterScore;
            else if (cond.operator === "gt")
              conditionMet = projectScore > filterScore;
            else if (cond.operator === "lt")
              conditionMet = projectScore < filterScore;
          } else {
            // 字符串比较
            if (cond.operator === "eq") conditionMet = valStr === filterValStr;
            else if (cond.operator === "contains")
              conditionMet = valStr.includes(filterValStr);
            else if (cond.operator === "not_contains")
              conditionMet = !valStr.includes(filterValStr);
            else if (cond.operator === "gt" || cond.operator === "lt") {
              conditionMet =
                cond.operator === "gt"
                  ? valStr > filterValStr
                  : valStr < filterValStr;
            }
          }

          if (i === 0) {
            result = conditionMet;
          } else {
            if (cond.logic === "and") {
              result = result && conditionMet;
            } else {
              result = result || conditionMet;
            }
          }
        }
        return result;
      });
    }

    return projects;
  }, [currentConfig, filterConditions, projectSearchText]);

  // 生态对接筛选逻辑
  const filteredEcosystemRequests = useMemo(() => {
    let filtered = [...ECOSYSTEM_SERVICE_REQUESTS];

    // 文本搜索：企业名称、需求明细
    if (ecoSearchText.trim()) {
      const searchLower = ecoSearchText.toLowerCase();
      filtered = filtered.filter(
        (req) =>
          req.companyName.toLowerCase().includes(searchLower) ||
          req.requirementDetails.toLowerCase().includes(searchLower)
      );
    }

    // 服务类型筛选
    if (ecoServiceType) {
      filtered = filtered.filter((req) => req.serviceType === ecoServiceType);
    }

    // 状态筛选
    if (ecoStatus) {
      filtered = filtered.filter((req) => req.status === ecoStatus);
    }

    return filtered;
  }, [ecoSearchText, ecoServiceType, ecoStatus]);

  // 业务流水筛选逻辑
  const filteredBusinessOrders = useMemo(() => {
    let filtered = [...BUSINESS_ORDERS];

    // 服务类型筛选
    if (businessServiceType !== "全部") {
      filtered = filtered.filter(
        (order) => order.serviceType === businessServiceType
      );
    }

    return filtered;
  }, [businessServiceType]);

  // 生态流水筛选逻辑
  const filteredEcosystemTransactions = useMemo(() => {
    let filtered = [...ECOSYSTEM_TRANSACTIONS];

    // 服务类型筛选（去除三大货架概念）
    if (ecosystemCategory !== "全部") {
      filtered = filtered.filter(
        (trans) => trans.serviceType === ecosystemCategory
      );
    }

    return filtered;
  }, [ecosystemCategory]);

  // 收入流水筛选逻辑（合并业务流水和生态流水）
  const allFinancialTransactions = useMemo(() => {
    // 将业务流水转换为统一格式（计算分润金额）
    const businessTrans = BUSINESS_ORDERS.map((order) => ({
      id: order.id,
      type: "科技产品",
      projectName: order.projectName,
      category: order.serviceType,
      detail: `${order.serviceType}服务`,
      amount: order.amount,
      profitShare:
        order.status === "已完成" ? order.amount * order.profitRate : 0, // 根据profitRate计算分润
      time: order.uploadTime,
      status: order.status,
      uploader: order.uploader,
      paymentMethod: order.paymentMethod,
    }));

    // 将生态流水转换为统一格式
    const ecoTrans = ECOSYSTEM_TRANSACTIONS.map((trans) => ({
      id: trans.id,
      type: "生态服务",
      projectName: trans.projectName,
      category: trans.serviceType, // 直接使用serviceType（已去掉三大货架）
      detail: trans.serviceType,
      amount: trans.amount,
      profitShare: trans.profitShare,
      time: trans.createdAt,
      status: trans.dealStatus,
      partnerName: trans.partnerName,
      progress: trans.progress,
    }));

    return [...businessTrans, ...ecoTrans];
  }, []);

  const filteredFinancialTransactions = useMemo(() => {
    let filtered = [...allFinancialTransactions];

    if (financialTransactionType !== "全部") {
      filtered = filtered.filter(
        (trans) => trans.type === financialTransactionType
      );
    }

    return filtered;
  }, [allFinancialTransactions, financialTransactionType]);

  const updateConfig = (id, newWeights, newPrompt, isNewVersion) => {
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

  const handleConfigGenerated = (newConfig) => {
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
          onApply={(id) => setActiveConfigId(id)}
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
      <QuotaDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={`点数调整: ${activeTenant?.name || ""}`}
      >
        <div className="space-y-8">
          <div className="p-6 bg-indigo-50 rounded-3xl">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1">
              当前剩余点数
            </p>
            <h5 className="text-3xl font-black text-indigo-900">
              {(
                (activeTenant?.quotaTotal || 0) - (activeTenant?.quotaUsed || 0)
              ).toLocaleString()}{" "}
              <span className="text-sm font-bold opacity-60 ml-1">点</span>
            </h5>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              增加点数额度
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[100, 500, 1000, 5000].map((val) => (
                <button
                  key={val}
                  className="py-4 border border-slate-100 rounded-2xl text-sm font-black hover:border-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  +{val} 点
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              手动输入点数
            </label>
            <input
              type="number"
              placeholder="请输入数值"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 font-bold"
            />
          </div>
          <div className="p-6 bg-amber-50 rounded-3xl flex gap-4 border border-amber-100">
            <AlertCircle className="text-amber-500 shrink-0" size={20} />
            <p className="text-xs font-bold text-amber-800 leading-relaxed">
              点数增加将立即反映在租户账户。该操作作为“管理员手动充值点数”记录在流水中。
            </p>
          </div>
        </div>
      </QuotaDrawer>

      {/* 侧边导航栏 */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl z-20 shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <LayoutGrid size={20} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight">
              Acture 智能运营平台
            </span>
          </div>
          {/* 身份状态指示器 */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <div
              className={`w-2 h-2 rounded-full ${
                isAdmin ? "bg-indigo-500" : "bg-emerald-500"
              }`}
            />
            <span className="text-xs font-bold text-slate-300">
              {isAdmin ? "超级管理员 (Admin)" : "云创未来产业园"}
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 overflow-y-auto space-y-8 pb-8 custom-scrollbar">
          {/* 1. 项目管理平台 */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              项目管理平台
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "dashboard"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <LayoutDashboard size={18} />
                <span className="text-sm font-bold">项目概览</span>
              </button>
              <button
                onClick={() => setActiveTab("project_library")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "project_library"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Database size={18} />
                <span className="text-sm font-bold">项目库</span>
              </button>
            </div>
          </div>

          {/* 2. 生态服务平台 */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              生态服务平台
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("ecosystem_dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "ecosystem_dashboard"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <LayoutGrid size={18} />
                <span className="text-sm font-bold">生态看板</span>
              </button>
              <button
                onClick={() => setActiveTab("ecosystem_connect")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "ecosystem_connect"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Handshake size={18} />
                <span className="text-sm font-bold">生态对接</span>
              </button>
              {/* 仅管理员可见：生态资源方 */}
              {isAdmin && (
                <button
                  onClick={() => setActiveTab("ecosystem_partners")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "ecosystem_partners"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Network size={18} />
                  <span className="text-sm font-bold">生态资源方</span>
                </button>
              )}
            </div>
          </div>

          {/* 3. 智能分润系统 */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              智能分润系统
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("financial_dashboard")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "financial_dashboard"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <BarChart3 size={18} />
                <span className="text-sm font-bold">收入看板</span>
              </button>
              <button
                onClick={() => setActiveTab("financial_transactions")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "financial_transactions"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Receipt size={18} />
                <span className="text-sm font-bold">收入流水</span>
              </button>
            </div>
          </div>

          {/* 4. 基础运营 */}
          <div>
            <div className="px-2 mb-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
              基础运营
            </div>
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab("configs")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "configs"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Sliders size={18} />
                <span className="text-sm font-bold">配置管理器</span>
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "orders"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <ShoppingCart size={18} />
                <span className="text-sm font-bold">点数订单</span>
              </button>
              {/* 仅管理员可见：租户管理 */}
              {isAdmin && (
                <button
                  onClick={() => setActiveTab("tenants")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "tenants"
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Building2 size={18} />
                  <span className="text-sm font-bold">租户管理</span>
                </button>
              )}
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "users"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Users size={18} />
                <span className="text-sm font-bold">用户管理</span>
              </button>
              <button
                onClick={() => setActiveTab("quota")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === "quota"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Layers size={18} />
                <span className="text-sm font-bold">配额管理</span>
              </button>
            </div>
          </div>
        </nav>

        {/* 身份切换器 */}
        <div className="p-6 mt-auto border-t border-slate-800">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={14} />
            {isAdmin ? "切换至租户视角" : "切换至管理员视角"}
          </button>
        </div>
      </aside>

      {/* 主内容区域 */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-slate-50">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-xl text-slate-800">
              {activeTab === "dashboard"
                ? "项目概览"
                : activeTab === "project_library"
                ? "项目库"
                : activeTab === "ecosystem_connect"
                ? "生态对接"
                : activeTab === "ecosystem_dashboard"
                ? "生态看板"
                : activeTab === "ecosystem_partners"
                ? "生态资源方"
                : activeTab === "financial_dashboard"
                ? "收入看板"
                : activeTab === "financial_transactions"
                ? "收入流水"
                : activeTab === "configs"
                ? "配置管理器"
                : activeTab === "orders"
                ? "点数订单"
                : activeTab === "tenants"
                ? "租户管理"
                : activeTab === "users"
                ? "用户管理"
                : activeTab === "quota"
                ? "配额管理"
                : "运营中心"}
            </h2>
          </div>

          {/* 项目库专属 Header 信息 */}
          {activeTab === "project_library" ? (
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  当前操作员
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {isAdmin ? "Admin_01" : "Tenant_User"}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200"></div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  当前生效配置
                </span>
                <div className="flex items-center gap-1.5 text-indigo-600">
                  <Zap size={12} fill="currentColor" />
                  <span className="text-sm font-black">
                    {currentConfig.name}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  当前身份
                </p>
                <p className="text-sm font-bold text-slate-700">
                  {isAdmin ? "超级管理员" : "云创未来产业园"}
                </p>
              </div>
              <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                <UserCircle size={20} />
              </div>
            </div>
          )}
        </header>

        <div className="flex-1 overflow-auto p-8">
          {/* --- 0. 仪表盘 (新增) --- */}
          {activeTab === "dashboard" && (
            <TenantDashboard projects={MOCK_EXTENDED_PROJECTS} />
          )}

          {/* --- 1. 项目库 (核心业务) --- */}
          {activeTab === "project_library" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* 搜索框和筛选器同行布局 */}
              <div className="flex gap-4 items-center">
                {/* 搜索框 - 75% 宽度 */}
                <div className="flex-[3]">
                  <div className="relative">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={20}
                    />
                    <input
                      type="text"
                      placeholder="搜索项目名称、上传人、赛道、标签等..."
                      value={projectSearchText}
                      onChange={(e) => setProjectSearchText(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white shadow-sm"
                    />
                    {projectSearchText && (
                      <button
                        onClick={() => setProjectSearchText("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* 筛选器 - 25% 宽度 */}
                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-sm border ${
                    filterConditions.length > 0
                      ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Filter size={16} />
                  高级筛选
                  {filterConditions.length > 0 && (
                    <span className="bg-indigo-600 text-white text-[10px] px-1.5 rounded-full">
                      {filterConditions.length}
                    </span>
                  )}
                </button>
              </div>

              {/* 项目统计信息 */}
              <div className="text-sm text-slate-500">
                共 {sortedAndFilteredProjects.length} 个项目
                {(filterConditions.length > 0 || projectSearchText) && (
                  <span className="text-indigo-600 font-medium">
                    {" "}
                    (已过滤
                    {filterConditions.length > 0 &&
                      ` ${filterConditions.length} 个筛选条件`}
                    {filterConditions.length > 0 && projectSearchText && "，"}
                    {projectSearchText && "关键词搜索"})
                  </span>
                )}
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full whitespace-nowrap text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      <th className="px-6 py-4 text-center w-16">排名</th>
                      <th className="px-6 py-4">项目基础信息</th>
                      <th className="px-6 py-4">上传信息</th>
                      <th className="px-6 py-4">赛道</th>
                      <th className="px-6 py-4">场景</th>
                      <th className="px-6 py-4">财务与融资</th>
                      <th className="px-6 py-4">标签库</th>
                      <th className="px-6 py-4">综合得分</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sortedAndFilteredProjects.map((project, index) => (
                      <tr
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
                      >
                        <td className="px-6 py-4 text-center">
                          <div
                            className={`w-8 h-8 rounded-lg mx-auto flex items-center justify-center text-sm font-black ${
                              index === 0
                                ? "bg-amber-100 text-amber-600"
                                : index === 1
                                ? "bg-slate-100 text-slate-600"
                                : index === 2
                                ? "bg-orange-50 text-orange-600"
                                : "text-slate-400"
                            }`}
                          >
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-800 text-sm mb-1">
                            {project.name}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">
                            {project.id}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col text-xs text-slate-600">
                            <span className="font-bold">
                              {project.uploaderName}
                            </span>
                            <span className="text-slate-400 scale-90 origin-left">
                              {project.submitTime}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-bold border border-slate-200">
                            {project.track}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1 flex-wrap max-w-[150px]">
                            {project.scenario.map((s) => (
                              <span
                                key={s}
                                className="px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium border border-blue-100"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs space-y-1">
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-400 w-6">营收</span>{" "}
                              <span className="font-medium text-slate-700">
                                {project.revenue}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-400 w-6">利润</span>{" "}
                              <span
                                className={`font-medium ${
                                  project.profit.includes("-")
                                    ? "text-rose-500"
                                    : "text-emerald-600"
                                }`}
                              >
                                {project.profit}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-slate-400 w-6">融资</span>{" "}
                              <span className="font-bold text-indigo-600">
                                {project.funding}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-1 flex-wrap max-w-[200px]">
                            {project.tags.map((t) => (
                              <span
                                key={t}
                                className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${
                                  t.includes("清北") || t.includes("海外")
                                    ? "bg-purple-50 text-purple-700 border-purple-100"
                                    : t.includes("营收")
                                    ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                    : "bg-amber-50 text-amber-700 border-amber-100"
                                }`}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-black text-slate-900 tracking-tight">
                              {project.score}
                            </span>
                            <SmartStatusBadge score={project.score} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 批量上传按钮 */}
              <div className="flex justify-center">
                <button
                  onClick={() => setIsBatchUploadModalOpen(true)}
                  className="group flex items-center gap-3 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-all">
                    <Plus size={20} />
                  </div>
                  批量上传项目
                </button>
              </div>
            </div>
          )}

          {/* --- 2. 配置管理器 (核心业务) --- */}
          {activeTab === "configs" && (
            <div className="space-y-6 relative h-full">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    配置策略库
                  </h3>
                  <p className="text-slate-500 mt-2">
                    点击配置卡片进入详情页，可进行 Prompt 编排与权重微调。
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
                {configs.map((config) => (
                  <div
                    key={config.id}
                    onClick={() => setEditingConfig(config)}
                    className={`p-6 rounded-2xl border transition-all cursor-pointer group hover:border-indigo-300 hover:shadow-xl bg-white border-slate-200 relative overflow-hidden flex flex-col`}
                  >
                    {activeConfigId === config.id && (
                      <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl z-10 shadow-sm">
                        当前激活
                      </div>
                    )}

                    <div className="mb-4">
                      <h4
                        className="font-bold text-lg mb-2 text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1"
                        title={config.name}
                      >
                        {config.name}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {config.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      <div className="px-2 py-1 bg-slate-100 rounded text-[10px] font-mono text-slate-500 border border-slate-200 truncate max-w-[120px]">
                        {config.skillId}
                      </div>
                      {config.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* 卡片底部的应用按钮区 */}
                    <div
                      className="pt-4 mt-auto border-t border-slate-50 flex items-center justify-between gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-[10px] text-slate-400">
                        最后更新: {config.lastUpdated}
                      </span>
                      {activeConfigId === config.id ? (
                        <button className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold cursor-default flex items-center gap-1">
                          <CheckCircle2 size={14} /> 已应用
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveConfigId(config.id);
                          }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all flex items-center gap-1.5"
                        >
                          <Power size={14} /> 应用配置
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAB: 新建配置 */}
              <button
                onClick={() => setShowPromptOptimizer(true)}
                className="fixed bottom-10 right-10 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl hover:bg-indigo-700 hover:scale-110 active:scale-95 transition-all flex items-center justify-center z-30 group"
              >
                <Plus
                  size={32}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </button>
            </div>
          )}

          {/* --- 生态对接页面 --- */}
          {activeTab === "ecosystem_connect" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* 页面头部 */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    生态对接
                  </h3>
                  <p className="text-slate-500 mt-2">
                    管理园区内企业提交的生态服务需求，需要扶持时可联系BP诊断运营团队
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
                  <Phone size={16} className="text-indigo-600" />
                  <div>
                    <div className="text-[10px] text-indigo-400 font-bold">
                      BP诊断运营热线
                    </div>
                    <div className="text-sm font-black text-indigo-600">
                      400-888-8888
                    </div>
                  </div>
                </div>
              </div>

              {/* 筛选和搜索栏 */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1 relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder="搜索企业名称、需求明细..."
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                      value={ecoSearchText}
                      onChange={(e) => setEcoSearchText(e.target.value)}
                    />
                  </div>
                  <select
                    className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    value={ecoServiceType}
                    onChange={(e) => setEcoServiceType(e.target.value)}
                  >
                    <option value="">全部服务类型</option>
                    <option value="法律">法律</option>
                    <option value="财税">财税</option>
                    <option value="政策申报">政策申报</option>
                    <option value="知识产权">知识产权</option>
                    <option value="订单对接">订单对接</option>
                    <option value="FA顾问">FA顾问</option>
                    <option value="品牌PR">品牌PR</option>
                    <option value="人才">人才</option>
                    <option value="数据">数据</option>
                    <option value="云资源">云资源</option>
                  </select>
                  <select
                    className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    value={ecoStatus}
                    onChange={(e) => setEcoStatus(e.target.value)}
                  >
                    <option value="">全部状态</option>
                    <option value="待处理需求">待处理需求</option>
                    <option value="处理中需求">处理中需求</option>
                    <option value="已完成需求对接">已完成需求对接</option>
                  </select>
                  <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-200 transition-colors flex items-center gap-2">
                    <Download size={16} />
                    导出
                  </button>
                </div>
              </div>

              {/* 生态需求管理表格 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                          企业名称
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                          服务类型
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                          需求明细
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                          潜在匹配方
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                          上传时间
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                          对接状态
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredEcosystemRequests.map((req) => (
                        <tr
                          key={req.id}
                          className="hover:bg-slate-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-bold text-slate-900">
                              {req.companyName}
                            </div>
                            <div className="text-xs text-slate-500">
                              {req.id}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                [
                                  "法律",
                                  "财税",
                                  "政策申报",
                                  "知识产权",
                                ].includes(req.serviceType)
                                  ? "bg-emerald-100 text-emerald-700"
                                  : ["订单对接", "FA顾问", "品牌PR"].includes(
                                      req.serviceType
                                    )
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-purple-100 text-purple-700"
                              }`}
                            >
                              {req.serviceType}
                            </span>
                          </td>
                          <td className="px-6 py-4 max-w-md">
                            <div className="text-sm text-slate-700 line-clamp-2">
                              {req.requirementDetails}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-slate-600 flex items-center gap-1">
                              <Users size={14} className="text-slate-400" />
                              {req.potentialPartner}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-slate-600">
                              {req.uploadTime}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                req.status === "已完成需求对接"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : req.status === "处理中需求"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                <Edit3 size={16} />
                              </button>
                              <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                <MoreHorizontal size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 联系运营说明 */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black">需要生态扶持？</h4>
                      <p className="text-indigo-100 text-sm">
                        如需为园区企业对接生态服务，请联系BP诊断运营团队：400-888-8888
                      </p>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2">
                    <Phone size={18} />
                    联系运营
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- 生态看板页面 --- */}
          {activeTab === "ecosystem_dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* 页面头部 */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    生态看板
                  </h3>
                  <p className="text-slate-500 mt-2">
                    查看所有生态服务需求的匹配状态和进展
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("ecosystem_connect")}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center gap-2"
                >
                  <Plus size={18} />
                  提交新需求
                </button>
              </div>

              {/* 统计卡片（大字报形式） */}
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-3xl p-8 text-white shadow-xl">
                  <div className="text-sm font-bold uppercase tracking-wider opacity-80 mb-2">
                    总需求数
                  </div>
                  <div className="text-6xl font-black mb-2">2451</div>
                  <div className="text-base opacity-80 mb-3">条</div>
                  <div className="text-xs opacity-70 border-t border-white/20 pt-3">
                    包含所有已提交的生态服务需求
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white shadow-xl">
                  <div className="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">
                    待处理需求
                  </div>
                  <div className="text-6xl font-black mb-2">1044</div>
                  <div className="text-base opacity-90 mb-3">条</div>
                  <div className="text-xs opacity-80 border-t border-white/20 pt-3">
                    等待资源方对接的新需求
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 text-white shadow-xl">
                  <div className="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">
                    处理中需求
                  </div>
                  <div className="text-6xl font-black mb-2">560</div>
                  <div className="text-base opacity-90 mb-3">条</div>
                  <div className="text-xs opacity-80 border-t border-white/20 pt-3">
                    正在与资源方洽谈匹配中
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-8 text-white shadow-xl">
                  <div className="text-sm font-bold uppercase tracking-wider opacity-90 mb-2">
                    已完成需求对接
                  </div>
                  <div className="text-6xl font-black mb-2">847</div>
                  <div className="text-base opacity-90 mb-3">条</div>
                  <div className="text-xs opacity-80 border-t border-white/20 pt-3">
                    成功匹配并完成服务对接
                  </div>
                </div>
              </div>

              {/* 数据可视化：按状态分布 + 按类目分布 */}
              <div className="grid grid-cols-4 gap-6">
                {/* 左侧：按状态分布饼图 - 25% */}
                <div className="col-span-1 bg-white rounded-2xl border border-slate-200 p-6">
                  <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                    <PieChart size={20} className="text-indigo-600" />
                    需求状态分布
                  </h4>
                  {(() => {
                    // 按状态统计 - 使用固定数据与大字报一致
                    const statusData = [
                      {
                        name: "已完成需求对接",
                        count: 847,
                        color: "bg-emerald-500",
                        colorHex: "#10b981",
                      },
                      {
                        name: "处理中需求",
                        count: 560,
                        color: "bg-blue-500",
                        colorHex: "#3b82f6",
                      },
                      {
                        name: "待处理需求",
                        count: 1044,
                        color: "bg-amber-500",
                        colorHex: "#f59e0b",
                      },
                    ];
                    const total = 2451; // 固定总需求数

                    return (
                      <div className="flex flex-col items-center">
                        {/* 饼图 */}
                        <div className="relative w-40 h-40 mb-4">
                          <svg
                            viewBox="0 0 200 200"
                            className="transform -rotate-90"
                          >
                            {(() => {
                              let cumulativePercent = 0;
                              return statusData.map((status, idx) => {
                                const percent = status.count / total;
                                const circumference = 2 * Math.PI * 70;
                                const offset =
                                  cumulativePercent * circumference;
                                const dashArray = `${
                                  percent * circumference
                                } ${circumference}`;
                                cumulativePercent += percent;

                                return (
                                  <circle
                                    key={idx}
                                    cx="100"
                                    cy="100"
                                    r="70"
                                    fill="none"
                                    stroke={status.colorHex}
                                    strokeWidth="40"
                                    strokeDasharray={dashArray}
                                    strokeDashoffset={-offset}
                                  />
                                );
                              });
                            })()}
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <div className="text-2xl font-black text-slate-900">
                              {total}
                            </div>
                            <div className="text-[10px] text-slate-500 font-bold">
                              总需求
                            </div>
                          </div>
                        </div>

                        {/* 图例（垂直布局） */}
                        <div className="w-full space-y-2">
                          {statusData.map((status, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col items-center p-2.5 bg-slate-50 rounded-xl"
                            >
                              <div className="flex items-center gap-1.5 mb-1">
                                <div
                                  className={`w-2 h-2 rounded-full ${status.color}`}
                                ></div>
                                <span className="text-[10px] font-bold text-slate-700">
                                  {status.name}
                                </span>
                              </div>
                              <div className="text-lg font-black text-slate-900 mb-0.5">
                                {status.count}
                              </div>
                              <div className="text-[9px] text-slate-500 font-bold">
                                {((status.count / total) * 100).toFixed(1)}%
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 右侧：按服务类型分布（大饼图） - 75% */}
                <div className="col-span-3 bg-white rounded-2xl border border-slate-200 p-6">
                  <h4 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                    <PieChart size={20} className="text-emerald-600" />
                    服务类型分布
                  </h4>
                  {(() => {
                    // 定义10种固定类别
                    const fixedCategories = [
                      "财税/审计",
                      "法律/法务",
                      "知识产权",
                      "政策申报",
                      "订单对接",
                      "投融资服务",
                      "品牌PR",
                      "云与算力",
                      "数据服务",
                      "人才/猎头",
                    ];

                    // 10种类别对应的颜色
                    const categoryColors = [
                      { bg: "bg-blue-500", hex: "#3b82f6" },
                      { bg: "bg-emerald-500", hex: "#10b981" },
                      { bg: "bg-amber-500", hex: "#f59e0b" },
                      { bg: "bg-purple-500", hex: "#a855f7" },
                      { bg: "bg-pink-500", hex: "#ec4899" },
                      { bg: "bg-indigo-500", hex: "#6366f1" },
                      { bg: "bg-red-500", hex: "#ef4444" },
                      { bg: "bg-teal-500", hex: "#14b8a6" },
                      { bg: "bg-orange-500", hex: "#f97316" },
                      { bg: "bg-cyan-500", hex: "#06b6d4" },
                    ];

                    // 统计每个类别的数量（使用固定的模拟数据，总数为2451）
                    const categoryData = fixedCategories.map((name, idx) => {
                      // 模拟不同的分布比例
                      const counts = [
                        312, 287, 265, 243, 228, 215, 201, 189, 276, 235,
                      ];
                      return {
                        name,
                        count: counts[idx],
                        color: categoryColors[idx].bg,
                        colorHex: categoryColors[idx].hex,
                      };
                    });

                    const totalServices = 2451;

                    return (
                      <div className="flex flex-col items-center">
                        {/* 大饼图 */}
                        <div className="relative w-64 h-64 mb-6">
                          <svg
                            viewBox="0 0 200 200"
                            className="transform -rotate-90"
                          >
                            {(() => {
                              let cumulativePercent = 0;
                              return categoryData.map((cat, idx) => {
                                const percent = cat.count / totalServices;
                                const circumference = 2 * Math.PI * 70;
                                const offset =
                                  cumulativePercent * circumference;
                                const dashArray = `${
                                  percent * circumference
                                } ${circumference}`;
                                cumulativePercent += percent;

                                return (
                                  <circle
                                    key={idx}
                                    cx="100"
                                    cy="100"
                                    r="70"
                                    fill="none"
                                    stroke={cat.colorHex}
                                    strokeWidth="40"
                                    strokeDasharray={dashArray}
                                    strokeDashoffset={-offset}
                                  />
                                );
                              });
                            })()}
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <div className="text-4xl font-black text-slate-900">
                              {totalServices}
                            </div>
                            <div className="text-sm text-slate-500 font-bold">
                              总需求
                            </div>
                          </div>
                        </div>

                        {/* 类别图例 - 在下方显示 */}
                        <div className="w-full grid grid-cols-5 gap-3">
                          {categoryData.map((cat, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col items-center p-3 bg-slate-50 rounded-xl"
                            >
                              <div className="flex items-center gap-1.5 mb-2">
                                <div
                                  className={`w-2.5 h-2.5 rounded-full shrink-0 ${cat.color}`}
                                ></div>
                                <span className="text-xs font-bold text-slate-700 truncate">
                                  {cat.name}
                                </span>
                              </div>
                              <div className="text-xl font-black text-slate-900 mb-1">
                                {cat.count}
                              </div>
                              <div className="text-[10px] text-slate-500 font-bold">
                                {((cat.count / totalServices) * 100).toFixed(1)}
                                %
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* --- 生态资源方管理页面 --- */}
          {activeTab === "ecosystem_partners" && isAdmin && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* 页面头部 */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    生态资源方管理
                  </h3>
                  <p className="text-slate-500 mt-2">
                    管理三个货架的生态服务提供方及其服务记录
                  </p>
                </div>
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100 flex items-center gap-2">
                  <Plus size={18} />
                  新增资源方
                </button>
              </div>

              {/* 统计卡片 */}
              <div className="grid grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500">合作资源方</div>
                      <div className="text-2xl font-black text-slate-900 mt-1">
                        {ECOSYSTEM_PARTNERS.length}
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                      <Network size={24} className="text-slate-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500">活跃资源方</div>
                      <div className="text-2xl font-black text-emerald-600 mt-1">
                        {
                          ECOSYSTEM_PARTNERS.filter(
                            (p) => p.status === "active"
                          ).length
                        }
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <CheckCircle2 size={24} className="text-emerald-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500">不活跃资源方</div>
                      <div className="text-2xl font-black text-amber-600 mt-1">
                        {
                          ECOSYSTEM_PARTNERS.filter(
                            (p) => p.status === "inactive"
                          ).length
                        }
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <AlertTriangle size={24} className="text-amber-600" />
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-slate-500">累计分润</div>
                      <div className="text-2xl font-black text-indigo-600 mt-1">
                        {(
                          ECOSYSTEM_PARTNERS.reduce(
                            (sum, p) => sum + p.totalProfit,
                            0
                          ) / 10000
                        ).toFixed(0)}
                        万
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Wallet size={24} className="text-indigo-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 按货架分类展示资源方 */}
              <div className="space-y-6">
                {["合规与生存", "增长与交易", "要素与基建"].map((category) => {
                  const categoryPartners = ECOSYSTEM_PARTNERS.filter(
                    (p) => p.category === category
                  );
                  if (categoryPartners.length === 0) return null;

                  return (
                    <div
                      key={category}
                      className="bg-white rounded-2xl border border-slate-200 p-6"
                    >
                      <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                        {category === "合规与生存" && (
                          <Shield size={20} className="text-emerald-600" />
                        )}
                        {category === "增长与交易" && (
                          <TrendingUp size={20} className="text-blue-600" />
                        )}
                        {category === "要素与基建" && (
                          <Package size={20} className="text-purple-600" />
                        )}
                        {category} · {categoryPartners.length} 家资源方
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryPartners.map((partner) => {
                          const partnerRecords =
                            ECOSYSTEM_SERVICE_RECORDS.filter(
                              (r) => r.partnerId === partner.id
                            );
                          const isInactive = partner.status === "inactive";

                          return (
                            <div
                              key={partner.id}
                              className={`border-2 rounded-xl p-5 hover:shadow-lg transition-all ${
                                isInactive
                                  ? "border-amber-200 bg-amber-50"
                                  : "border-slate-200 bg-white hover:border-indigo-300"
                              }`}
                            >
                              {/* 资源方头部 */}
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h5 className="font-black text-slate-900">
                                      {partner.name}
                                    </h5>
                                    {isInactive && (
                                      <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded">
                                        不活跃
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {partner.serviceType}
                                  </div>
                                </div>
                              </div>

                              {/* 统计数据 */}
                              <div className="grid grid-cols-2 gap-3 mb-4">
                                <div className="bg-slate-50 rounded-lg p-3">
                                  <div className="text-xs text-slate-500">
                                    服务次数
                                  </div>
                                  <div className="text-lg font-black text-slate-900">
                                    {partner.serviceCount}
                                  </div>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-3">
                                  <div className="text-xs text-slate-500">
                                    累计分润
                                  </div>
                                  <div className="text-lg font-black text-emerald-600">
                                    ¥{(partner.totalProfit / 10000).toFixed(1)}
                                    万
                                  </div>
                                </div>
                              </div>

                              {/* 联系信息 */}
                              <div className="mb-4 text-xs text-slate-600 space-y-1">
                                <div className="flex items-center gap-2">
                                  <User size={12} />
                                  {partner.contactPerson}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone size={12} />
                                  {partner.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar size={12} />
                                  最后活跃: {partner.lastActiveDate}
                                </div>
                              </div>

                              {/* 操作按钮 */}
                              <div className="flex gap-2">
                                <button className="flex-1 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-100 transition-colors">
                                  查看记录
                                </button>
                                {isInactive && (
                                  <button className="px-3 py-2 bg-amber-500 text-white rounded-lg text-sm font-bold hover:bg-amber-600 transition-colors flex items-center gap-1">
                                    <X size={14} />
                                    解除合作
                                  </button>
                                )}
                              </div>

                              {/* 服务记录预览（折叠） */}
                              {partnerRecords.length > 0 && (
                                <details className="mt-4">
                                  <summary className="text-xs font-bold text-slate-600 cursor-pointer hover:text-indigo-600">
                                    查看 {partnerRecords.length} 条服务记录 ▼
                                  </summary>
                                  <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                                    {partnerRecords.map((record) => (
                                      <div
                                        key={record.id}
                                        className="bg-slate-50 rounded-lg p-3 text-xs"
                                      >
                                        <div className="font-bold text-slate-900 mb-1">
                                          {record.projectName}
                                        </div>
                                        <div className="text-slate-600 mb-2">
                                          {record.serviceDetail}
                                        </div>
                                        <div className="flex items-center justify-between">
                                          <span className="text-slate-500">
                                            {record.serviceDate}
                                          </span>
                                          <span className="font-bold text-emerald-600">
                                            分润: ¥
                                            {(
                                              record.profitShare / 10000
                                            ).toFixed(2)}
                                            万
                                          </span>
                                        </div>
                                        <div className="mt-1">
                                          <span
                                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                              record.status === "已完成"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-blue-100 text-blue-700"
                                            }`}
                                          >
                                            {record.status}
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </details>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* --- 收入看板页面 --- */}
          {activeTab === "financial_dashboard" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* 页面头部 */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    收入看板
                  </h3>
                  <p className="text-slate-500 mt-2">
                    查看所有流水的大盘统计和分润分析
                  </p>
                </div>
              </div>

              {(() => {
                // 固定累计分润总金额为 15,069,277 元
                const totalProfit = 15069277;
                const totalProfitInWan = (totalProfit / 10000).toFixed(2);

                // 统计科技产品明细（基于项目库和生态看板的实际数据）
                const diagnosticCount = 3596; // 项目库初筛规模
                const conversionRate = 43.6; // 转化率
                const optimizationCount = Math.round(
                  diagnosticCount * (conversionRate / 100)
                ); // 1568份

                // 总单数 = 初步诊断服务 + 商业优化建议书
                const totalBusinessCount = diagnosticCount + optimizationCount; // 5164份

                // 根据业务量分配分润金额
                const projectCount = 3596; // 项目库初筛
                const ecoCount = 2451; // 生态服务需求
                const totalCount = projectCount + ecoCount;

                const businessProfit = Math.round(
                  totalProfit * (projectCount / totalCount)
                ); // 约 8,958,683元
                const ecoProfit = totalProfit - businessProfit; // 约 6,110,594元

                // 统计生态服务明细（按服务类型分组）- 使用模拟数据
                const ecoServiceProfits: Record<string, number> = {
                  "财税/审计": Math.round(ecoProfit * 0.127),
                  "法律/法务": Math.round(ecoProfit * 0.117),
                  知识产权: Math.round(ecoProfit * 0.108),
                  政策申报: Math.round(ecoProfit * 0.099),
                  订单对接: Math.round(ecoProfit * 0.093),
                  投融资服务: Math.round(ecoProfit * 0.088),
                  品牌PR: Math.round(ecoProfit * 0.082),
                  云与算力: Math.round(ecoProfit * 0.077),
                  数据服务: Math.round(ecoProfit * 0.113),
                  "人才/猎头": Math.round(ecoProfit * 0.096),
                };

                // 12个月数据（2024年2月-2025年1月）- 总金额15,069,277元随机分配
                const monthsData = [
                  { month: "2月", amount: 1098765 },
                  { month: "3月", amount: 1234567 },
                  { month: "4月", amount: 1156789 },
                  { month: "5月", amount: 1389012 },
                  { month: "6月", amount: 1278945 },
                  { month: "7月", amount: 1456321 },
                  { month: "8月", amount: 1187654 },
                  { month: "9月", amount: 1345678 },
                  { month: "10月", amount: 1267890 },
                  { month: "11月", amount: 1423456 },
                  { month: "12月", amount: 1198765 },
                  { month: "1月", amount: 1031435 }, // 总计为 15,069,277
                ];

                return (
                  <>
                    {/* 顶部：大金额 + 12个月数据 */}
                    <div className="grid grid-cols-3 gap-6">
                      {/* 左侧：累计分润总金额（超大字报） */}
                      <div className="col-span-1 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 text-white shadow-2xl">
                        <div className="text-xs font-bold uppercase tracking-wider opacity-80 mb-4">
                          累计分润总金额
                        </div>
                        <div className="text-6xl font-black mb-3">
                          {totalProfitInWan}
                        </div>
                        <div className="text-xl font-bold opacity-90">万元</div>
                      </div>

                      {/* 右侧：12个月分润柱状图 */}
                      <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-6">
                        <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                          <Calendar size={20} className="text-indigo-600" />
                          近12个月分润明细
                        </h4>
                        <div className="flex justify-between gap-2">
                          {monthsData.map((data, idx) => {
                            // 计算环比增速
                            const change =
                              idx > 0
                                ? data.amount - monthsData[idx - 1].amount
                                : 0;
                            const growthRate =
                              idx > 0
                                ? (
                                    (change / monthsData[idx - 1].amount) *
                                    100
                                  ).toFixed(1)
                                : "0.0";
                            const isIncrease = change > 0;

                            // 转换为万元
                            const amountInWan = (data.amount / 10000).toFixed(
                              2
                            );

                            // 计算柱子高度像素（基于最大值，固定最大高度160px）
                            const maxAmount = Math.max(
                              ...monthsData.map((m) => m.amount)
                            );
                            const heightPx = Math.round(
                              (data.amount / maxAmount) * 160
                            );

                            return (
                              <div
                                key={idx}
                                className="flex-1 flex flex-col items-center gap-1"
                              >
                                {/* 金额显示（万元） */}
                                <div className="text-[10px] font-black text-slate-900 mb-1 h-5">
                                  {amountInWan}万
                                </div>

                                {/* 柱状图容器 */}
                                <div className="w-full h-40 flex items-end">
                                  <div
                                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg hover:from-indigo-700 hover:to-indigo-500 transition-all cursor-pointer"
                                    style={{ height: `${heightPx}px` }}
                                    title={`${
                                      data.month
                                    }: ¥${data.amount.toLocaleString()}（${amountInWan}万元）`}
                                  ></div>
                                </div>

                                {/* 环比增速 */}
                                <div className="h-4">
                                  {idx > 0 ? (
                                    <div
                                      className={`text-[10px] font-bold ${
                                        isIncrease
                                          ? "text-red-600"
                                          : "text-emerald-600"
                                      }`}
                                    >
                                      {isIncrease ? "↑" : "↓"}{" "}
                                      {Math.abs(parseFloat(growthRate))}%
                                    </div>
                                  ) : null}
                                </div>

                                {/* 月份标签 */}
                                <div className="text-[10px] text-slate-500 font-bold">
                                  {data.month}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* 下方：科技产品分润 + 生态服务分润 */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* 左下：科技产品分润 */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col">
                        <h4 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                          <Package size={20} className="text-blue-600" />
                          科技产品分润
                        </h4>
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-4">
                          <div className="text-sm font-bold opacity-80 mb-2">
                            累计分润金额
                          </div>
                          <div className="text-4xl font-black">
                            {(businessProfit / 10000).toFixed(2)}
                          </div>
                          <div className="text-lg font-bold opacity-90 mt-1">
                            万元
                          </div>
                        </div>
                        <div className="bg-slate-50 rounded-xl p-5 space-y-3 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-700">
                              初步诊断服务（Uni）
                            </span>
                            <span className="text-lg font-black text-slate-900">
                              {diagnosticCount} 份
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-700">
                              商业优化建议书
                            </span>
                            <span className="text-lg font-black text-slate-900">
                              {optimizationCount} 份
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-700">
                              总单数
                            </span>
                            <span className="text-lg font-black text-slate-900">
                              {totalBusinessCount} 份
                            </span>
                          </div>
                          <div className="pt-3 border-t border-slate-200">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-blue-700">
                                转化率
                              </span>
                              <span className="text-2xl font-black text-blue-900">
                                {conversionRate}%
                              </span>
                            </div>
                            <div className="text-xs text-slate-500 mt-1 text-right">
                              ({optimizationCount}/{diagnosticCount}*100%)
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 右下：生态服务分润 */}
                      <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <Network size={20} className="text-emerald-600" />
                            生态服务分润
                          </h4>
                          <button
                            onClick={() =>
                              setIsEcoServiceExpanded(!isEcoServiceExpanded)
                            }
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-50 transition-colors"
                          >
                            {isEcoServiceExpanded ? (
                              <>
                                <ChevronUp size={14} />
                                收起
                              </>
                            ) : (
                              <>
                                <ChevronDown size={14} />
                                展开全部
                              </>
                            )}
                          </button>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white mb-4">
                          <div className="text-sm font-bold opacity-80 mb-2">
                            累计分润金额
                          </div>
                          <div className="text-4xl font-black">
                            {(ecoProfit / 10000).toFixed(2)}
                          </div>
                          <div className="text-lg font-bold opacity-90 mt-1">
                            万元
                          </div>
                        </div>
                        <div
                          className={`bg-slate-50 rounded-xl p-5 space-y-3 flex-1 overflow-hidden transition-all ${
                            isEcoServiceExpanded
                              ? "max-h-none overflow-y-auto"
                              : "max-h-48"
                          }`}
                        >
                          {Object.entries(ecoServiceProfits)
                            .sort((a, b) => b[1] - a[1])
                            .map(([serviceType, profit]) => (
                              <div
                                key={serviceType}
                                className="flex items-center justify-between py-2 border-b border-slate-200 last:border-0"
                              >
                                <span className="text-sm font-bold text-slate-700">
                                  {serviceType}
                                </span>
                                <span className="text-lg font-black text-slate-900">
                                  {(profit / 10000).toFixed(2)} 万元
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}

          {/* --- 收入流水页面（合并业务流水与生态流水） --- */}
          {activeTab === "financial_transactions" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* 页面头部 */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">
                    收入流水
                  </h3>
                  <p className="text-slate-500 mt-2">
                    查看所有业务订单与生态服务交易的流水记录
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-bold hover:border-indigo-300 hover:text-indigo-600 transition-colors flex items-center gap-2">
                    <Download size={16} /> 导出报表
                  </button>
                </div>
              </div>

              {/* 流水表格 */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-800">收入流水明细</h3>
                  <div className="flex gap-2">
                    {["全部", "科技产品", "生态服务"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFinancialTransactionType(type)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          financialTransactionType === type
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-slate-500 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4 w-32">流水编号</th>
                      <th className="px-6 py-4 w-28">流水类型</th>
                      <th className="px-6 py-4 w-40">项目名称</th>
                      <th className="px-6 py-4 w-40">类别</th>
                      <th className="px-6 py-4 w-44">明细</th>
                      <th className="px-6 py-4 w-28">时间</th>
                      <th className="px-6 py-4 w-24">交易金额</th>
                      <th className="px-6 py-4 w-24">分润金额</th>
                      <th className="px-6 py-4 w-28">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredFinancialTransactions.map((trans) => (
                      <tr
                        key={trans.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-5 font-mono text-slate-400 text-xs">
                          {trans.id}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-lg text-xs font-bold ${
                              trans.type === "科技产品"
                                ? "bg-blue-50 text-blue-600"
                                : "bg-emerald-50 text-emerald-600"
                            }`}
                          >
                            {trans.type}
                          </span>
                        </td>
                        <td
                          className="px-6 py-5 text-slate-700 font-medium text-xs max-w-[200px] truncate"
                          title={trans.projectName}
                        >
                          {trans.projectName}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-xs font-bold text-slate-600">
                            {trans.category}
                          </span>
                        </td>
                        <td
                          className="px-6 py-5 text-slate-600 text-xs max-w-[180px] truncate whitespace-nowrap"
                          title={trans.detail}
                        >
                          {trans.detail}
                        </td>
                        <td className="px-6 py-5 text-slate-500 text-xs">
                          {trans.time}
                        </td>
                        <td className="px-6 py-5 text-slate-900 font-bold">
                          ¥{trans.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-5 text-emerald-600 font-bold">
                          {trans.profitShare > 0 ? (
                            `¥${trans.profitShare.toLocaleString()}`
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          {trans.type === "科技产品" ? (
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 whitespace-nowrap">
                              已完成
                            </span>
                          ) : (
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap ${
                                trans.status === "已完成" ||
                                trans.status === "处理完成" ||
                                trans.status === "已完成需求对接"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : trans.status === "处理中" ||
                                    trans.status === "处理中需求"
                                  ? "bg-blue-50 text-blue-600"
                                  : trans.status === "待处理需求"
                                  ? "bg-amber-50 text-amber-600"
                                  : "bg-slate-50 text-slate-600"
                              }`}
                            >
                              {trans.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- 4. 订单管理视图 --- */}
          {activeTab === "orders" && (
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800">点数流水记录</h3>
                <div className="text-xs font-bold text-slate-400">
                  仅展示近 90 天订单
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs text-slate-500 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-8 py-5">流水单号</th>
                      <th className="px-8 py-5">点数类型</th>
                      <th className="px-8 py-5">点数数值</th>
                      {isAdmin && <th className="px-8 py-5">关联租户</th>}
                      <th className="px-8 py-5">状态</th>
                      <th className="px-8 py-5">发生时间</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {MOCK_OLD_DATA.orders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-8 py-6 font-mono text-xs">
                          {order.id}
                        </td>
                        <td className="px-8 py-6 font-bold">{order.type}</td>
                        <td className="px-8 py-6 font-black text-indigo-600">
                          {order.amount.toLocaleString()}{" "}
                          <span className="text-[10px] font-bold text-slate-400">
                            点
                          </span>
                        </td>
                        {isAdmin && (
                          <td className="px-8 py-6 text-slate-500">
                            {order.tenant}
                          </td>
                        )}
                        <td className="px-8 py-6">
                          <SmartStatusBadge status={order.status} />
                        </td>
                        <td className="px-8 py-6 text-slate-400 text-xs">
                          {order.time}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- 5. 租户管理视图 --- */}
          {activeTab === "tenants" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
              {MOCK_OLD_DATA.tenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-indigo-50 p-4 rounded-2xl text-indigo-600">
                      <Building2 size={28} />
                    </div>
                    <SmartStatusBadge status={tenant.status} />
                  </div>
                  <h3 className="font-black text-xl mb-1 text-slate-900">
                    {tenant.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-6">
                    {tenant.id}
                  </p>
                  <div className="space-y-4 pt-4 border-t border-slate-50">
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span className="text-slate-400">联系人</span>
                      <span>{tenant.contact}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-600">
                      <span className="text-slate-400">子账号</span>
                      <span>{tenant.userCount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* --- 6. 用户管理视图 --- */}
          {activeTab === "users" && (
            <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h3 className="font-bold text-slate-800">系统用户列表</h3>
                <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
                  <Plus size={14} /> 新增用户
                </button>
              </div>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-8 py-5">用户 ID</th>
                    <th className="px-8 py-5">姓名</th>
                    <th className="px-8 py-5">角色权限</th>
                    {isAdmin && <th className="px-8 py-5">所属租户</th>}
                    <th className="px-8 py-5">状态</th>
                    <th className="px-8 py-5">邮箱</th>
                    <th className="px-8 py-5 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_OLD_DATA.users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-8 py-6 font-mono text-xs text-slate-400">
                        {user.id}
                      </td>
                      <td className="px-8 py-6 font-bold text-slate-900">
                        {user.name}
                      </td>
                      <td className="px-8 py-6">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                            user.role === "租户管理员"
                              ? "bg-purple-50 text-purple-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      {isAdmin && (
                        <td className="px-8 py-6 text-slate-500">
                          {user.tenant}
                        </td>
                      )}
                      <td className="px-8 py-6">
                        <SmartStatusBadge status={user.status} />
                      </td>
                      <td className="px-8 py-6 text-slate-400 font-mono text-xs">
                        {user.email}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-3">
                          <button className="text-slate-400 hover:text-indigo-600 transition-colors">
                            <Edit3 size={16} />
                          </button>
                          <button className="text-slate-400 hover:text-rose-500 transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* --- 7. 配额管理视图 --- */}
          {activeTab === "quota" && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_OLD_DATA.tenants.map((tenant) => (
                  <div
                    key={tenant.id}
                    className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm overflow-hidden relative group hover:shadow-xl transition-all"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Coins className="text-indigo-600" size={100} />
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                          {tenant.name.substring(0, 1)}
                        </div>
                        <div>
                          <h4 className="font-black text-lg text-slate-900">
                            {tenant.name}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {tenant.id}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                            当前消耗 / 总额度
                          </span>
                          <span className="text-2xl font-black text-indigo-600">
                            {tenant.quotaUsed}{" "}
                            <span className="text-xs text-slate-300 font-medium">
                              / {tenant.quotaTotal}
                            </span>
                          </span>
                        </div>
                        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                          <div
                            className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${
                                (tenant.quotaUsed / tenant.quotaTotal) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTenant(tenant);
                          setDrawerOpen(true);
                        }}
                        className="mt-8 w-full py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
                      >
                        <Plus size={16} /> 增加点数配额
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
