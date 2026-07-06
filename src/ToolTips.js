// SPDX-FileCopyrightText: Copyright (c) 2026, NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from "react"

import { tan } from "./constants"

const ToolTip = ({ width, x, y, d, topp, basep, nextD, lastD }) => {
  const [opacity, setOpacity] = useState(0)

  if (d.press < topp || d.press > basep) {
    return null
  }

  const yCoord = y(d.press)

  const upperHitBox = Math.max(d.press + (nextD.press - d.press) / 2, topp)
  const hitBoxHeight = y(lastD.press) - yCoord

  return (
    <g style={{ opacity, cursor: "pointer" }}>
      <rect
        key={`hitbox-${d.hght}`}
        x={0}
        y={y(upperHitBox)}
        width={width}
        height={hitBoxHeight}
        fill="red"
        style={{ opacity: 0 }}
        onMouseOver={() => setOpacity(1)}
        onMouseOut={() => setOpacity(0)}
      />
      <line key={`tick-${d.hght}`} x1={6} x2={0} y1={yCoord} y2={yCoord} />
      <text
        key={`label-${d.hght}`}
        y={yCoord}
        x={8}
        style={{ textAnchor: "start", dominantBaseline: "middle" }}
        className="hghttxt"
      >
        {d.hght}m
      </text>
      <circle
        key={`dew-${d.hght}`}
        r={4}
        cx={x(d.dwpt) + (y(basep) - y(d.press)) / tan}
        cy={yCoord}
        className="dewdot"
      />
      <text
        key={`dewtxt-${d.hght}`}
        y={yCoord}
        x={x(d.dwpt) + (y(basep) - y(d.press)) / tan - 8}
        style={{ textAnchor: "end", dominantBaseline: "middle" }}
        className="dewtxt"
      >
        {d.dwpt}&#xb0;C
      </text>
      <circle
        key={`temp-${d.hght}`}
        r={4}
        cx={x(d.temp) + (y(basep) - y(d.press)) / tan}
        cy={yCoord}
        className="tempdot"
      />
      <text
        key={`temptxt-${d.hght}`}
        x={x(d.temp) + (y(basep) - y(d.press)) / tan + 8}
        y={yCoord}
        style={{ textAnchor: "start", dominantBaseline: "middle" }}
        className="temptxt"
      >
        {d.temp}&#xb0;C
      </text>
    </g>
  )
}

export const ToolTips = ({ width, y, x, data, basep, topp }) => {
  const output = []

  for (let i = 0; i < data.length; i++) {
    const d = data[i]

    const lastD = i > 0 ? data[i - 1] : { press: basep }
    const nextD = i + 1 < data.length ? data[i + 1] : { press: topp }

    output.push(
      <ToolTip
        key={d.hght}
        width={width}
        x={x}
        y={y}
        d={d}
        basep={basep}
        topp={topp}
        lastD={lastD}
        nextD={nextD}
      />
    )
  }

  return <g className="tooltips">{output}</g>
}
