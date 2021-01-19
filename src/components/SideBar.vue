<template>
  <div class="holder">
    <ul class="sidebar-list">
      <li
        class="sidebar-item"
        v-for="(title, index) in SideBarData"
        v-bind:key="index"
        @click="active = active === title ? null :title"
      >
        <span v-on:click="text" :id="title.ID" :class="active === title ? 'active' : ''">{{ title.Title }}</span>
        <hr noshade />
      </li>
    </ul>
  </div>
</template>

<script>


export default {
data(){
  return{
active: null,
  };
},
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
.active{
  color: red;
}
</style>
