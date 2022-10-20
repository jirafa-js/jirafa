---
title: Space
lang: en-US
---

# Space

Set the spacing between components.

## Basic Usage

Basic usage of spacing components.
::: demo
space/basic
:::

## Vertical Layout

You can set the spacing in the vertical direction.
::: demo
space/vertical
:::

## Algin

You can set the spacing in the vertical direction.
::: demo
space/algin
:::

## Gutter

Built-in 4 sizes, `mini-4px` `small-8px` `default-16px` `large-24px`, and also support to pass numbers to customize the size.

::: demo
space/gutter
:::

## Auto Wraping

Using `wrap` to control line wrap.
::: demo
space/wrap
:::

## Fill the container

Using `fill` to automatically fill the container with child nodes.

::: demo
space/fill
:::

## Spacer

Set spacer for adjacent child elements.
::: demo
space/spacer
:::

## Space Props

| Name      | Description                     | Type                                                                                | Default        |
| --------- | ------------------------------- | ----------------------------------------------------------------------------------- | -------------- |
| direction | The space direction             | `'vertical' \| 'horizontal'`                                                        | `'horizontal'` |
| align     | Controls the alignment of items | [`CSS/align-items`](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)   |
| gutter    | The spaceing size               | `'mini' \| 'small' \| 'large' \| 'default' \| number \| [SpaceGutter, SpaceGutter]` | `'default'`    |
