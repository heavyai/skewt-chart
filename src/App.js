// SPDX-FileCopyrightText: Copyright (c) 2026, NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from "react"
import "./App.css"

import defData from "./skewt.json"

import { SkewT } from "./SkewT"

function App() {
  const [skewTData, setSkewTData] = useState(defData)
  const [localSkewTData, setLocalSkewTData] = useState(
    JSON.stringify(defData, undefined, 2)
  )
  const [error, setError] = useState(false)

  return (
    <div className="SkewTChart">
      <div>
        <div>Skew T Chart.</div>
        <textarea
          style={{ backgroundColor: error ? "#FCC" : undefined }}
          rows="20"
          cols="50"
          value={localSkewTData}
          onChange={(evt) => {
            setLocalSkewTData(evt.target.value)
            try {
              JSON.parse(evt.target.value)
              setError(false)
            } catch (err) {
              setError(true)
            }
          }}
        />
        <div>
          <button
            onClick={() => {
              if (!error) {
                setSkewTData(JSON.parse(localSkewTData))
              }
            }}
          >
            Update Skew-T data
          </button>
        </div>
      </div>
      <div
        style={{
          border: "1px solid black",
          padding: 0,
          XXbackgroundColor: "#AAF",
          boxSizing: "border-box"
        }}
      >
        <SkewT data={skewTData} />
      </div>
    </div>
  )
}

export default App
