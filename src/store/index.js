import Vue from "vue"
import Store from "../plugins/store"

Vue.use(Store)

const store = new Store({
  state: {
    count: 0
  },
  getters: {
    score: state => {
      return state.count + 10
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    increment2 (state, num) {
      state.count+= num
    },
  },
  actions: {
    increment3 (context) {
      console.log('4')
      context.commit('increment')
    }
  }
})

export default store