<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow mb-5">
    <router-link class="navbar-brand" tag='a' to="/">Authentication Ops</router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" tag="li">
          <router-link exact-active-class="active" class="nav-link" tag='a' to="/">Homepage</router-link>
        </li>
        <li class="nav-item">
          <router-link active-class="active" class="nav-link" tag='a' to="/about">About</router-link>
        </li>
      </ul>
      <ul class="navbar-nav my-2 my-lg-0" >
        <li class="nav-item">
          <a @click.prevent="logout" class="nav-link" :class="logoutClass" href="#">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
  export default {
    methods: {
      logout() {
        this.$store.dispatch('logout');
      }
    },
    computed: {
      logoutClass() {
        return {
          'd-none': !this.$store.getters.isAuthenticated
        }
      }
    }
  }
</script>
