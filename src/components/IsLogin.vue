<template>
    <div class="mail-wrapper" v-if="this.$store.state.userMail" >
        <p class="mail-wrapper__text">{{this.$store.state.userMail}}</p>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Akaya+Telivigala&display=swap');

 .mail-wrapper{
     display: flex;
     align-items: center;
     justify-content: center;
     width: 250px;
     height: 30px;
     position: fixed;
     top: 80px;
     right: 10px;
     background-color: rgb(39, 207, 39);
     opacity: .4;
     border-radius: 5px;
     &__text{
         font-family: 'Akaya Telivigala', cursive;
         font-size: 18px;
         margin-bottom: 0px;
     }
 }
</style>