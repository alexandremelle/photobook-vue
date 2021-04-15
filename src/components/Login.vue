<template>
  <div>
    <form class="flex flex-col items-center" @submit.prevent="login">
      <div class="flex flex-col user">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username"
          >Nom d'utilisateur</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          v-model="username"
          id="userName"
        />
      </div>
      <div class="flex flex-col mt-10">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password"
          >Mot de passe</label
        >
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          v-model="password"
        />
      </div>
      <!-- eslint-disable -->
      <button class="btn-blue">Se connecter</button>
    </form>
    <div class="text-red-600">{{ error.message }}</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    username: "",
    password: "",
    email: "",
    error: "",
  }),
  methods: {
    ...mapActions({
      loginVue: "auth/login",
    }),
    async login() {
      try {
        await this.loginVue({
          username: this.username,
          password: this.password,
        });
        this.$router.push("/albums");
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
