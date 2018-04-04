<template>  
  <svg :class="className" :width="width" :height="height">
    <use :xlink:href="'#' + glyph" />
  </svg>
</template>

<script>  
export default {  
  name: 'icon',
  props: ['className', 'glyph', 'width', 'height'],
};
</script>

<style lang="scss" scoped>  
@import '../../styles/styles.scss';

.icon {
  display: inline-block;
}
.light-grey {
    fill: #aaa;
}
.red {
    fill: red;
}
</style> 