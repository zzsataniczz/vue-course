<template>
  <div class="home">
    <CurrencyQuotes :msg="text"/>
  </div>
</template>

<script>
import axios from 'axios'
import CurrencyQuotes from '../components/CurrencyQuotes.vue'

export default {
  name: 'home',
  components: {
      CurrencyQuotes
  },
  data() {
      return {
          text: 'Идет загрузка...'
      }
  },
  mounted: function () {
    axios('/api', {
        method: 'GET',
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        this.text = response.data.text
    })
  }

}
</script>