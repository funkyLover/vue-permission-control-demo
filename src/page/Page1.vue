
<template>
  <div>
    <h1>Page1</h1>
    <Auth auth="canShowHello">
      <Hello></Hello>
    </Auth>
  </div>
</template>

<script>
import Hello from '@/components/HelloWorld'

export default {
  name: 'Page-Page1',
  components: {
    Hello
  }
}
</script>
