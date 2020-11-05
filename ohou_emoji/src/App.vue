<template>
  <OHou />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import OHou from './components/OHou.vue';

@Options({
  components: {
    OHou,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100%;
  cursor: url(./assets/pointer.png),pointer;
}
</style>
