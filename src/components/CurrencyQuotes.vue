<template>
    <div>
        <md-table md-card>
            <md-table-toolbar>
                <h1 class="md-title">Котировки</h1>
                <router-link :to="{ name : 'about' }">О проекте</router-link>
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

                <md-field>
                    <md-input v-model="searchString"
                              type="text"
                              name="searchString"
                              v-on:keyup.enter="validate"
                              :class="{ 'is-invalid': submitted && errors.has('text') }"></md-input>
                    <div v-if="submitted && errors.has('searchString')" class="invalid-feedback">{{
                        errors.first('searchString') }}
                    </div>
                    <md-button @click="validate">Найти</md-button>
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
    import MdRouterLink from "vue-material/src/core/mixins/MdRouterLink/MdRouterLink";
    import { mapState } from 'vuex';

    export default {
        name: 'CurrencyQuotes',
        components: {MdRouterLink},
        data() {
            return {
                submitted: false,
                quotSelect: [],
                selQuotes: {},
                searchString: '',
            }
        },
        computed: {
            ...mapState([
                'quotes'
            ])
        },
        created: async function () {
            const {quotSelect} = this;
            await this.$store.dispatch('getQuotePairs', {quotSelect});
        },
        mounted: function () {
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
                    const {quotSelect} = this;
                    await this.$store.dispatch('getQuotePairs', {quotSelect})
                }
            },
            validate: function() {
                this.submitted = true;
                this.$validator.validate().then(valid => {
                    if (valid) {
                        this.searchPairs()
                    }
                });
            },
            searchPairs: async function () {
                this.quotSelect = [this.searchString]
                const {quotSelect} = this;
                await this.$store.dispatch('getQuotePairs', {quotSelect})
            },
        }
    }
</script>

<style scoped>
    @import url("./style.css");
</style>