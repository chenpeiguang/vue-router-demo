let Vue
class Store {
  static install(_Vue) {
    Vue = _Vue
    // console.log(_Vue)
    // _Vue.prototype.$store = this
    Vue.mixin({
      beforeCreate() {
        // 这里的options是指vue里面的options
        if (this.$options.store) {
          this.$options.store.init()
          Vue.prototype.$store = this.$options.store
        }
      }
    })
  }

  constructor(options) {
    this.$options = options
    this.state = this.$options.state
    this.$mutations = this.$options.mutations
    this.$actions = this.$options.actions
    options.getters && this.getters(options.getters)
  }

  commit(method, arg ='') {
    // console.log('commit')
    this.$mutations[method](this.state, arg)
  }

  dispatch(action) {
    // console.log('dispatch',action)
    this.$actions[action](this)
  }

  getters(getters) {
    // console.log('getters')
    this.getters = {}
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state)
        }
      })
    })
  }

  init() {
    this.initState()
  }

  initState() {
    // console.log('init state')
    this.app = new Vue({
      data: {
        state: this.$options.state
      }
    })
  }


}

export default Store