<template>
  <section class="userdata">
    <div class="text-left">
      <div class="form-inline panel panel-primary">
        <div class="panel-heading">查询</div>
        <div class="panel-body">
          <div class="form-group" @keyup.enter="doSearch">
            <label for="exampleInputEmail1">手机号码：</label>
            <input type="tel" class="form-control" id="telephone" placeholder="手机号码" v-model.trim="telephone">
            <button  class="btn btn-default form-control" @click="doSearch()">查询</button> <label class="alert alert-danger" role="alert" v-if="this.info != ''">{{info}}</label>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr>
              <td>ID</td><td>手机号码</td><td>会员到期时间</td><td>控制端数量</td><td>注册IP</td><td>注册时间</td>
            </tr>

          </thead>
          <tbody v-if="this.user_list">
            <template v-for="(list, index) in this.user_list">
              <tr>
                <td>{{list.a_pid}}</td>
                <td>{{list.a_account}}</td>
                <td v-if="list.a_expiretime == '1970-01-01 08:00:00'">非会员</td>
                <td v-else>{{list.a_expiretime}}</td>
                <td>{{list.a_agentcount}}</td>
                <td v-if="list.r_ip == null">无</td>
                <td v-else>{{list.r_ip}}</td>
                <td v-if="list.r_regtime == '1970-01-01 08:00:00'">无</td>
                <td v-else>{{list.r_regtime}}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div class="form-inline panel panel-primary">
        <div class="panel-heading">重置密码</div>
        <div class="panel-body">
          <div class="form-group" @keyup.enter="doResetPwd">
            <label for="exampleInputEmail1">重置密码：</label>
            <input type="text" class="form-control" id="resetpwd" placeholder="输入密码" v-model.trim="resetpwd">
            <button  class="btn btn-default form-control" @click="doResetPwd()">确定</button>
            <div class="alert alert-danger" role="alert" v-if="this.pwdinfo != ''">{{pwdinfo}}</div>
          </div>
        </div>
      </div>

      <div class="form-inline panel panel-primary">
        <div class="panel-heading">会员到期时间</div>
        <div class="panel-body">
          <div class="form-group" @keyup.enter="resetExpiretime">
            <label for="exampleInputEmail1">会员到期时间：</label>
            <el-date-picker v-model.trim="expiretime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd hh:mm:ss" ></el-date-picker>
            <!--<input type="time" class="form-control" id="expiretime" placeholder="日期格式" v-model.trim="expiretime">-->
            <button  class="btn btn-default form-control" @click="resetExpiretime()">确定</button>
            <div class="alert alert-danger" role="alert" v-if="this.expinfo != ''">{{expinfo}}</div>
          </div>
        </div>
      </div>

      <div class="form-inline panel panel-primary">
        <div class="panel-heading">控制端数量</div>
        <div class="panel-body">
          <div class="form-group" @keyup.enter="resetAgentcount">
            <label for="exampleInputEmail1">控制端数量：</label>
            <input type="number" class="form-control" id="agentcount" placeholder="数量" v-model.trim="agentcount">
            <button  class="btn btn-default form-control" @click="resetAgentcount()">确定</button>
            <div class="alert alert-danger" role="alert" v-if="this.ageinfo != ''">{{ageinfo}}</div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
<script>
  export default {
    name: 'UserData',
    data(){
      return {
        pid: '',
        name: '',
        info: '',
        telephone: '',
        user_list: [],
        resetpwd: '',
        expiretime: '',
        agentcount: '',

        pwdinfo: '',
        expinfo: '',
        ageinfo: '',
      }
    },

    methods: {
      doSearch()
      {
        console.log('doSearch')
        this.$http.post('/api/search', {telephone: this.telephone}).then(
          response => {
            //this.info = response.body.data;
	    if(response.body.code == 0){
                this.user_list = response.body.data;
	    }
	    else{
		this.user_list = [];
	    }

            console.log(this.user_list);

          },
          response => {
            this.info = response.body.msg;
            this.user_list = [];
          }
        )
      },
      doResetPwd()
      {
        if(this.user_list.length <= 0){
          console.log("this.user_list.length <= 0");
          return;
        }
        this.$http.post('/api/resetpwd', {pwd: this.resetpwd, pid: this.user_list[0].a_pid}).then(
          response => {
            if(response.body.code == 0){
              this.user_list[0].a_password = this.resetpwd
              this.resetpwd = ''
              this.pwdinfo = ''
            }
            else{
              this.pwdinfo = response.body.msg;
            }
          },
          response => {
            this.pwdinfo = 'error'
          }
        )
      },
      resetExpiretime()
      {
        if(this.user_list.length <= 0){
          console.log("this.user_list.length <= 0");
          return;
        }
        this.$http.post('/api/resetexpiretime', {expiretime: this.expiretime, pid: this.user_list[0].a_pid}).then(
          response => {
            if(response.body.code == 0){
              this.user_list[0].a_expiretime = this.expiretime
              this.expiretime = ''
              this.expinfo = ''
            }
            else{
              this.expinfo = response.body.msg;
            }
          },
          response => {
            this.expinfo = 'error'
          }
        )
      },
      resetAgentcount()
      {
        if(this.user_list.length <= 0){
          console.log("this.user_list.length <= 0");
          return;
        }
        this.$http.post('/api/resetagentcount', {agentcount: this.agentcount, pid: this.user_list[0].a_pid}).then(
          response => {
            if(response.body.code == 0){
              this.user_list[0].a_agentcount = this.agentcount
              this.agentcount = ''
              this.ageinfo = ''
            }
            else{
              this.ageinfo = response.body.msg;
            }
          },
          response => {
            this.ageinfo = 'error'
          }
        )
      },
      clearInfo(){
        this.info = ''
        this.pwdinfo = '',
        this.expinfo = '',
        this.ageinfo = ''
      }
    },
    watch: {
      telephone: 'clearInfo',
        resetpwd: 'clearInfo',
        expiretime: 'clearInfo',
        agentcount: 'clearInfo'
    }
  }
</script>
