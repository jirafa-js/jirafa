---
title: Divider
lang: en-US
---

# Divider

Divide the content area and separate the modules.

## Basic Usage

::: demo It divides the text of different paragraphs.
divider/basic
:::

## With Custom Content

You can customize the content on the divider line.
::: demo
divider/orientation
:::

## Line Type

You can set the style of divider.
::: demo
divider/type
:::

## Space

Built-in 4 sizes, `mini-4px` `small-8px` `default-16px` `large-24px`, and also support to pass numbers to customize the size.
::: demo
divider/space
:::

## Vertical Layout

::: demo
divider/direction
:::

## Divider Props

| Name        | Description                                                                     | Type                                                                                | Default        |
| ----------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------- |
| direction   | determine whether divider's direction                                           | `'horizontal' \| 'vertical'`                                                        | `'horizontal'` |
| orientation | determine whether the position of the customized content on the divider line    | `'left' \| 'center' \| 'right'`                                                     | `'center'`     |
| type        | determine whether divider's style                                               | [`CSS/border-style`](https://developer.mozilla.org/en-US/docs/Web/CSS/border-style) | `'solid'`      |
| space       | Margin up and down the split line (left and right margin in vertical direction) | `'mini' \| 'small' \| 'default' \| 'large' \| number`                               | `'default'`    |

## Divider Slots

| Name | Description               |
| ---- | ------------------------- |
| -    | customize default content |
