import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { Client } from '../clients/interfaces/client';

export const useClientsStore = defineStore('clients', () => {

    const currentPage = ref<number>(1)
    const totalPages = ref<number>(5)
    const clients = ref<Client[]>([])

    return {
        // State
        currentPage,
        totalPages,
        clients,
        // Getters
        // squareCounter: computed(() => count.value * count.value),
        
        // Actions
        setClients (newClients: Client[]) {
            clients.value = newClients
        },
        setPages (page: number) {
            if (currentPage.value === page) return
            currentPage.value = page
        }
    }
})