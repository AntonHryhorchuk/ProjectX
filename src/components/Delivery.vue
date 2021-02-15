<template>
  <div>
     <h2>Lorem ipsum dolor sit amet.</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae natus
      cupiditate ratione vel consectetur provident quis. Repudiandae in quaerat
      et?
    </p>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt laudantium
      error, cupiditate impedit labore necessitatibus sint perspiciatis esse
      asperiores, est sed? Tenetur modi veniam aliquid maxime nesciunt facilis
      tempore dolorum.
    </p>
    <h2>Lorem ipsum dolor sit amet consectetur adipisicing.</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
      repellendus quaerat minima sed natus numquam quas iure id expedita ad
      quibusdam, corrupti deserunt mollitia eius suscipit quidem culpa
      consequuntur magnam reiciendis atque ratione nostrum. Eaque cumque
      inventore quibusdam, adipisci atque incidunt ad dolore reprehenderit ipsam
      unde rem doloremque, veritatis delectus?
    </p>
    
  </div>
</template>
<script>

export default {
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
  },
};
</script>
