import Vue from "vue";

let app = new Vue({
    el: '#home',
    data: {
        names: ['Wisdom', "Ekpot", "Ubongabasi"]
    },
    methods: {
        logSomeThing() {
            return 'Hello Wisdom Ekpot'
        }
    },
    mounted() {
        console.log(this.logSomeThing());
    }
})
