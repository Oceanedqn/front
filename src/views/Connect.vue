<template>
  <v-layout column>
    <v-row>
      <v-col cols="4" sm="6" class="mx-auto mt-5">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-form class="ma-6" ref="form" lazy-validation>
            <v-text-field
              v-model="config.name"
              outlined
              label="username"
              required
            ></v-text-field>

            <v-text-field
              v-model="config.password"
              outlined
              label="password"
              required
              :type="show1 ? 'text' : 'password'"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn color="primary" class="ma-4" @click="login(config)">
              Login
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  name: "Connect",

  components: {},

  data: () => ({
    config: {
      name: "",
      password: "",
    },
    show1: false,
    password: "Password",
    // rules: {
    //   required: (value) => !!value || "Required.",
    //   username: (v) => !!v || "username is required",
    // },
  }),
  methods: {
    async login(config) {
      console.log(config);
      await this.axios
        .post("http://localhost:5000/api/connect", {
          name: config.name,
          password: config.password,
        })
        .then(function (response) {
          localStorage.setItem("token", response.data.token);
          // localStorage.setItem("isConnected", true);
          // console.log(localStorage);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>