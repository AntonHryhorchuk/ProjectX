<template>
  <div class="login">
    <div class="button-wrapper">
      <button class="button-wrapper__button">
        <icon-login class="button-wrapper__button-icon" />
      </button>
      <div class="button-wrapper__linnk-holder">
        <a class="button-wrapper__linnk-holder--registration">вход</a>
        <a class="button-wrapper__linnk-holder--enter">регистрация</a>
      </div>
    </div>
  </div>
</template>

<script>
import IconLogin from "../assets/icons/IconLogin.vue";
export default {
  components: { IconLogin },
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  position: fixed;
  top: 200px;
  right: -127px;
  width: 180px;
  background-color: rgb(95, 92, 92);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  &:hover .button-wrapper__button-icon {
    transform: rotate(180deg);
    transition: all 1s ease;
  }
  &:hover {
    right: 0;
    transition: all 1s ease;
  }
  &__button {
    background-color: darkgrey;
    height: 50px;
   
  }
  &__linnk-holder {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 15px;
    text-transform: uppercase;
  }
}
</style>
