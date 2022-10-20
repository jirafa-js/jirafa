---
title: Button
lang: en-US
---

# Button

## Basic Usage

Button is divided into five types: `primary`, `secondary`**(Default)**, `dashed`, `outline`, `text`.
::: demo
button/basic
:::

## Icon Button

Buttons can be embedded with icons. When only icons are set, the width and height of the buttons are equal.
::: demo
button/icon
:::

## Sizes

Use attribute `size` to set additional sizes with `large`, `small`, `mini`
::: demo
button/size
:::

## Status

The state of button is divided into four types: `success` , `warning` , `danger`.
::: demo
button/status
:::

## Loading Button

Set `loading` attribute to `true` to display loading state.
::: demo
button/loading
:::

## Disabled Button

Set `disabled` attribute to `true` to disabled the button.
::: demo
button/disabled
:::

## Block Button

Set `block` attribute to `true` to make the button fit to its parent width.
::: demo
button/block
:::

## Button-Group

Displayed as a button group, can be used to group a series of similar operations.
::: demo
button/group
:::

## Button Props

| Name         | Description                       | Type                                                          | Default     |
| ------------ | --------------------------------- | ------------------------------------------------------------- | ----------- |
| type         | button variant                    | `'primary' \| 'secondary' \| 'outline' \| 'dashed' \| 'text'` | `secondary` |
| status       | button status                     | ` warning \| danger \| success`                               | -           |
| size         | determine whether button's size   | `mini \| small \| large`                                      | -           |
| shape        | determine whether button's shape  | `round \| circle`                                             | -           |
| icon         | button prefix Icon                | `string \| Component`                                         | -           |
| loading-icon | customize loading icon component  | `string \| Component`                                         | `Loading`   |
| loading      | determine whether it's loading    | `boolean`                                                     | `false`     |
| disabled     | disabled the button               | `boolean`                                                     | `false`     |
| html-type    | same as native button's type      | `button \| submit \| reset`                                   | `button`    |
| autofocus    | same as native button's autofocus | `boolean`                                                     | `false`     |

## Button Slots

| Name    | Description                 |
| ------- | --------------------------- |
| -       | customize button content    |
| loading | customize loading component |
| icon    | customize icon component    |

## Button-Group Props

| Name     | Description                                 | Type                                                          | Default     |
| -------- | ------------------------------------------- | ------------------------------------------------------------- | ----------- |
| type     | Children button type divided                | `'primary' \| 'secondary' \| 'outline' \| 'dashed' \| 'text'` | `secondary` |
| status   | Children button status                      | ` warning \| danger \| success`                               | -           |
| size     | Children button size                        | `mini \| small \| large`                                      | -           |
| shape    | Button's shape                              | `round \| circle`                                             | -           |
| disabled | All children whether the button is disabled | `boolean`                                                     | -           |

## Button-Group Slots

| Name | Description                    |
| ---- | ------------------------------ |
| -    | customize button group content |
