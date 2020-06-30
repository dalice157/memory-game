<template>
  <div class="wrap">
    <h1>我是首頁</h1>
    <button class="btn btn-primary btn-ms" @click="handleOnClick">點擊</button>
    <div class="msg">{{ message }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return {
        message:'get Data!',
      }
    },
    methods:{
      handleOnClick: function(){
        this.message = 'get Data Now!!'
        console.log(this.message)
      }
    },
    beforeCreate: function(){
      console.log("beforeCreate data資料： "+this.$data.message)
    },
    created: function(){
      console.log("created data資料： "+this.$data.message)
    },
    beforeMount: function(){
      console.log("beforeMount data資料： "+this.$data.message)
    },
    mounted: function(){
      console.log("mounted data資料： "+this.$data.message)
    }
  }
</script>
<style lang="scss" scoped>
.wrap {
  text-align: center;
  padding: 20px;
}
.msg {
  margin-top: 20px;
  font-size: 20px;
}

.btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &.btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
  &.btn-ms {
    margin-top: 20px;
  }
  &:not(:disabled):not(.disabled) {
    cursor: pointer;
  }
  &:focus {
    border: none;
  }
}
</style>