---
title: Radio
lang: en-US
---

# Radio

## Basic Usage

::: demo
radio/basic
:::

## Radio Options

Use attribute `options` to set child elements
::: demo
radio/options
:::

## Radio Direction

Use attribute `direction` to display the direction of radio group.
::: demo
radio/direction
:::

## Radio With Border

Use attribute `border` to add the border to the Radio.
::: demo
radio/bordered
:::

## Radio Button

Use attribute `type` to display the Radio with button styles.
::: demo
radio/button
:::

## Custom Radio Display

Use attribute `direction` to display the direction of radio group.
::: demo
radio/custom
:::

## Radio API

### Radio Props

| Name     | Description                                       | Type                           | Default   |
| -------- | ------------------------------------------------- | ------------------------------ | --------- |
| value    | whether the value of Radio                        | `string \| number \| boolean`  |           |
| disabled | whether Radio is disabled                         | `boolean`                      | `false`   |
| border   | whether Radio is bordered, work only type `radio` | `boolean`                      | `false`   |
| type     | whether the type of Radio                         | `'radio' \| 'button'`          | `'radio'` |
| size     | whether the size of Radio                         | `'mini' \| 'small' \| 'large'` |           |

### Radio Slots

| Name | Description               |
| ---- | ------------------------- |
| -    | customize default content |

### Radio Events

| Name   | Description                    | Parameters                           |
| ------ | ------------------------------ | ------------------------------------ |
| change | trigger when the value changes | value: `string \| number \| boolean` |

## Radio-Group API

### Radio-Group Props

| Name                | Description                                       | Type                           | Default        |
| ------------------- | ------------------------------------------------- | ------------------------------ | -------------- |
| modelValue(v-model) | Binding value                                     | `string \| number \| boolean`  |                |
| disabled            | whether Radio is disabled                         | `boolean`                      | `false`        |
| border              | whether Radio is bordered, work only type `radio` | `boolean`                      | `false`        |
| type                | whether the type of Radio                         | `'radio' \| 'button'`          | `'radio'`      |
| size                | whether the size of Radio                         | `'mini' \| 'small' \| 'large'` |                |
| direction           | whether the direction of Radio                    | `'horizontal' \| 'vertical'`   | `'horizontal'` |
| options             | whether the options of RadioGroup                 | [`RadioOption[]`](#typescript) |                |

### Radio-Group Slots

| Name  | Description                        | Slots Props                          |
| ----- | ---------------------------------- | ------------------------------------ |
| label | customize default content of Radio | option: [`RadioOption`](#typescript) |

### Radio-Group Events

| Name   | Description                    | Parameters                           |
| ------ | ------------------------------ | ------------------------------------ |
| change | trigger when the value changes | value: `string \| number \| boolean` |

## Typescript

```ts
export interface RadioOption {
  value: string | number
  label?: string | number | RenderFunction
  disabled?: boolean
}
```
