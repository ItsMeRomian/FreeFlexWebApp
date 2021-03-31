<template>
        <input type="text"
               v-if="edit"
               :value="valueLocal"
               @blur="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal)"
               @keyup.enter="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal)"
               v-focus=""
        />
        <span v-else @click="edit = true;">
            {{valueLocal}}<i class="bi bi-pencil-fill"></i>
        </span>
</template>
<style scoped>
    i {
        font-size: 50%
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