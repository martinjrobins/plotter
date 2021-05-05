<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawerRight"
      width="240"
      app
      clipped
      dark
      disable-resize-watcher
      fixed
      right
      style="background-color: #f4f4f4;"
    >
      <div class="pa-4">
        <h2 class="mb-3">
          Help
        </h2>
        <p>For technical support please contact the DAFNI team on:</p>
        <p><a href="mailto:support@dafni.ac.uk">support@dafni.ac.uk</a></p>
      </div>
    </v-navigation-drawer>
    <v-app-bar
      fixed
      dense
      app
      clipped-right
      clipped-left
      style="background-color: #121a24; border: 0px !important;"
    >
      <!-- <v-app-bar-nav-icon
        class="ma-0 pa-0"
        color="#fff"
        :ripple="false"
        @click.stop="drawer = !drawer"
      /> -->
      <div class="logo">
        <v-img
          :contain="true"
          position="left center"
          src="ui/dafni-logo-white.png"
          alt="DAFNI logo"
          width="122"
          height="30"
        />
      </div>
      <!-- <v-btn
        icon
        text
        class="ma-0"
        color="#fff"
        @click.stop="drawerRight = !drawerRight"
      >
        <v-icon :ripple="false" color="#fff">
          help
        </v-icon>
      </v-btn> -->
    </v-app-bar>
    <v-main>
      <v-container fluid style="border: 0px;">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    drawerRight: false,
  }),
}
</script>
<style lang="scss">
.v-app-bar {
  box-shadow: none !important;
  .v-btn--icon {
    color: $color-white !important;
  }
}
.v-toolbar__content,
.v-toolbar__extension {
  padding-left: 8px !important;
}
.v-application {
  background-color: #fafafa !important;
}
.logo {
  display: flex;
  align-items: center;
  margin: 0 70px 0 16px;
}
</style>
