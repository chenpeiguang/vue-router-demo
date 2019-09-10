<template>
  <div class="hello">
    <h1>index</h1>
    <p>{{$store.state.count}}</p>
    <button @click="add">commit</button>
    <button @click="add2">commit传参</button>
    <button @click="dispatch">dispatch</button>
    <p>getters:{{$store.getters.score}}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  // props: {
  //   msg: String
  // }
  created() {
    console.log(this.$store)
  },
  methods: {
    add() {
      this.$store.commit('increment')
    },
    add2() {
      this.$store.commit('increment2',2)
    },
    dispatch() {
      this.$store.dispatch('increment3')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
