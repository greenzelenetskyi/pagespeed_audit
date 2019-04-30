<template>
  <v-container>
    <v-layout justify-center align-center>
      <v-flex xs12>
        <Table></Table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Table from '../components/Table.vue'
export default {
  components: {
    Table
  }
}
</script>
