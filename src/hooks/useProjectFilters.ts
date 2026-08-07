import { useMemo } from "react";

import { MOCK_EXTENDED_PROJECTS } from "../data/projects";
import { parseCurrency } from "../lib/currency";

// 动态排序与算分逻辑 + 筛选逻辑
export const useProjectFilters = (searchText, filterConditions) => {
  return useMemo(() => {
    let projects = [...MOCK_EXTENDED_PROJECTS].map((project) => {
      // Use existing pre-calculated score or recalculate if needed based on weights
      // Here we trust the mock score for simplicity in display
      return project;
    });

    // 1. 排序
    projects.sort((a, b) => b.score - a.score);

    // 2. 搜索过滤
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
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
  }, [filterConditions, searchText]);
};
