---
title: Form
lang: en-US
---

# Form

## Basic Usage

::: demo
form/basic
:::

## Layout

::: demo
form/layout
:::

## Validation

::: demo
form/validation
:::

## Sizes

::: demo
form/sizes
:::

## Form API

### Form Props

| Name                        | Description                                                                                                     | Type                                     | Default        |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | -------------- |
| `model`                     | Form data object.                                                                                               | `object`                                 |                |
| `layout`                    | The layout of the form.                                                                                         | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| `size`                      | The size of the form.                                                                                           | `'mini' \| 'small' \| 'large'`           |                |
| `label-width`               | The width of the label, `auto` is supported.                                                                    | `string \| number`                       |                |
| `label-position`            | The position of the label (Only effect when prop `layout` is `horizontal` and prop `label-width` also required) | `'left' \| 'right'`                      | `'right'`      |
| `label-suffix`              | The suffix of the label.                                                                                        | `string`                                 |                |
| `disabled`                  | Disabled the form.                                                                                              | `boolean`                                | `false`        |
| `hide-require-asterisk`     | Whether to hide required field's asterisk or not.                                                               | `boolean`                                | `false`        |
| `require-asterisk-position` | The position of the required asterisk.                                                                          | `'left' \| 'right'`                      | `'left'`       |
| scroll-to-first-error       | Whether to scroll to first error field when form validation.                                                    | `'left' \| 'right'`                      | `'left'`       |
| status-icon                 | Whether to show validation status.                                                                              | `'left' \| 'right'`                      | `'left'`       |

### Form Methods

| Method          | Description                                                        | Type                                                                                                                             |
| --------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `validate`      | Validate the whole form. Receives a callback or returns `Promise`. | `(callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>`                                  |
| `validateField` | Validate specified fields.                                         | `(props?: Arrayable<FormItemProp>, callback?: (isValid: boolean, invalidFields?: ValidateFieldsError) => void) => Promise<void>` |
| `resetFields`   | Reset specified fields and remove validation result.               | `(props?: Arrayable<FormItemProp>) => void`                                                                                      |
| `scrollToField` | Scroll to the specified fields.                                    | `(prop: FormItemProp) => void`                                                                                                   |
| `clearValidate` | Clear validation message for specified fields.                     | `(props?: Arrayable<FormItemProp>) => void`                                                                                      |
| `scrollToField` | Clear validation message for specified fields.                     | `(props: FormItemProp) => void`                                                                                                  |

### Form Events

| Name       | Description                              | Type                                                              |
| ---------- | ---------------------------------------- | ----------------------------------------------------------------- |
| `validate` | Triggered after a form item is validated | `(prop: FormItemProp, isValid: boolean, message: string) => void` |

### Form Slots

| Name | Description               |
| ---- | ------------------------- |
| -    | customize default content |

## Form Item API

### Form Item Props

| Name              | Description                                                                                                                                       | Type                                                | Default |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------- |
| `size`            | The size of the component in this form-item.                                                                                                      | `'mini' \| 'small' \| 'large'`                      |         |
| `label-width`     | The width of the label, `auto` is supported.                                                                                                      | `string \| number`                                  |         |
| `label`           | The text of the label.                                                                                                                            | `string`                                            |         |
| `prop`            | A key of `model`, in the use of form method `validate`, the attribute is required. It could be an array of property path (e.g `['a', 'b', 'c']`). | `string \| string[]`                                |         |
| `required`        | Whether the field is required or not.                                                                                                             | `boolean`                                           | `false` |
| `rules`           | Validation rules of this form.                                                                                                                    | [`FormItemRule \| FormItemRule[]`](#form-item-rule) |         |
| `validate-status` | Validate status.                                                                                                                                  | `'success' \| 'warning' \| 'error' \| 'validating'` |         |
| `for`             | Validate status.                                                                                                                                  | `'success' \| 'warning' \| 'error' \| 'validating'` |         |

### Form Item Slots

| Name    | Description                                   | Slot Scope  |
| ------- | --------------------------------------------- | ----------- |
| —       | Content of Form Item.                         | —           |
| `label` | Custom content to display on label.           | `{ label }` |
| `error` | Custom content to display validation message. | `{ error }` |

### FormItemRule

```ts

```
