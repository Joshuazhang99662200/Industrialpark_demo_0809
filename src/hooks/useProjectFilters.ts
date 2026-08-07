import { useMemo } from "react";

import { MOCK_EXTENDED_PROJECTS } from "../data/projects";
import { FilterCondition, Project } from "../types";
import { parseCurrency } from "../lib/currency";

/**
 * 排序结果和搜索/筛选无关，模块加载时算一次即可。
 * 放在 useMemo 里会导致每敲一个字都复制 + 排序 3596 条数据。
 */
const SORTED_PROJECTS: Project[] = [...MOCK_EXTENDED_PROJECTS].sort(
  (a, b) => b.score - a.score
);

// 动态排序与算分逻辑 + 筛选逻辑
export const useProjectFilters = (
  searchText: string,
  filterConditions: FilterCondition[]
): Project[] => {
  return useMemo(() => {
    // 1. 排序（已在模块加载时完成，这里直接用；filter 返回新数组，不会改到它）
    let projects = SORTED_PROJECTS;

    // 2. 搜索过滤
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      projects = projects.filter((project) => {
        return (
          project.name.toLowerCase().includes(searchLower) ||
          project.companyName?.toLowerCase().includes(searchLower) ||
          project.uploaderName?.toLowerCase().includes(searchLower) ||
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
          const cond = filterConditions[i];
          let conditionMet = false;

          const valStr = String(project[cond.field] || "");
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
  }, [filterConditions, searchText]);
};
