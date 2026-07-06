// SPDX-FileCopyrightText: Copyright (c) 2026, NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react"

export const XAxisLabel = ({ label, width, height, y }) => {
  return (
    <foreignObject y={y} width={width} height={height}>
      <span className="x-axis-label">{label}</span>
    </foreignObject>
  )
}
export const YAxisLabel = ({ y, x, width, height, label }) => {
  return (
    <foreignObject
      y={y}
      x={x}
      width={width}
      height={height}
      transform="rotate(-90)"
    >
      <span className="y-axis-label">{label}</span>
    </foreignObject>
  )
}
