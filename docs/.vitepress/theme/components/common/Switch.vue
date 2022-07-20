<script lang="ts" setup></script>

<template>
  <div class="switch" role="switch">
    <div class="switch__action">
      <div class="switch__icon">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--site-c-divider);
  background-color: var(--site-c-bg-mute);
  transition: border-color 0.25s, background-color 0.25s;
  cursor: pointer;

  &:hover {
    border-color: var(--site-c-gray);
  }

  &__action {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--site-c-white);
    box-shadow: var(--site-shadow-1);
    transition: background-color 0.25s, transform 0.25s;

    .dark & {
      background-color: var(--site-c-black);
      transform: translateX(18px);
    }
  }

  &__icon {
    position: relative;
    display: block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    overflow: hidden;

    :deep(svg) {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 12px;
      height: 12px;
      fill: var(--site-c-text-2);
    }

    @at-root .dark & :deep(svg) {
      fill: var(--site-c-text-1);
      transition: opacity 0.25s;
    }
  }
}
</style>
