---
title: Button
lang: en-US
---

# Button

## Basic Usage

::: demo Use `variant`, `color`, `shape` to define Button's style.
button/basic
:::

## Sizes

::: demo Use attribute size to set additional sizes with `lg`, `md`, `sm`, `xs`, default is `md`.
button/size
:::

## Loading Button

::: demo Set `loading` attribute to `true` to display loading state.
button/loading
:::

## Disabled Button

::: demo Set `loading` attribute to `true` to disabled the button.
button/disabled
:::

## Button-Group

::: demo Displayed as a button group, can be used to group a series of similar operations.
button/group
:::

## Button Props

| Name         | Description                                                                        | Type                                              | Default   |
| ------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------- | --------- |
| variant      | button variant                                                                     | `block \| solid \| outline \| text`               | `outline` |
| color        | button color, if set `variant` to `solid`, its value will be `primary` by default. | `primary \| warning \| danger \| info \| success` | -         |
| size         | determine whether button's size                                                    | `xs \| sm \| md \| lg`                            | `md`      |
| shape        | determine whether button's shape                                                   | `round \| circle`                                 | -         |
| icon         | button prefix Icon                                                                 | `string \| Component`                             | -         |
| loading-icon | customize loading icon component                                                   | `string \| Component`                             | `Loading` |
| disabled     | disabled the button                                                                | `boolean`                                         | `false`   |
| loading      | determine whether it's loading                                                     | `boolean`                                         | `false`   |
| type         | same as native button's type                                                       | `button \| submit \| reset`                       | `button`  |
| autofocus    | same as native button's autofocus                                                  | `boolean`                                         | `false`   |

## Button Slots

| Name    | Description                 |
| ------- | --------------------------- |
| -       | customize button content    |
| loading | customize loading component |
| icon    | customize icon component    |

## Button-Group Props

| Name | Description                                      | Type                  | Default |
| ---- | ------------------------------------------------ | --------------------- | ------- |
| size | control the size of buttons in this button-group | same as button's size | -       |

## Button-Group Slots

| Name | Description                    |
| ---- | ------------------------------ |
| -    | customize button group content |
