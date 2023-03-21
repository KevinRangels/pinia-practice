<script setup lang="ts">
import LoadingModal  from '@/shared/components/LoadingModal.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';
import useClient from '../composables/useClient';
import type { Client } from '../interfaces/client';
import clientsApi from '../../api/clients-api';
import { watch } from 'vue';

const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()

const { client, isLoading, isError } = useClient(+route.params.id)

const updatedClient = async(client: Client):Promise<Client> => {

    // await new Promise( resolve => {
    //     setTimeout(() => {
    //         resolve(true)
    //     }, 2000);
    // })

    const { data } = await clientsApi.patch<Client>(`/clients/${client.id}`, client)
    const queries = queryClient.getQueryCache().findAll(['clients?page='], {exact: false}) //Buscar todos los queries que tengan ese nombre
    // queries.forEach(query => query.reset()) // Borra todas la queries en cache
    queries.forEach(query => query.fetch()) // Actualiza todas la queries en cache
    return data
}

const clientMutation = useMutation( updatedClient, {
    onSuccess(data) {
        console.log({data});
    }
} )

watch(clientMutation.isSuccess, () => {
    setTimeout(() => {
        clientMutation.reset()
    }, 2000);
})

watch(isError, () => {
    if (isError.value) {
        router.replace('/clients')
    }
})
        
</script>
        
<template>
   <h3 v-if="clientMutation.isLoading.value">Guardando...</h3>
   <h3 v-if="clientMutation.isSuccess.value">Guardado</h3>

   <LoadingModal v-if="isLoading"/>

   <div v-if="client">
    <h1>{{ client.name}}</h1>
    <form @submit.prevent="clientMutation.mutate(client!)">
        <input type="text" placeholder="Nombre del cliente" v-model="client.name"/>
        <input type="text" placeholder="Direccion" v-model="client.address"/>
        <br>
        <button type="submit" :disabled="clientMutation.isLoading.value">Guardar</button>
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