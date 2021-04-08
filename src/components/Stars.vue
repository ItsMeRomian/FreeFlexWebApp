<template>
    <span class="star-holder">
        <span v-for="n in fullStars" :key="n"><i class="bi bi-star-fill"></i></span>
        <i class="bi bi-star-half" v-if="halfStar"></i>
        ({{rating}})
    </span>
</template>

<script>
    export default {
        name: "Stars",
        data: function() {
            return {
                fullStars: false,
                halfStar: false
            }
        },
        props: {
            rating: Number
        },
        mounted() {
            this.makeStars()
        },
        methods: {
            makeStars: function () {
                if (this.rating) {
                    this.fullStars = (Math.floor(this.rating))
                    this.halfStar = this.rating % 1 !== 0;
                }
            }
        },
        watch: {
            rating: function () {
                this.makeStars()
            }
        }
    }
</script>

<style scoped>
    span .bi {
        margin-right: 1em;
        font-size: 1.25em
    }
    .star-holder .bi{
        margin-right: 0.25em;
        font-size: 1.75em
    }
</style>