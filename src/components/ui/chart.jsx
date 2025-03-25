import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "@/lib/utils";

const THEMES = { light: "", dark: ".dark" };

const ChartContext = React.createContext(null);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}

const ChartContainer = React.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn("flex aspect-video justify-center text-xs", className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([_, cfg]) => cfg.theme || cfg.color);

  if (!colorConfig.length) return null;

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme] || itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`)
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = React.forwardRef(({ active, payload, className, indicator = "dot", hideLabel = false, label, labelFormatter, formatter, color, nameKey, labelKey }, ref) => {
  const { config } = useChart();

  if (!active || !payload?.length) return null;

  return (
    <div ref={ref} className={cn("grid min-w-[8rem] px-2.5 py-1.5 text-xs shadow-xl", className)}>
      {payload.map((item, index) => {
        const key = `${nameKey || item.name || item.dataKey || "value"}`;
        const indicatorColor = color || item.payload.fill || item.color;

        return (
          <div key={item.dataKey} className="flex w-full gap-2">
            {!hideLabel && <span className="font-medium">{label}</span>}
            <span style={{ backgroundColor: indicatorColor }} className="h-2.5 w-2.5 rounded"></span>
            <span>{item.name}</span>
            <span className="font-mono font-medium">{item.value?.toLocaleString()}</span>
          </div>
        );
      })}
    </div>
  );
});
ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = React.forwardRef(({ className, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div ref={ref} className={cn("flex items-center justify-center gap-4", className)}>
      {payload.map((item) => (
        <div key={item.value} className="flex items-center gap-1.5">
          <div style={{ backgroundColor: item.color }} className="h-2 w-2 rounded"></div>
          <span>{config[item.dataKey]?.label || item.value}</span>
        </div>
      ))}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegend";

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, useChart };
