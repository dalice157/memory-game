<template>
  <div class="wrap">
    <div class="btnWrap">
      <button class="btn" @click="resetGame()">重新開始</button>
    </div>
    <div class="info">
      <div class="label">
        <span class="title">A組：</span>
        <span class="value">{{ scoreA }}</span>
      </div>
      <div class="label">
        <span class="title">B組：</span>
        <span class="value">{{ scoreB }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: ['scoreA','scoreB', 'resetGame']
}
</script>

<style lang="scss" scoped>
@import '../../scss/var';
.wrap {
  text-align: center;
	padding-bottom: 20px;
	border-bottom: 1px solid #555;
}
.info {
  display: flex;
  justify-content: center;
  align-items: center; 
  .label {
    font-size: 22px;
    &:after {
      content: '|';
      padding-left: 20px;
      padding-right: 20px;
    }
    &:last-child:after {
        content: '';
        padding: 0;
      }
    .title {
      display: inline-block;
      font-weight: 700;
      margin-right: 4px;
    }
  }
  .value {
    color: $red;
  }
}

.btnWrap {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.btn{
  position: relative;
	padding-left: 20px;
  padding-right: 20px;
  font-size: 16px;
	height: 40px;
	text-align: center;
  font-weight: 600;
	color: #FFF;
	text-decoration: none;
	line-height: 40px;
	font-family: 'Oswald', Helvetica;
	display: inline-block;
  text-shadow: -1px -1px 0 #5e0b13;
	background: #931f2b;
	border: 1px solid #931f2b;
	background-image: linear-gradient(top, #931f2b, #5e0b13);

	border-radius:5px;
	box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset, 0 4px 0 #613035, 0 4px 2px rgba(0, 0, 0, .5);

  &:hover {
    background: #6d141d;
    background-image:linear-gradient(top, #c9545f, #45161a);
  }

  &:active {
    box-shadow: 0 1px 0 rgba(255, 255, 255, .5) inset, 0 -1px 0 rgba(255, 255, 255, .1) inset;
    top:5px;
  }

  &:active:before{
    top: -11px;
    bottom: -5px;
    content: "";
  }

  &:focus {
    outline: 0;
  }
}
</style>