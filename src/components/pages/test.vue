<template>
    <div>
        <p v-for="index in 20" :key="index">hello world</p>
        <span @click="backTop">回到顶部</span>
    </div>
</template>
<script>
import TWEEN from '@/util/tween.js'
export default {
    mounted() {

    },
  methods: {
  
      backTop() {
          var Tween = {

              Linear: function(t, b, c, d) { //匀速运动，想要实现其他的效果可以使用tween的其他方法
                return c * t / d + b; 
              }
            }

            Math.tween = Tween;

            var t = 1;
            const b = document.documentElement.scrollTop; // 滚动条目前距离页面顶部的高度
            const c = 50;
            const d = 5;

            const setInt = setInterval(()=>{
              t--;
              // console.log(b)
              if(document.documentElement.scrollTop == 0){clearInterval(setInt)}
              // console.log(t);
              const backTop = Tween.Linear(t,b,c,d);
              console.log(backTop);
              document.documentElement.scrollTop = backTop;
            },20)

          }

      }
}
</script>
<style lang="scss" scoped>

</style>
