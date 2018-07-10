
<template>
  <div>
    <nav class="navbar navbar-default navbar-static-top" role="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">管理系统</a>
        </div>
        <p class="navbar-text navbar-right">{{ this.$route.query.name }}, 欢迎您</p>
      </div>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <ul id="main-nav" class="nav nav-tabs nav-stacked" style="">
            <li class="active">
              <a href="#">
                <i class="glyphicon glyphicon-th-large"></i>
                菜单
              </a>
            </li>
            <li><a href="#" @click="doTest('/MainPage/UserData')"><i class="glyphicon glyphicon-user"></i>用户管理</a></li>
          </ul>
        </div>
        <div class="col-md-10">
        <router-view></router-view>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  //import {set}  from '../../assets/js/cookieUtil'

  export default{
    data(){
      return {
        name: '',

      }
    }
    ,
    methods: {
      doTest(url)
      {
        console.log(url);
        this.$router.push({path: url, query : {name: this.$route.query.name}})
      }
    }
  }
</script>

