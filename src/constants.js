// SPDX-FileCopyrightText: Copyright (c) 2026, NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: Apache-2.0

export const deg2rad = Math.PI / 180
export const tan = Math.tan(55 * deg2rad)

const convertDispatch = {
  kt: (v) => v * 1.943844492,
  kmh: (v) => v * 3.6
}

export const convert = (msvalue, unit) => {
  const converter = convertDispatch[unit] ?? ((v) => v)

  return converter(msvalue)
}
