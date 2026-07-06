// SPDX-FileCopyrightText: Copyright (c) 2026, NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react"

import "./skewt.css"

import { scaleLinear, scaleLog } from "d3-scale"

import { Background } from "./Background"
import { BarbTemplates } from "./BarbTemplates"
import { Plot } from "./Plot"
import { XAxis, YAxis } from "./Axes"
import { XAxisLabel, YAxisLabel } from "./AxisLabels"
import { ToolTips } from "./ToolTips"

const CHART_WIDTH = 500
const CHART_HEIGHT = 500

export const SkewT = ({
  margin = { top: 30, right: 40, bottom: 70, left: 75 },
  unit = "kt",
  data,
  basep = 1050,
  topp = 100,
  plines = [1000, 850, 700, 500, 300, 200, 100],
  pticks = [950, 900, 800, 750, 650, 600, 550, 450, 400, 350, 250, 150],
  barbsize = 25,
  xAxisLabel = "Temperature",
  yAxisLabel = "Pressure",
  chartId = ""
}) => {
  const w = CHART_WIDTH - margin.right - margin.left
  const h = CHART_HEIGHT - margin.top - margin.bottom

  // const basep = Math.max(...data.map((d) => d.press), 1050)
  // const topp = Math.min(...data.map((d) => d.press), 100)

  const x = scaleLinear([-45, 50], [0, w])
  const y = scaleLog([topp, basep], [0, h])

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
      className="skewt-chart"
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <Background
          width={w}
          height={h}
          x={x}
          y={y}
          basep={basep}
          topp={topp}
          plines={plines}
          chartId={chartId}
        />

        <BarbTemplates barbsize={barbsize} />

        <Plot
          data={data}
          x={x}
          y={y}
          width={w}
          height={h}
          basep={basep}
          topp={topp}
          unit={unit}
          chartId={chartId}
        />
        <XAxis width={w} height={h} x={x} />
        <YAxis height={h} y={y} plines={plines} pticks={pticks} />
        <ToolTips
          width={w}
          height={h}
          x={x}
          y={y}
          data={data}
          basep={basep}
          topp={topp}
        />
        <YAxisLabel
          label={yAxisLabel}
          height={margin.left}
          y={-margin.left}
          x={-h}
          width={h}
        />
        <XAxisLabel
          height={margin.bottom - margin.top}
          width={w}
          label={xAxisLabel}
          y={CHART_HEIGHT - margin.bottom}
        />
      </g>
    </svg>
  )
}
