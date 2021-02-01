<template>
  <div
    class="content-wrapper content-wrapper--sidebar content-wrapper--fix-header"
  >
    <Card v-bind:CardData="filteredItems"></Card>
    <a-back-top />
  </div>
</template>

<script>
import Card from "@/components/Card";
import products from "../db/data.json";

export default {
  components: {
    Card,
  },
  data() {
    return {
      cards: products.data,
      select_id: "",
    };
  },
  computed: {
    filteredItems() {
      return this.cards.filter((item) => {
        return item.group_id == this.$store.state.groupID;
      });
    },
  },
};
</script>
