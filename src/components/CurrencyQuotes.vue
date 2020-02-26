<template>
    <div>
        <md-table md-card>
            <md-table-toolbar>
                <h1 class="md-title">Котировки</h1>
                <md-field>
                    <label for="quotSelect">Выберите пары</label>
                    <md-select v-model="quotSelect" name="quotSelect" id="quotSelect" @md-closed="updateQuotes"
                               multiple>
                        <md-option
                                v-for="(quote, index) in selQuotes.data" v-bind:key="index"
                                :value="quote">
                            {{quote}}
                        </md-option>
                    </md-select>
                </md-field>

            </md-table-toolbar>

            <md-table-row>
                <md-table-head>Валюта</md-table-head>
                <md-table-head>Значение</md-table-head>
            </md-table-row>

            <md-table-row v-for="(rate, index) in quotes.data" v-bind:key="index">
                <md-table-cell>{{index}}</md-table-cell>
                <md-table-cell md-numeric>{{rate}}</md-table-cell>
            </md-table-row>

        </md-table>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'CurrencyQuotes',
        data() {
            return {
                quotSelect: [],
                selQuotes: {},
                quotes: {}
            }
        },
        mounted: function () {
            axios('/getDataByBaseQuote', {
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    selectedQuotes: this.quotSelect
                }
            }).then((response) => {
                this.quotes = (response.data);
            });


            axios('/getQuotes', {
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                this.selQuotes = (response.data);
            });

        },
        methods: {
            updateQuotes: async function () {
                if (this.quotSelect.length > 0) {

                    axios('/getDataByBaseQuote', {
                        method: 'GET',
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        params: {
                            selectedQuotes: this.quotSelect
                        }
                    }).then((response) => {
                        this.quotes = (response.data);
                    })
                }

            },
        }
    }
</script>