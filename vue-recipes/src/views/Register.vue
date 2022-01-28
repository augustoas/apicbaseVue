<template>
  <div id="register">
    <div class="login-container">
      <h1>Register</h1>
      <div class="text-button-container">
        <input
          class="text"
          type="text"
          v-model="username"
          placeholder="Username"
        />
      </div>

      <div class="text-button-container">
        <input
          class="text"
          type="password"
          v-model="password"
          placeholder="Password"
        />
      </div>
      <div class="text-button-container">
        <input
          class="text"
          type="password"
          v-model="password2"
          placeholder="Confirm password"
        />
      </div>
      <div class="action-button" @click="register">Register</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      password2: "",
    };
  },
  methods: {
    register() {
      console.log("register CLICKED");
      const payload = {
        username: this.username,
        password: this.password,
        password2: this.password2,
      };
      axios
        .post("/api/register", payload)
        .then((response) => {
          console.log("REGISTER RESPONSE DATA", response.data);
          if (response.data.ok) {
            this.$router.push({ name: "Login" });
            //NOTIFICACION
          } else {
            console.log("Mostrar errores abajo");
            //MANEJO ERROR
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
#register {
  width: 70%;
  height: 70%;
  margin: auto;

  h1 {
    font-weight: 600;
    margin-bottom: 30px;
  }

  .login-container{
    padding: 20px;
    border: 1px solid;
  }

  .text-button-container {

  }

  .text-button-container {
    -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
    font-size: 14px;
    width: 150px;
    margin: auto;
    margin-bottom: 10px;

    input {
      margin-top: 0;
      border-radius: 5px;
      padding: 10px 38px 10px 10px;
      width: 100%;
      border: 1px solid #ececec;

      &:focus {
        outline: none;
      }

      &::-webkit-input-placeholder {
        color: #c4c0c0ab;
      }

      &::placeholder {
        color: #c4c0c0ab;
      }
  }
}

  .action-button {
    padding: 10px;
    background-color: #1c344c;
    width: 144px;
    border: 0px solid;
    /* border-radius: 25px; */
    font-size: 16px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    /* margin-top: 20px; */
    margin: auto;
    margin-top: 40px;
  }
}
</style>
