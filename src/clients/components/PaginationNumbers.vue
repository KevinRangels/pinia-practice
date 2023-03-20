<script setup lang="ts">
import { ref, toRef, watch } from 'vue';

interface Props {
    currentPage: number,
    totalPages: number
}
interface Emits {
    (e: 'pageChanged', page: number):void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const totalPages = toRef(props, 'totalPages')
const currentPage = toRef(props, 'currentPage')

const totalPageNumbers = ref<number[]>([])
watch(totalPages, () => {
    totalPageNumbers.value =  [...new Array(totalPages.value)].map((v, i) => i + 1)  // Crear arreglo a apartir de un numero
}, { immediate: true })
</script>

<template>
    <div>
        <button
            :disabled="currentPage === 1"
            @click="emits('pageChanged', currentPage - 1)"
        >
            Anterior
        </button>
        <button
            v-for="number of totalPageNumbers"
            :key="number"
            @click="emits('pageChanged', number)"
            :class="{active: currentPage === number}"
        >
            {{number}}
        </button>
        <button
            :disabled="currentPage === totalPages"
            @click="emits('pageChanged', currentPage + 1)"
        >
            Siguiente
        </button>
    </div>
</template>



<style scoped>
div {
    margin-top: 10px;
}
button {
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid var(--color-border);
    color: var(--color-text);
    margin-right: 5px;
    padding: 10px;
    transition: all .5s;
    cursor: pointer;
}
button:hover {
    background-color: hsl(160, 100%, 37%, 0.2);
    transition: all 5s;
}
button:disabled {
    cursor: not-allowed;
}
.active {
    background-color: hsl(160, 100%, 37%, 0.2);
}
</style>