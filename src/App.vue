<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app color="primary">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Outils </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="primary"
      app
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>KillerBee</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn class="pr-10" icon v-if="isConnected" :to="Home">
        Logout<v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn class="pr-10" icon v-if="!isConnected" to="/connect">
        Login<v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-layout><router-view /></v-layout>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    isConnected: false,
    items: [
      { title: "Home", icon: "mdi-format-list-checks", to: "/" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
      // { title: "Models", icon: "mdi-sitemap", to: "/models" },
      // { title: "Process", icon: "mdi-pencil", to: "/process" },
      { title: "Ingredients", icon: "mdi-book-open", to: "/ingredients" },
      { title: "Steps", icon: "mdi-clipboard-list", to: "/steps" },
    ],
  }),
};
</script>
