
const Koa = require('koa')
const koaBody = require('koa-body')
const router = require('koa-router')()
const app = new Koa()

router.post('/login', koaBody(),
  (ctx) => {
    ctx.body = JSON.stringify({
      ok: 1,
      token: '123456',
      routes: [
        {
          name: 'page1',
          path: '/page1',
          component: 'page1'
        }, {
          name: 'page2',
          path: '/page2',
          component: 'page2'
        }
      ]
    })
  }
)

router.post('/loginByToken', koaBody(),
  (ctx) => {
    if (ctx.request.body.token === '123456') {
      ctx.body = JSON.stringify({
        ok: 1,
        token: '123456',
        routes: [
          {
            name: 'page1',
            path: '/page1',
            component: 'page1'
          }, {
            name: 'page2',
            path: '/page2',
            component: 'page2'
          }
        ],
        permission: ['canShowHello']
      })
    } else {
      ctx.body = JSON.stringify({ ok: 0 })
    }
  }
)

app.use(router.routes())

app.listen(3000)
