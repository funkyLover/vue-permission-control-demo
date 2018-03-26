
<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <input type="text" name="username" v-model="username">
      <input type="password" name="password" v-model="password">
      <button type="submit">login</button>
    </form>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import axios from 'axios'
import { mapMutations } from 'vuex'
import { LOGIN } from '@/store'
import routesMap from '@/router/routes'
const Layout = () => import('@/page/Layout')
const Dashboard = () => import('@/page/Dashboard')

export default {
  name: 'Page-Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  async mounted () {
    var token = Cookie.get('vue-login-token')
    if (token) {
      var { data } = await axios.post('/api/loginByToken', {
        token: token
      })
      if (data.ok) {
        this[LOGIN](data.permission)
        Cookie.set('vue-login-token', data.token)
        this.updateRouter(data.routes)
      }
    }
  },
  methods: {
    ...mapMutations([
      LOGIN
    ]),
    async login () {
      var { data } = await axios.post('/api/login', {
        username: this.username,
        password: this.password
      })
      if (data.ok) {
        this[LOGIN](data.permission)
        Cookie.set('vue-login-token', data.token)
        this.updateRouter(data.routes)
      } else {
        alert('登录错误')
      }
    },
    async updateRouter (routes) {
      const routers = [
        {
          path: '/',
          component: Layout,
          children: [
            {
              path: '',
              name: 'Dashboard',
              component: Dashboard
            }
          ]
        }
      ]
      routes.forEach(r => {
        routers[0].children.push({
          name: r.name,
          path: r.path,
          component: () => routesMap[r.component]
        })
      })
      this.$router.addRoutes(routers)
      this.$router.push('/')
    }
  }
}
</script>
