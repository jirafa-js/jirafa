---
title: Grid
lang: en-US
---

# Grid

Quickly and easily create layouts with the basic 24-column.

## Basic Usage

Demonstrated the most basic 24 equal division applications
::: demo
grid/basic
:::

## Gutter

By specifying `gutter` to spacings between columns, and its default value is `0`
::: demo
grid/gutter
:::

## Column Offset

You can specify the number of column offset by setting the value of `offset` attribute of Col.
::: demo
grid/offset
:::

## Horizontal Layout

Use `justify` for horizontal layout
::: demo
grid/justify
:::

## Vertical Layout

Use `align` for Vertical layout
::: demo
grid/align
:::

## Responsive Layout

Six preset response sizes, namely `xs`, `sm`, `md`, `lg`, `xl`, `max`

::: demo
grid/responsive
:::

## Grid Layout

::: demo
grid/grid
:::

## Grid-Responsive Layout

::: demo
grid/grid-responsive
:::

## Row Props

| Name    | Description                         | Type                                                                                   | Default   |
| ------- | ----------------------------------- | -------------------------------------------------------------------------------------- | --------- |
| tag     | custom element tag                  | `string`                                                                               | `'div'`   |
| justify | horizontal alignment of flex layout | `'start' \| 'center' \| 'end' \| 'space-around' \| 'space-bettween' \| 'space-evenly'` | `'start'` |
| align   | vertical alignment of flex layout   | `'start' \| 'center' \| 'end'`                                                         | `'start'` |
| gutter  | spacing gutter                      | `number`                                                                               | `0`       |

## Row Slots

| Name | Description               | SubTags |
| ---- | ------------------------- | ------- |
| -    | customize default content | `Col`   |

## Col Props

| Name   | Description                                          | Type                | Default |
| ------ | ---------------------------------------------------- | ------------------- | ------- |
| tag    | custom element tag                                   | `string`            | `'div'` |
| span   | number of column the grid spans                      | `number`            | `24`    |
| offset | number of spacing on the left side of the grid       | `number`            | `0`     |
| pull   | number of columns that grid moves to the left        | `number`            | `0`     |
| push   | number of columns that grid moves to the right       | `number`            | `0`     |
| xs     | `<576px` Responsive columns or column props object   | [`ColSize`](#types) |         |
| sm     | `>=576px` Responsive columns or column props object  | [`ColSize`](#types) |         |
| md     | `>=768px` Responsive columns or column props object  | [`ColSize`](#types) |         |
| lg     | `>=992px` Responsive columns or column props object  | [`ColSize`](#types) |         |
| xl     | `>=1200px` Responsive columns or column props object | [`ColSize`](#types) |         |
| max    | `>=1920px` Responsive columns or column props object | [`ColSize`](#types) |         |

## Col Slots

| Name | Description               |
| ---- | ------------------------- |
| -    | customize default content |

## Types

```ts
export interface ColSizeObject {
  span?: number
  offset?: number
  pull?: number
  push?: number
}

export type ColSize = number | ColSizeObject
```
