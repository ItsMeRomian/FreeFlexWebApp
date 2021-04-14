<template>
    <hr>
    <div class="container my-5">
        <div class="row">
            <div class="col">
                <span class="h3">FreeFlexr</span><sup class="mx-1">v{{v}}</sup>
                <p>
                    <a href="https://github.com/itsmeromian/FreeFlexr/releases" target="_blank">Changelog</a> <br>
                    Made By <a href="https://dynafools.live/" target="_blank">ItsMeRomian</a>, with &hearts;</p>
            </div>
            <div class="col text-center">
                <h3>Github</h3>
                <p>Follow the development process on the <a href="https://github.com/itsmeromian/FreeFlexr" target="_blank">FreeFlexr repo</a>.</p>
            </div>
            <div class="col text-end">
                <h3>Found a bug? Want a feature?</h3>
                <p>You can make an issue on Github <a href="https://github.com/itsmeromian/FreeFlexr/issues" target="_blank">here</a>.</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        props: ['v'],
    }
</script>

<style scoped>

</style>