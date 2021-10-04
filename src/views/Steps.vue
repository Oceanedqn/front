<template>
  <v-layout column>
    <v-row class="pa-6">
      <v-col cols="12" sm="6">
        <v-sheet rounded="lg" min-height="88vh" color="secondary">
          <v-expansion-panels>
            <v-expansion-panel class="tertiary">
              <v-expansion-panel-header>
                Ajouter un produit
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                  v-model="newStepTitle"
                  @click:append="addStep"
                  @keyup.enter="addStep"
                  class="pa-3"
                  outlined
                  label="Add step"
                  append-icon="mdi-plus"
                  hide-details
                  clearable
                  color="primary"
                ></v-text-field>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-card
            class="pa-3 overflow-y-auto secondary"
            elevation="0"
            max-height="79vh"
          >
            <v-list rounded class="pt-0" color="tertiary">
              <v-list-item-group v-model="selectedItem" color="primary">
                <div v-for="step in steps" :key="step.STP_id">
                  <v-list-item
                    @click="getStepById"
                    :id="step.STP_id"
                    exact
                    :to="'/steps?id=' + step.STP_id"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="step.STP_name"
                      ></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="pt-2"></v-divider>
                </div>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="6">
        <v-sheet min-height="88vh" rounded="lg" color="secondary">
          <h3 class="pa-3">Step</h3>
          <v-text-field
            v-model="selectedStep.STP_name"
            v-if="selectedStep != null"
            class="pa-3 height"
            outlined
            dense
            label="name"
            hide-details
            color="primary"
          ></v-text-field>
          <v-row
            v-if="selectedStep != null"
            align="center"
            justify="space-around"
            class="pa-3"
          >
            <v-btn
              class="mx-auto cinqnary"
              @click="modifyStep(selectedStep.STP_id)"
              ><v-icon left> mdi-pencil </v-icon>modifier</v-btn
            >
            <v-btn
              class="mx-auto quatenary"
              @click="deleteStep(selectedStep.STP_id)"
              ><v-icon left> mdi-delete </v-icon>supprimmer</v-btn
            >
          </v-row>
        </v-sheet>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  name: "Steps",

  components: {},

  data: () => ({
    newStepTitle: "",
    currentStep: "",
    selectedItem: 1,
    steps: null,
    selectedStep: null,
  }),

  mounted() {
    this.processRoute();
    this.getSteps();
  },

  watch: {
    $route() {
      this.processRoute();
    },
  },

  methods: {
    // Process route
    processRoute() {
      console.log("steps", this.steps);
      if ("id" in this.$route.query && this.steps != null) {
        const selectedID = parseInt(this.$route.query.id);
        const step = this.steps.find((step) => step.STP_id === selectedID);
        this.selectedStep = { ...step } ?? null;
      } else {
        this.selectedStep = null;
      }
    },
    // Get steps
    async getSteps() {
      await this.$http
        .get("http://localhost:5000/api/steps")
        .then((response) => {
          this.steps = JSON.parse(JSON.stringify(response.data[0]));
          this.processRoute();
        });
    },
    // Adding step
    async addStep() {
      await this.axios
        .post("http://localhost:5000/api/steps", {
          name: this.newStepTitle,
        })
        .then(function (response) {
          console.log(response);
          this.newStepTitle = "";
        })
        .catch(function (error) {
          console.log(error);
        });
      this.steps = this.getSteps();
    },
    // Modify currently step
    async modifyStep(id_step) {
      console.log(id_step);
      await this.axios
        .put(`/steps/${id_step}`, {
          name: this.selectedStep.STP_name,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.steps = this.getSteps();
    },
    // Delete step
    async deleteStep(id_step) {
      await this.axios
        .delete(`/steps/${id_step}`)
        .then(function (response) {
          console.log(response);
          // this.steps = this.steps.filter((step) => step.STP_id !== id_step);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.steps = this.getSteps();
      this.$router.push("Steps");
    },
  },
};
</script>