import { useQuery, useMutation } from '@tanstack/vue-query';
import { ref, watch, computed } from 'vue';
import type { Client } from "../interfaces/client"
import clientsApi from '../../api/clients-api';

const getClient = async(id: number):Promise<Client> => {
    const { data } = await clientsApi.get(`/clients/${id}`)
    return data
}

const updatedClient = async(client: Client):Promise<Client> => {
    const { data } = await clientsApi.patch<Client>(`/clients/${client.id}`, client)
    return data
}

const useClient = (id: number) => {

    const client = ref<Client>()

    const {isLoading, data, isError} = useQuery(
        ['client', id],
        () => getClient(id),
        {
            retry: false,  // No lo intentes mucha veces
        }
    )

    const clientMutation = useMutation( updatedClient, {
        onSuccess(data) {
            console.log({data});
        }
    } )

    watch(data, () => {
        if (data.value)
            client.value = {...data.value}
    }, {immediate: true})

    return {
        client,
        isError,
        isLoading,
        clientMutation,

        isUpdating: computed(() => clientMutation.isLoading.value) // forma de pasarlo mas limpio
    }
}

export default useClient