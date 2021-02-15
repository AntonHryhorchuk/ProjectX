<template>
    <div class="social">
        <ul class="social__list">
            <li class="social__list-item"><a href="https://www.facebook.com/" target="_blank"><a-icon type="facebook" :style="style"/></a></li>
            <li class="social__list-item"><a href="https://www.instagram.com/" target="_blank"><a-icon type="instagram" :style="style" /></a></li>
            <li class="social__list-item"><a href="tel:+380985468073"><a-icon type="phone" :style="style"/></a></li>
            <li class="social__list-item"><a-icon type="contacts" :style="style"/></li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            style: { fontSize: '25px', color: '#fff' },
        }
    }
}
</script>
<style lang="scss" scoped>
 .social{
     position: fixed;
     left: -137px;
     top: 100px;
     width: 180px;
     height: 50px;
     background-color: darkgrey;
      display: flex;
     align-items: center;
     justify-content: space-around;
     &:hover{
        left: 0px;
        transition: all 1s ease; 
     }
     &:hover .social__list-item:last-child{
         filter: brightness(10%);
         transition: all 1s ease;
     }
     &__list{
         width: 100%;
     display: flex;
     align-items: center;
     justify-content: space-around;
     flex-direction: row;
     margin-bottom: 0px;
     &-item{
         &:hover{
             filter: brightness(40%);
         }
     }
     }
 }
 
</style>