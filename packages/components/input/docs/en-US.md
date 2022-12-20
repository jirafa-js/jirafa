---
title: Input
lang: en-US
---

# Input

## Basic Usage

::: demo
input/basic
:::

## Clearable

::: demo
input/clearable
:::

## Disabled

::: demo
input/disabled
:::

## Input with Icon

::: demo
input/icon
:::

## Password Box

::: demo
input/password
:::

## Mixed Input

::: demo
input/mixed-input
:::

## Limit Length

::: demo
input/limit-length
:::

## Sizes

::: demo
input/size
:::

## Input API

### Input Props

| Name                                                                                                  | Description                                                                                                 | Type                           | Default  |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------ | -------- |
| model-value **(v-model)**                                                                             | The input value bind                                                                                        | `string`                       |          |
| type                                                                                                  | The type of input                                                                                           | `'text' \| 'password'`         | `'text'` |
| size                                                                                                  | The size of input                                                                                           | `'mini' \| 'small' \| 'large'` |          |
| clearable                                                                                             | Whether to show clear button                                                                                | `boolean`                      | `false`  |
| disabled                                                                                              | Whether Input is disabled                                                                                   | `boolean`                      | `false`  |
| prefix-icon                                                                                           | prefix icon component                                                                                       | `string \| Component`          |          |
| suffix-icon                                                                                           | suffix icon component                                                                                       | `string \| Component`          |          |
| show-limit-tip                                                                                        | Whether to show word count, it only effect `maxlength` is privide, Input is editable and `type` is `'text'` | `boolean`                      | `false`  |
| container-attrs                                                                                       | The attritutes of container                                                                                 | `object`                       | `{}`     |
| input-style                                                                                           | Whether to show word count, it only effect `maxlength` is privide, Input is editable and `type` is `'text'` | `object`                       | `{}`     |
| [native-input-attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes) | Support input native attributs, e.g, `maxlength`, `label`, `form` etc.                                      |                                |          |

### Input Methods

| Method | Description                      | Parameters |
| ------ | -------------------------------- | ---------- |
| focus  | focus the input element          | —          |
| blur   | blur the input element           | —          |
| select | select the text in input element | —          |

### Input Events

| Name   | Description                                                                                           | Parameters                |
| ------ | ----------------------------------------------------------------------------------------------------- | ------------------------- |
| blur   | triggers when Input blurs                                                                             | (event: FocusEvent)       |
| focus  | triggers when Input focuses                                                                           | (event: FocusEvent)       |
| change | triggers when the input box loses focus or the user presses Enter, only if the modelValue has changed | (value: string \| number) |
| input  | triggers when the Input value change                                                                  | (value: string \| number) |
| clear  | triggers when the Input is cleared by clicking the clear button                                       | —                         |

### Input Slots

| Name    | Description                     |
| ------- | ------------------------------- |
| prefix  | content as Input prefix         |
| suffix  | content as Input suffix         |
| prepend | content to prepend before Input |
| append  | content to append after Input   |

### Input Exposes

| Name  | Description             | Type                                                    |
| ----- | ----------------------- | ------------------------------------------------------- |
| blur  | blur the input element  | ^[Function]`() => void`                                 |
| clear | clear input value       | ^[Function]`() => void`                                 |
| focus | focus the input element | ^[Function]`() => void`                                 |
| ref   | HTML element input      | ^[Object]`Ref<HTMLInputElement \| HTMLTextAreaElement>` |
