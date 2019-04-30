<template>
  <v-data-table
    :headers="headers"
    :items="auditData"
    class="audits-table"
    item-key="title"
    hide-actions
    expand
  >
    <template v-slot:items="props">
      <tr>
        <td>{{ props.item.title }}</td>
        <td>
          <template>
            <v-container grid-list-xs text-xs-center grid-list-xl>
              <v-layout row>
                <v-flex xs9 align-self-center>
                  <!-- background color shows the room for improvement in % -->
                  <v-progress-linear
                    :value="scoreInPercents(props.item.score)"
                    background-color="error"
                    color="white"
                  ></v-progress-linear>
                </v-flex>
                <v-flex xs2 align-self-center>
                  <span>{{ props.item.displayValue }}</span>
                </v-flex>
                <v-flex align-self-center>
                  <v-icon @click="props.expanded = !props.expanded"
                    >expand_more</v-icon
                  >
                </v-flex>
              </v-layout>
            </v-container>
          </template>
        </td>
      </tr>
    </template>
    <template v-slot:expand="props">
      <v-card flat>
        <v-card-text>{{ props.item.description }}</v-card-text>
      </v-card>
    </template>
  </v-data-table>
</template>

<script>
const HUNDRED_PERCENT = 100
export default {
  data() {
    return {
      // table headers
      headers: [
        {
          text: 'Opportunity',
          sortable: false,
          value: 'title'
        },
        {
          text: 'Estimated savings',
          sortable: true,
          value: 'score'
        }
      ],
      // expand icon
      isArrowRotated: false
    }
  },
  computed: {
    auditData() {
      return this.$store.state.audit.data
    }
  },
  methods: {
    // converts to percent for the progress bar
    scoreInPercents(score) {
      return HUNDRED_PERCENT * score
    }
  }
}
</script>
