import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import type { CategoryScore } from "@/types";
import { categories } from "@/config/questions";

interface RadarChartViewProps {
  categoryScores: CategoryScore[];
}

export function RadarChartView({ categoryScores }: RadarChartViewProps) {
  const data = categoryScores.map((c) => {
    const shortName = categories.find((cat) => cat.id === c.categoryId)?.shortName ?? c.categoryName;
    return {
      category: shortName,
      score: c.score,
      fullMark: 100,
    };
  });

  return (
    <div className="w-full h-[320px] md:h-[380px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="rgba(20,24,27,0.10)" />
          <PolarAngleAxis
            dataKey="category"
            tick={{ fill: "#4A5257", fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: "#8B9299", fontSize: 10 }}
            tickCount={5}
            axisLine={false}
          />
          <Radar
            name="Madurez"
            dataKey="score"
            stroke="var(--color-accent)"
            fill="var(--color-accent)"
            fillOpacity={0.22}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
