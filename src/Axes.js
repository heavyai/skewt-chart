// SPDX-FileCopyrightText: Copyright (c) 2026, NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react"

const XTicks = ({ x }) => {
  const output = []

  const xTicks = [-40, -30, -20, -10, 0, 10, 20, 30, 40, 50]
  for (const d of xTicks) {
    const coord = x(d) - 0.5

    output.push(
      <g key={coord} className="tick" transform={`translate(${coord},0)`}>
        <line y2="0" x2="0" />
        <text dy={".71em"} y="3" x="0" style={{ textAnchor: "middle" }}>
          {Math.round(d)}
        </text>
      </g>
    )
  }
  return output
}

export const XAxis = ({ x, width, height }) => {
  return (
    <g className="x axis" transform={`translate(0, ${height - 0})`}>
      <line x1={0} x2={width} y1={0} y2={0} />
      <XTicks x={x} />
    </g>
  )
}

const YTicks = ({ y, plines = [], pticks = [] }) => {
  const output = []

  // logarithmic pressure lines.

  for (const pline of pticks) {
    output.push(
      <line key={`pres-${pline}`} x1={3} x2={0} y1={y(pline)} y2={y(pline)} />
    )
  }
  for (const pline of plines) {
    output.push(
      <text
        key={pline}
        y={y(pline)}
        x={0 - 4}
        style={{ textAnchor: "end", dominantBaseline: "middle" }}
      >
        {pline}
      </text>
    )
  }
  return output
}

export const YAxis = ({ y, height, plines, pticks }) => {
  return (
    <g className="y axis">
      <line x1={0} x2={0} y1={0} y2={height} />
      <YTicks y={y} plines={plines} pticks={pticks} />
    </g>
  )
}
