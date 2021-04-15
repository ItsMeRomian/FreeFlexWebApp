<template>
    <div class="row">
        <div class="col text-center">
            <h1 class="display-5">Youngones, Temper & Jobner. All in one place.</h1>
            <p>
                <router-link class="btn btn-success" to="/login">Create Account</router-link>
                <span class="mx-1"/>
                <router-link class="btn btn-info" to="/read-more">Learn more</router-link>
            </p>
            <p class="text-center h5">
                <span class="header-item"><i class="bi bi-archive"></i> All your Jobs in one place.</span>
                <span class="header-item"><i class="bi bi-building"></i> Made for Freelancers.</span>
                <span class="header-item"><i class="bi bi-github"></i> Open source since day 1.</span>
                <span class="header-item"><i class="bi bi-graph-up"></i> Nice graphs.</span>
                <span class="header-item"><i class="bi bi-minecart"></i> Add your car & trips.</span>
            </p>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="card bg-secondary text-center">
                <div class="card-header">
                    <h3><i class="bi bi-calendar-week"></i></h3>
                </div>
                <div class="card-body">
                    <p>All your Freelance platform jobs in one place. No more annoying spreadsheets, but a nice looking, fast, interactive web client.</p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card bg-secondary text-center">
                <div class="card-header">
                    <h3><i class="bi bi-github"></i></h3>
                </div>
                <div class="card-body">
                    <p>Have something FreeFlexr is missing? Add it yourself! Or ask one of our developers :) </p>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card bg-secondary text-center">
                <div class="card-header">
                    <h3><i class="bi bi-file-earmark-spreadsheet"></i></h3>
                </div>
                <div class="card-body">
                    <p>No need to manually import all your worked jobs. With a handy tool you'll be able to import it in a few clicks.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Intro"
    }
</script>

<style scoped>
    .header-item:before {
        content: " • "
    }
</style>