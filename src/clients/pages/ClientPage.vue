<script setup lang="ts">
import LoadingModal  from '@/shared/components/LoadingModal.vue';
import { useRoute } from 'vue-router';
import useClient from '../composables/useClient';

const route = useRoute()
const { client, isLoading } = useClient(+route.params.id)
        
</script>
        
<template>
   <h3>Guardando...</h3>+
   <h3>Guardado</h3>

   <LoadingModal v-if="isLoading"/>

   <div>
    <h1>Kevin Rangel</h1>
    <form action="">
        <input type="text" placeholder="Nombre del cliente" />
        <input type="text" placeholder="Direccion" id="" />
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