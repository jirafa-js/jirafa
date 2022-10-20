---
title: Tag
lang: en-US
---

# Tag

## Basic Usage

::: demo
tag/basic
:::

## Colores

::: demo
tag/color
:::

## Checkable

::: demo
tag/checkable
:::

## closable

::: demo
tag/closable
:::

## Loading Tag

::: demo
tag/loading
:::

## Bordered

::: demo
tag/border
:::

## Sizes

::: demo
tag/size
:::

## Tag Props

| Name                 | Description                                                  | Type                                              | Default |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------- | ------- |
| color                | whether tag's style                                          | `primary \| warning \| danger \| info \| success` |         |
| size                 | whether tag's size                                           | `mini \| small \| large`                          |         |
| closable             | whether tag can be removed                                   | `boolean`                                         | `false` |
| loading              | whether tag is loading                                       | `boolean`                                         | `false` |
| checkable            | whether tag can be checked                                   | `boolean`                                         | `false` |
| checked(**v-model**) | whether tag is checked (available when the tag is checkable) | `boolean`                                         | `false` |
| border               | whether tag is bordered                                      | `boolean`                                         | `false` |

## Tag Events

| Event Name | Description                           | Paramters |
| ---------- | ------------------------------------- | --------- |
| change     | trigger when checkable tag is clicked | checked   |
| close      | trigger when closable tag is removed  |           |
