<template>
    <div>
        <v-app >
            <v-container>
                <Register />
            </v-container>
        </v-app>
    </div>
</template>

<script>
import Register from "@/components/Auth/Register.vue"
export default {
    components: {
        Register
    },
    computed: {
        isLoggedIn: function () { return this.$store.getters.isAuthenticated }
    },
}
</script>

<style></style>