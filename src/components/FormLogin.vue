<template>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item label="E-mail">
      <a-input
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          },
        ]"
      />
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [{ required: true, message: 'Please input your Password!' }],
          },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button">
        Log in
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import firebase from "firebase/app";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values.email);
          firebase
            .auth()
            .signInWithEmailAndPassword(values.email, values.password)
            .then((response) => {
              // console.log(response.user.email);
              this.$store.commit("setUser", response.user);
              this.$store.commit("setUserMail", response.user.email);
              this.success(response.user.email);
              console.log(this.$store.isUserAuth);

            })
            .catch((error) => {
              console.log(error.message)
              this.$store.commit("setError", error.message);
              this.error(error.message);
            });
        }
      });
    },
     success(e) {
      this.$message.success(
        e,
        4,
      );
    },
    error(e) {
      this.$message.error(e,3);
    },
  },
};
</script>
