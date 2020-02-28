<template>
    <div id="app">
        <router-view></router-view>
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
