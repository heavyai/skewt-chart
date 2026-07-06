// SPDX-FileCopyrightText: Copyright (c) 2026, NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react"

import { tan, convert } from "./constants"

export const TempLine = ({ data, x, y, basep, chartId }) => {
  const segments = []
  for (const d of data) {
    segments.push([x(d.temp) + (y(basep) - y(d.press)) / tan, y(d.press)])
  }

  let path = ""
  const firstSegment = segments.shift()

  path += `M${firstSegment[0]},${firstSegment[1]}`

  for (const segment of segments) {
    path += ` L${segment[0]},${segment[1]}`
  }

  return (
    <path
      className={"temp skline"}
      clipPath={`url(#clipper-${chartId})`}
      d={path}
    />
  )
}

export const DewLine = ({ data, x, y, basep, chartId }) => {
  const segments = []
  for (const d of data) {
    segments.push([x(d.dwpt) + (y(basep) - y(d.press)) / tan, y(d.press)])
  }

  let path = ""
  const firstSegment = segments.shift()

  path += `M${firstSegment[0]},${firstSegment[1]}`

  for (const segment of segments) {
    path += ` L${segment[0]},${segment[1]}`
  }

  return (
    <path
      className={"dwpt skline"}
      clipPath={`url(#clipper-${chartId})`}
      d={path}
    />
  )
}

export const Barbs = ({ data, y, width, unit, topp, basep }) => {
  const barbs = []

  for (let i = 0; i < data.length; i++) {
    const d = data[i]

    if (d.press >= topp && d.press <= basep) {
      barbs.push(
        <use
          key={`barb-${i}`}
          xlinkHref={`#barb${Math.round(convert(d.wspd, unit) / 5) * 5}`}
          transform={`translate(${width}, ${y(d.press)}) rotate(${
            d.wdir + 180
          })`}
        />
      )
    }
  }
  return <g className="windbarb">{barbs}</g>
}

export const Plot = ({ data, x, y, width, basep, unit, topp, chartId }) => {
  const filteredData = data.filter((d) => d.temp > -1000 && d.dwpt > -1000)

  return (
    <g className="skewt">
      <TempLine
        data={filteredData}
        x={x}
        y={y}
        basep={basep}
        chartId={chartId}
      />
      <DewLine
        data={filteredData}
        x={x}
        y={y}
        basep={basep}
        chartId={chartId}
      />
      <Barbs
        data={filteredData}
        y={y}
        width={width}
        unit={unit}
        topp={topp}
        basep={basep}
      />
    </g>
  )
}
