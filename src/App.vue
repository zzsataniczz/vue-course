<template>
  <div id="app">
      <CurrencyQuotes/>
  </div>
</template>

<script>
import CurrencyQuotes from "./components/CurrencyQuotes.vue";

export default {
  name: 'app',
  components: {
      CurrencyQuotes,
  }
}
</script>
