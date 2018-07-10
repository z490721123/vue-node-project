<template>
  <section class="login  text-left">
    <div class="form" @keyup.enter="doLogin">
      <div class="input-group form-group">
        <span class="input-group-addon glyphicon glyphicon-user" id="basic-addon1"></span>
        <input type="text" class="form-control" id="userName" placeholder="用户名" aria-describedby="basic-addon1"  v-model.trim="name">
      </div>
      <div class="input-group form-group">
        <span class="input-group-addon glyphicon glyphicon-search" aria-hidden="true"></span>
        <input type="password" class="form-control" id="password" placeholder="密码" aria-describedby="basic-addon1" v-model.trim="pwd">
      </div>
      <button type="submit" class="btn btn-default form-control" @click="doLogin()">登陆</button>
      <div class="alert alert-danger" role="alert" v-if="this.info != ''">{{info}}</div>
    </div>

  </section>
</template>
<script>
  import {mapActions} from 'vuex'
  //import {set}  from '../../assets/js/cookieUtil'

  export default{
    data(){
    return {
      name: '',
      pwd: '',
      info: ''
    }
  },
  methods: {
    doLogin(){
      if (!this.name.length) return this.info = '请输入正常的用户名'
      if (!this.pwd.length) return this.info = '请输入正常的密码'
      console.log('1')
      this.$http.post('/api/login', {name: this.name.trim(), pwd: this.pwd.trim()}).then(
        response => {
          if(response.body.code == 0){
            this.$router.push({path: '/MainPage', query : {name: this.name}})
            return;
          }
          this.info = response.body.msg
          //console.log(this.body);

        },
        response => {
          this.info = response.body.msg
        }
      )
//      this.login({name: this.name, pwd: this.pwd})
//        .then(() => {
//        const date = new Date(Date.now() + 60000 * 30)
//        set('user', this.name, date, '/', window.location.hostname)
//        this.$router.push({path: '/console'})
//    })
//  .catch(msg => this.info = msg)
  },
  clearInfo(){
    this.info = ''
  },
  ...mapActions(['login'])
  },
  watch: {
    name: 'clearInfo',
      pwd: 'clearInfo'
  }
  }
</script>

