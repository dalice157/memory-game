<template>
  <div class="box">
    <div class="overlay"></div>
    <div class="content">
      <div class="title">你猜錯了，換 {{user}} 猜。</div>
      <button @click="closeBox()">關閉</button>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Lightbox',
    props: ['user', 'closeBox']
  }
</script>
<style lang="scss" scoped>
@import '../../scss/var';
.box {
	top: -100%;
  width: 100%;
  overflow: hidden;
	.overlay {
		position: fixed;
		left: 0; right: 0; top: 0; bottom: 0;
		height: 100%;
		background-color: rgba(#000, 0.6);
	}
	
	.content {
		margin: auto;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		width: 400px;
		height: 200px;

		text-align: center;
		
		background-color: rgba(#333, 0.9);
		
		border-radius: 10px;
		box-shadow: 5px 5px 20px rgba(Black, 0.8);
		
		padding: 1em;
    
		
		.title {
			font-size: 1.8em;
			padding: 0.5em;
		}
		
		.score {
			padding: 0.5em;
		}
		
		button {
			margin-top: 1.0em;
			
			background-color: #444;
			padding: 5px 20px;
			border-radius: 4px;
			border: 1px solid #555;
			color: $white;
			
			font-size: 1.4em;
			
		}
	}
}

@media only screen and (min-width: 321px) and (max-width: 768px) {
  .box {
    .content {
      width: 90%;
    }
  }
} 

@media only screen and (max-width: 321px) {
  .box {
    .content {
      width: 90%;
    }
  }
}
</style>