<template>
  <v-layout column>
    <div class="about pa-6">
      <h1>This is a Home page</h1>
      <v-row>
        <v-col class="mt-6" v-for="co in connect" :key="co" cols="4">
          <v-card height="200"><v-btn></v-btn></v-card>
        </v-col>
      </v-row>
    </div>
  </v-layout>
</template>

<script>
export default {
  name: "Home",

  components: {},

  data: () => ({
    connect: [
      {
        currentStatus: "production",
      },
      {
        currentStatus: "test",
      },
      {
        currentStatus: "recherche",
      },
    ],
  }),
};
</script>