<template>
    <div class="home">
        <CurrencyQuotes :quotes="items"/>
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
                items: {}
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
                this.items = (response.data);
            })
        }
    }
</script>