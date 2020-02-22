<template>
    <div>
        <md-table md-card>
            <md-table-toolbar>
                <h1 class="md-title">Котировки</h1>
                <h3 class="md-title">Базовая котировка: {{ quotes.base }}</h3>

            </md-table-toolbar>

            <md-table-row>
                <md-table-head>Валюта</md-table-head>
                <md-table-head>Значение</md-table-head>
            </md-table-row>

            <md-table-row v-for="(rate, index) in quotes.rates" v-bind:key="index">
                <md-table-cell>{{index}}</md-table-cell>
                <md-table-cell md-numeric>{{rate}}</md-table-cell>
            </md-table-row>

        </md-table>
    </div>
</template>

<script>
    export default {
        name: 'CurrencyQuotes',
        props: {
            quotes: Object
        },
    }
</script>