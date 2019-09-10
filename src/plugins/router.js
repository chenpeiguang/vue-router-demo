let Vue
class Router {
  static install(_Vue) {
    Vue = _Vue
    Vue.mixin({
      beforeCreate() {
        // 这里的options是指vue里面的options
        this.$options.router && this.$options.router.init()
      }
    })
  }

  constructor(options) {
    this.options = options
    console.log(options)
    this.routerMap = {}
    this.app = new Vue({
      data: {
        currentHash: '/'
        }
    })
  }

  init() {
    // 监听hash
    this.bindEvents()
    // 处理路由
    this.createRouterMap()
    // 组件切换
    this.initComponent()
  }

  bindEvents() {
    if (this.options.mode !== 'history') {
      window.addEventListener("hashchange", this.changeFn.bind(this), false)
    }
    window.addEventListener("load", this.changeFn.bind(this), false)
  }

  changeFn() {
    // "#/rr"
    const hash = window.location.hash.slice(1) || '/'
    this.app.currentHash = hash
  }

  createRouterMap() {
    this.options.routes.forEach(item => {
      this.routerMap[item.path] = item
    })
  }

  initComponent() {
    const _this = this
    Vue.component("router-view", {
      render: h => {
        const component = this.routerMap[this.app.currentHash].component
        return h(component)
      }
    })
    Vue.component("router-link", {
      props: {
        to: String
      },
      render(h) {
        return h(`${_this.options.mode === 'history' ? 'span' :'a'}`, {
          attrs: {
            href: "#" + this.to
            },
            on: {
              click: this.onClickLink
            }
          },
          [this.$slots.default]
        )
      },
      methods: {
        onClickLink() {
          if (_this.options.mode === 'history') {
          console.log('click', this.to)
          history.pushState(null,null, this.to)
          _this.app.currentHash = this.to
        }
        }
      }
    })
  }
}

export default Router