// SPDX-FileCopyrightText: Copyright (c) 2026, NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react"

import { range } from "d3-array"

import { tan } from "./constants"

const Lines = ({ x, y, width, height, basep, topp, plines, chartId }) => {
  const output = []

  // skewed temperature lines.
  for (let d = -100; d <= 45; d += 10) {
    output.push(
      <line
        key={`temp-${d}`}
        x1={x(d) - 0.5 + (y(basep) - y(100)) / tan}
        x2={x(d) - 0.5}
        y1={0}
        y2={height}
        clipPath={`url(#clipper-${chartId})`}
        className={d === 0 ? "tempzero" : "gridline"}
      />
    )
  }

  // logarithmic pressure lines.
  for (const pline of plines) {
    output.push(
      <line
        key={`pres-${pline}`}
        x1={0}
        x2={width}
        y1={y(pline)}
        y2={y(pline)}
        clipPath={`url(#clipper-${chartId})`}
        className={"gridline"}
      />
    )
  }

  // create array to plot dry adiabats
  const pp = range(topp, basep + 1, 10)
  const dryad = range(-30, 240, 20)
  const all = []
  for (let i = 0; i < dryad.length; i++) {
    const z = []
    for (let j = 0; j < pp.length; j++) {
      z.push(dryad[i])
    }
    all.push(z)
  }

  for (let idx = 0; idx < all.length; idx++) {
    const adiabat = all[idx]

    const segments = []
    for (let i = 0; i < adiabat.length; i++) {
      segments.push([
        x((273.15 + adiabat[i]) / Math.pow(1000 / pp[i], 0.286) - 273.15) +
          (y(basep) - y(pp[i])) / tan,

        y(pp[i])
      ])
    }

    let path = ""
    const firstSegment = segments.shift()

    path += `M${firstSegment[0]},${firstSegment[1]}`

    for (const segment of segments) {
      path += ` L${segment[0]},${segment[1]}`
    }

    output.push(
      <path
        key={`adiabat-${idx}`}
        className="gridline"
        clipPath={`url(#clipper-${chartId})`}
        d={path}
      />
    )
  }

  return output
}

export const Background = ({
  width,
  height,
  x,
  y,
  basep,
  topp,
  plines,
  chartId
}) => {
  return (
    <g className="skewtbg" id={`skewtbg-${chartId}`}>
      <clipPath id={`clipper-${chartId}`}>
        <rect x={0} y={0} width={width} height={height} />
      </clipPath>

      <line x1={0} x2={width} y1={0} y2={0} className="gridline" />
      <line x1={width} x2={width} y1={0} y2={height} className="gridline" />

      <Lines
        x={x}
        y={y}
        width={width}
        height={height}
        basep={basep}
        topp={topp}
        plines={plines}
        chartId={chartId}
      />
    </g>
  )
}
