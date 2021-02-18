<template>
  <div class="holder">
    <ul class="sidebar-list">
      <li
        class="sidebar-item slide-in-left menu-items"
        v-for="(title, index) in SideBarData"
        :key="index"
        @click="active = active === title ? null :title"
      >
        <span v-on:click="text" :id="title.ID" :class="active === title ? 'active' : ''">{{ title.Title }}</span>
        <hr noshade />
      </li>
    </ul>
  </div>
</template>

<script>
import "../styles/SideBarStyles.scss"

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
      this.SideBarData.forEach(element => {
        if(element.ID===this.$store.state.groupID)
        this.$store.commit('SetGroupName', element.Title);
      });
      // console.log(this.$store.state.groupID);
      // console.log(this.$store.state.groupName);
      
    }
  }
};
</script>


