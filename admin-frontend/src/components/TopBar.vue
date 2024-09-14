<script>
export default {
    name: "TopBar",
    propts: {
        title: String,
    },
    data() {
        return {
            items: [
                {
                    label: "Manage Bookings",
                    command: () => {
                        this.$router.push("/bookings");
                    },
                },
            ]
        }
    },
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push("/");
        },
    },
    beforeMount() {
        document.title = this.title;
    },
};
</script>
<template>
    <Menubar :model="items">
        <template #start>
            <b>Admin Frontend</b>
        </template>
    </Menubar>
</template>