<script setup lang="ts">

</script>

<template>
    <ul>
        <li>
            <RouterLink :to="{
                name: 'client-id',
                params: { id: 1 }
            }">
                Client Name
            </RouterLink>
        </li>
        <li>Client 2</li>
    </ul>
</template>



<style scoped>

</style>