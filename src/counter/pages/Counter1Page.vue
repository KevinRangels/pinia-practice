<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCounterOptionsStore } from '../../store/counter-options';
import CounterOptionsValue from '../components/CounterOptionsValue.vue';

const counterStore = useCounterOptionsStore()
const {count, squareCounter} = storeToRefs(counterStore) // Para destructurar state del store
const {increment, incrementBy} = counterStore // Para destructurar actions del store

</script>
<template>
        <h1>Pinia Options</h1>
        <h4>Counter: {{ count }}</h4>
        <h4>Square: {{ squareCounter }}</h4>
        <br>
        <button @click="increment()">+1</button>
        <button @click="incrementBy(2)">+2</button>
        <button @click="incrementBy(5)">+5</button>
        <button @click="counterStore.$reset()">Reset</button>

        <CounterOptionsValue/>
</template>


<style scoped>
button {
        margin-right: 5px;
}
</style>