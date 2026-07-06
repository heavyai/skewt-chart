// SPDX-FileCopyrightText: Copyright (c) 2026, NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React from "react"

import { range } from "d3-array"

export const BarbTemplates = ({ barbsize }) => {
  return (
    <defs>
      <BarbSpeeds barbsize={barbsize} />
    </defs>
  )
}

function BarbSpeeds({ barbsize }) {
  const output = []

  const speeds = range(5, 105, 5)

  speeds.forEach((d) => {
    const flags = Math.floor(d / 50)
    const pennants = Math.floor((d - flags * 50) / 10)
    const halfpennants = Math.floor((d - flags * 50 - pennants * 10) / 5)
    let px = barbsize

    // Draw wind barb flags and pennants for each stem
    const flagsAndPenantsOutput = []
    for (let i = 0; i < flags; i++) {
      flagsAndPenantsOutput.push(
        <polyline
          key={`barb-flag-${i}`}
          points={`0,${px} -10,${px} 0,${px - 4}`}
          className="flag"
        />
      )

      px -= 7
    }

    const penantsOutput = []
    for (let i = 0; i < pennants; i++) {
      penantsOutput.push(
        <line key={`pennant-${i}`} x1={0} x2={-10} y1={px} y2={px + 4} />
      )
      px -= 3
    }

    const halfPenantsOutput = []
    for (let i = 0; i < halfpennants; i++) {
      halfPenantsOutput.push(
        <line key={`half-pennant-${i}`} x1={0} x2={-5} y1={px} y2={px + 2} />
      )
      px -= 3
    }

    output.push(
      // stem
      <g id={`barb${d}`} key={`barb${d}`}>
        <line x1={0} x2={0} y1={0} y2={barbsize} />
        {flagsAndPenantsOutput}
        {penantsOutput}
        {halfPenantsOutput}
      </g>
    )
  })

  return output
}
