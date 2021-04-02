<template>
        <input type="text"
               v-if="edit"
               :value="valueLocal"
               @blur="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal)"
               @keyup.enter="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal)"
               v-focus=""
        />
        <span v-else @click="edit = true;">
            {{valueLocal}}<sup class="bi bi-pencil-fill"></sup>
        </span>
</template>
<style scoped>
    sup {
        font-size: 50%;
        margin-left: 0.20rem
    }
</style>
<script>
    export default {

        props: ['value'],

        data () {
            return {
                edit: false,
                valueLocal: this.value,
            }
        },

        watch: {
            value: function() {
                this.valueLocal = this.value;
            },
            valueLocal: function() {
                this.changedData()
            }
        },
        methods: {
            changedData() {
                this.$emit('changedData', this.valueLocal);
            }
        },
        directives: {
            focus: {
                inserted (el) {
                    el.focus()
                }
            }
        }

    }
</script>