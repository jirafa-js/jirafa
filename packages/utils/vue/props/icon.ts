import type { Component } from 'vue'
import { definePropType } from './runtime'

export const iconPropType = definePropType<string | Component>([
  String,
  Object,
  Function,
])
