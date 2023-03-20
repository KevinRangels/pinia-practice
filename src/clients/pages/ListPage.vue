<script setup lang="ts">
import ClientList from '@/clients/components/ClientList.vue';
import PaginationNumbers from '../components/PaginationNumbers.vue';
import useClients from '../composables/useClients';
import LoadingModal from '@/shared/components/LoadingModal.vue';

const {isLoading, clients, getPage, currentPage, totalPages} = useClients()
        
</script>
<template>
    <div>
        <h1>Client List</h1>
        <!-- Client List -->
        <ClientList :clients="clients"/>

        <!-- Pagination Number -->
        <PaginationNumbers :current-page="currentPage" :total-pages="totalPages" @page-changed="getPage" />

        <!-- LoadingModal -->
        <LoadingModal v-if="isLoading"/>
    </div>
</template>


<style scoped>

</style>