<script lang="ts" setup>
import {
  ChevronLeft,
  ChevronRight,
  Delete,
  Edit,
  More,
  Share,
} from '@jirafa/icons'
</script>

<template>
  <JSpace direction="vertical">
    <JSpace>
      <JButtonGroup>
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup size="large" type="primary">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup size="large" type="outline">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup size="large" type="dashed">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>
    </JSpace>
    <JSpace>
      <JButtonGroup status="success">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup status="success" size="large" type="primary">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup status="success" size="large" type="outline">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup status="success" size="large" type="dashed">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>
    </JSpace>
    <JSpace>
      <JButtonGroup status="warning">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup status="warning" size="large" type="primary">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup status="warning" size="large" type="outline">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup status="warning" size="large" type="dashed">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>
    </JSpace>
    <JSpace>
      <JButtonGroup status="danger">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup status="danger" size="large" type="primary">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup status="danger" size="large" type="outline">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>

      <JButtonGroup status="danger" size="large" type="dashed">
        <JButton>More</JButton>
        <JButton :icon="More"></JButton>
      </JButtonGroup>
    </JSpace>
    <JSpace>
      <JButtonGroup type="primary">
        <JButton :icon="ChevronLeft">Prev</JButton>
        <JButton
          >Next<JIcon class="j-icon--right"><ChevronRight /> </JIcon
        ></JButton>
      </JButtonGroup>
    </JSpace>
    <JSpace>
      <JButtonGroup type="primary" shape="round">
        <JButton :icon="ChevronLeft" status="warning">Prev</JButton>
        <JButton
          >Next<JIcon class="j-icon--right"><ChevronRight /> </JIcon
        ></JButton>
      </JButtonGroup>
    </JSpace>
    <JSpace>
      <JButtonGroup type="primary" status="warning">
        <JButton :icon="Delete"></JButton>
        <JButton :icon="Share"></JButton>
        <JButton :icon="Edit"></JButton>
      </JButtonGroup>
    </JSpace>
    <JSpace>
      <JButtonGroup disabled size="small">
        <JButton>Prev</JButton>
        <JButton>Next</JButton>
      </JButtonGroup>
      <JButtonGroup>
        <JButton shape="round">Next</JButton>
      </JButtonGroup>
    </JSpace>
  </JSpace>
</template>
