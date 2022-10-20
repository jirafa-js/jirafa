<template>
  <JRow>
    <JCol :span="24"><div class="grid-content"></div></JCol>
  </JRow>
  <JRow>
    <JCol :span="12"><div class="grid-content"></div></JCol>
    <JCol :span="12"><div class="grid-content"></div></JCol>
  </JRow>
  <JRow>
    <JCol :span="8"><div class="grid-content"></div></JCol>
    <JCol :span="8"><div class="grid-content"></div></JCol>
    <JCol :span="8"><div class="grid-content"></div></JCol>
  </JRow>
  <JRow>
    <JCol :span="6"><div class="grid-content"></div></JCol>
    <JCol :span="6"><div class="grid-content"></div></JCol>
    <JCol :span="6"><div class="grid-content"></div></JCol>
    <JCol :span="6"><div class="grid-content"></div></JCol>
  </JRow>
  <JRow>
    <JCol :span="4"><div class="grid-content"></div></JCol>
    <JCol :span="4"><div class="grid-content"></div></JCol>
    <JCol :span="4"><div class="grid-content"></div></JCol>
    <JCol :span="4"><div class="grid-content"></div></JCol>
    <JCol :span="4"><div class="grid-content"></div></JCol>
    <JCol :span="4"><div class="grid-content"></div></JCol>
  </JRow>
</template>

<style lang="scss" scoped>
.j-row {
  margin-bottom: 12px;
  padding: 4px 0;
  background-color: var(--j-color-primary-lighten-5);
  &:last-child {
    margin-bottom: 0;
  }
}

.j-col {
  .grid-content {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 36px;
    border-radius: 4px;
    color: #fff;
  }
  &:nth-child(2n) .grid-content {
    background-color: var(--j-color-primary-lighten-3);
  }
  &:nth-child(2n + 1) .grid-content {
    background-color: var(--j-color-primary-darken-1);
  }
}
</style>
