<template>
  <a-form :form="form" @submit="handleSubmit">
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
    <a-form-item v-bind="formItemLayout" label="Phone Number">
      <a-input
        v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: 'Please input your phone number!' }],
          },
        ]"
        style="width: 100%"
      >
        <a-select
          slot="addonBefore"
          v-decorator="['prefix', { initialValue: '+380' }]"
          style="width: 70px"
        >          
        </a-select>
      </a-input>
    </a-form-item>
    <a-form-item label="Password" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: validateToNextPassword,
              },
              {
                min: 6,
                message: 'must be 6 or more characters',
              },
            ],
          },
        ]"
        type="password"
      />
    </a-form-item>
    <a-form-item label="Confirm Password" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: compareToFirstPassword,
              },
              {
                min: 6,
                message: 'must be 6 or more characters',
              },
            ],
          },
        ]"
        type="password"
        @blur="handleConfirmBlur"
      />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit">
        Register
      </a-button>
    </a-form-item>
    
  </a-form>
</template>

<script>
import firebase from "firebase/app";

export default {
  data() {
    return {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            firebase
            .auth()
            .createUserWithEmailAndPassword(values.email, values.password)
            .then((response) => {
              console.log("Success! ", response);
              this.success(response.message);
            })
            .catch((error) => {
              console.log("Failed!", error);
              this.error(error.message);
            });
          this.form.resetFields();
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("Two passwords that you enter is inconsistent!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
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
