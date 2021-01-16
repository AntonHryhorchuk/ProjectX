<template>
  <div class="holder">
    <ul class="sidebar-list">
      <li
        class="sidebar-item"
        v-for="(title, index) in SideBarData"
        v-bind:key="index"
      >
        <span v-on:click="text" :id="title.ID">{{ title.Title }}</span>
        <hr noshade />
      </li>
    </ul>
  </div>
</template>

<script>

export default {

  props: ["SideBarData"],
  methods: {
    text: function(params) {
      console.log(params.target.id);
      this.$store.commit('SetGroup', params.target.id);
      console.log(this.$store.state.groupID);
      
    }
  }
};
</script>

<style>

.sidebar-item {
  cursor: pointer;
}
.sidebar-item:hover {
  filter: brightness(50%);
}
p {
  margin: 0;
}
</style>
