<template>
  <v-app light>
    <v-toolbar color="cyan" light>
      <v-toolbar-title class="hidden-xs-only">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-form id="url-form" ref="form" @submit.prevent="getAudit">
        <v-text-field
          v-model="webpageName"
          placeholder="http://example.com"
          :rules="urlRules"
          required
        ></v-text-field>
        <v-btn @click="getAudit" icon>
          <v-icon>search</v-icon>
        </v-btn>
      </v-form>
    </v-toolbar>
    <v-content>
      <v-container text-xs-center>
        <v-progress-circular
          v-if="isLoading"
          indeterminate
          color="red"
        ></v-progress-circular>
        <h2 v-if="isError">
          Sorry, couldn't find the url you entered, try another one
        </h2>
        <nuxt></nuxt>
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
// audit data parsing server api endpoint
const API_ENDPOINT = 'http://localhost:8080/api/audit'
// basic url check
const URL_REG_EX = /^(https?:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/

export default {
  data() {
    return {
      fixed: false,
      title: 'Lighthouse Audit',
      isLoading: false, // true, while making an api request
      isError: false, // when a url not found or internal server error ocurred
      webpageName: '',
      urlRules: [
        input => !!input || 'Enter a url', // empty url field
        input => URL_REG_EX.test(input) || 'This url is invalid'
      ]
    }
  },
  methods: {
    // Requests audit data, if the url passes basic validation above
    async getAudit() {
      this.isError = false
      if (!this.$refs.form.validate()) {
        return
      }
      try {
        this.isLoading = true
        const result = await this.$axios.$get(
          API_ENDPOINT + '?url=' + this.webpageName
        )
        this.isLoading = false
        this.$store.commit('audit/fetchData', result)
      } catch (e) {
        this.isLoading = false
        this.isError = true
      }
    }
  }
}
</script>
<style>
#url-form > * {
  float: left;
}
</style>
