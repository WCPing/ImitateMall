<template>
    <div class="floor">
      <div class="floor-title">{{floorTitle}}</div>
      <div class="floor-annomaly">
        <div class="floor-one">
          <img :src="floorDate1.image" width="100%">
        </div>
        <div>
          <div class="floor-two">
            <img :src="floorDate2.image" width="100%">
          </div>
          <div>
            <img :src="floorDate3.image" width="100%">
          </div>
        </div>
      </div>

      <div class="floor-rule">
        <div v-for="(item, index) in floorDate.slice(3)" :key="index">
          <img :src="item.image" width="100%">
        </div>
      </div>
    </div>
</template>
<script>
export default {
    props: ['floorTitle', 'floorDate'],
    data() {
      return {
        floorDate1: {},
        floorDate2: {},
        floorDate3: {}
      }
    },
    watch: {
      floorDate: function (val) {
        this.floorDate1 = this.floorDate[0] || {}
        this.floorDate2 = this.floorDate[1] || {}
        this.floorDate3 = this.floorDate[2] || {}
      }
    },
}
</script>
<style lang="scss" scoped>
.floor{
    .floor-title{
      text-align: center;
      font-size: 14px;
      height: 30px;
      line-height: 30px;
    }
    .floor-annomaly{
      display: flex;
      background-color: #ffffff;
      border-bottom: 1px solid #ddd;
    }
    .floor-rule{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      background-color: #ffffff;
    }
    .floor-rule div{
       -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 10rem;
        border-bottom: 1px solid #ddd;
        &:nth-child(odd) {
          border-right: 1px solid #ddd;
        }
    }
  }
</style>

