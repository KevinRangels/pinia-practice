import { useQuery } from '@tanstack/vue-query'
import type { Client } from "../interfaces/client"
import clientsApi from '../../api/clients-api';

const getClients = async():Promise<Client[]> => {
    const { data } = await clientsApi.get<Client[]>('/clients?page=1')
    return data
}

const useClients = () => {

    const {isLoading, data } = useQuery(
        ['clients?page=',1],
        () => getClients()
    )

    return {

    }
}

export default useClients