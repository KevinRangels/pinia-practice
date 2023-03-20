<script setup lang="ts">
import LoadingModal  from '@/shared/components/LoadingModal.vue';
import { useMutation } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import useClient from '../composables/useClient';
import type { Client } from '../interfaces/client';
import clientsApi from '../../api/clients-api';

const route = useRoute()
const { client, isLoading } = useClient(+route.params.id)

const updatedClient = async(client: Client):Promise<Client> => {
    const { data } = await clientsApi.patch<Client>(`/clients/${client.id}`, client)
    return data
}

const clientMutation = useMutation( updatedClient )
        
</script>
        
<template>
   <h3>Guardando...</h3>
   <h3>Guardado</h3>

   <LoadingModal v-if="isLoading"/>

   <div v-if="client">
    <h1>{{ client.name}}</h1>
    <form @submit.prevent="clientMutation.mutate(client!)">
        <input type="text" placeholder="Nombre del cliente" v-model="client.name"/>
        <input type="text" placeholder="Direccion" v-model="client.address"/>
        <br>
        <button type="submit">Guardar</button>
    </form>
   </div>
   <code>
    {{ client }}
   </code>
</template>

<style scoped>
input {
    width: 100%;
    padding: 5px 10px;
    margin-bottom: 10px;
}
button {
    margin-bottom: 10px;
}
</style>