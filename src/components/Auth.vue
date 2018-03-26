
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Auth-Comp',
  render (h) {
    console.log(this.$slots)
    if (this.auths.indexOf(this.auth) !== -1) {
      return this.$slots.default
    } else {
      return null
    }
  },
  props: {
    auth: String
  },
  computed: {
    ...mapGetters(['auths'])
  }
}
</script>
