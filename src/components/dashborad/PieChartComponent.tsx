import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { PieArcDatum } from "d3-shape";

interface DataItem {
  status: boolean;
  type: string;
  count: string;
}

interface PieChartProps {
  data: DataItem[];
}

export const PieChartComponent: React.FC<PieChartProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && tooltipRef.current) {
      const svg = d3.select(ref.current);
      const tooltip = d3.select(tooltipRef.current);
      svg.selectAll("*").remove();

      const width = 300;
      const height = 300;
      const radius = Math.min(width, height) / 2 - 10;

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const pie = d3.pie<DataItem>().value((d) => Number(d.count));

      const arc = d3
        .arc<PieArcDatum<DataItem>>()
        .innerRadius(0)
        .outerRadius(radius);

      const arcs = pie(data);

      svg
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`)
        .selectAll("path")
        .data(arcs)
        .enter()
        .append("path")
        .attr("fill", (d) => color(String(d.data.type + "-" + d.data.status)))
        .attr("d", arc)
        .on("mouseover", (event, d) => {
          tooltip
            .style("opacity", 1)
            .html(
              `Item: ${d.data.type}<br>Valor: ${Number(
                d.data.count
              )}<br>Porcentagem: ${(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100).toFixed(2)}%`
            )
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => {
          tooltip.style("opacity", 0);
        });
    }
  }, [data]);

  return (
    <>
      <svg ref={ref}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          textAlign: "center",
          width: "120px",
          height: "auto",
          padding: "2px",
          font: "12px sans-serif",
          background: "lightsteelblue",
          border: "0px",
          borderRadius: "8px",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity 0.2s",
        }}
      ></div>
    </>
  );
};
