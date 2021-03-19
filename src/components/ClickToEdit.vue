<template>
    <div>
        <input type="text"
               v-if="edit"
               :value="valueLocal"
               @blur="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal)"
               @keyup.enter="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal)"
               v-focus=""
        />
        <p v-else @click="edit = true;">
            {{valueLocal}}
        </p>
    </div>
</template>

<script>
    export default {

        props: ['value'],

        data () {
            return {
                edit: false,
                valueLocal: this.value
            }
        },

        watch: {
            value: function() {
                console.log("hellow")
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