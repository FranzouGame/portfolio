<template>
  <div class="pointer-events-none fixed inset-y-0 left-0 right-0 z-20 hidden xl:block" aria-hidden="true">
    <div class="side-ornament side-ornament-left">
      <div class="side-ornament-rail">
        <span class="side-ornament-line side-ornament-line-top" />
        <span class="side-ornament-dot side-ornament-glow" />
        <span class="side-ornament-line side-ornament-line-bottom" />
      </div>

      <UiDecoTwig class="side-ornament-twig side-ornament-float" />
      <UiDecoAsanoha :size="54" class="side-ornament-star side-ornament-drift" />
    </div>

    <div class="side-ornament side-ornament-right">
      <div class="side-ornament-rail">
        <span class="side-ornament-line side-ornament-line-top" />
        <span class="side-ornament-dot side-ornament-glow side-ornament-dot-soft" />
        <span class="side-ornament-line side-ornament-line-bottom" />
      </div>

      <UiDecoEnso :size="92" class="side-ornament-enso side-ornament-breathe" />
      <UiDecoSeigaiha class="side-ornament-wave side-ornament-drift" />
    </div>
  </div>
</template>
