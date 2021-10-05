<template>
  <v-layout column>
    <v-row class="pa-6">
      <v-col cols="12" sm="6">
        <v-sheet rounded="lg" min-height="88vh" color="secondary">
          <v-expansion-panels>
            <v-expansion-panel class="tertiary">
              <v-expansion-panel-header>
                Ajouter un ingredient
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                  v-model="newIngredient.name"
                  class="pa-3"
                  outlined
                  dense
                  label="name"
                  hide-details
                  clearable
                  color="primary"
                ></v-text-field>
                <v-text-field
                  v-model="newIngredient.description"
                  class="pa-3"
                  outlined
                  dense
                  label="description"
                  hide-details
                  clearable
                  color="primary"
                ></v-text-field>
                <v-row align="center" justify="space-around" class="pa-3">
                  <v-btn
                    class="mx-auto primary"
                    @click="addIngredient(newIngredient)"
                    ><v-icon left> mdi-plus </v-icon>Ajouter</v-btn
                  >
                </v-row>
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
                <div v-for="step in ingredients" :key="step.IGD_id">
                  <v-list-item
                    :id="step.IGD_id"
                    exact
                    :to="'/ingredients?id=' + step.IGD_id"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="step.IGD_name"
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
          <h3 class="pa-3">Ingredient</h3>
          <v-text-field
            v-model="selectedIngredient.IGD_name"
            v-if="selectedIngredient != null"
            class="pa-3 height"
            outlined
            dense
            label="name"
            hide-details
            color="primary"
          ></v-text-field>
          <v-text-field
            v-model="selectedIngredient.IGD_description"
            v-if="selectedIngredient != null"
            class="pa-3 height"
            outlined
            dense
            label="description"
            hide-details
            color="primary"
          ></v-text-field>
          <v-row
            v-if="selectedIngredient != null"
            align="center"
            justify="space-around"
            class="pa-3"
          >
            <v-btn
              class="mx-auto cinqnary"
              @click="modifyIngredient(selectedIngredient.IGD_id)"
              ><v-icon left> mdi-pencil </v-icon>modifier</v-btn
            >
            <v-btn
              class="mx-auto quatenary"
              @click="deleteIngredient(selectedIngredient.IGD_id)"
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
  name: "Ingredients",

  components: {},

  data: () => ({
    newIngredient: {
      name: "",
      description: "",
    },
    newStepTitle: "",
    currentStep: "",
    selectedItem: 1,
    ingredients: null,
    selectedIngredient: null,
  }),

  mounted() {
    this.processRoute();
    this.getIngredients();
  },

  watch: {
    $route() {
      this.processRoute();
    },
  },

  methods: {
    // Process route
    processRoute() {
      console.log("ingredients", this.ingredients);
      if ("id" in this.$route.query && this.ingredients != null) {
        const selectedID = parseInt(this.$route.query.id);
        const step = this.ingredients.find(
          (step) => step.IGD_id === selectedID
        );
        this.selectedIngredient = { ...step } ?? null;
      } else {
        this.selectedIngredient = null;
      }
    },
    // Get all ingredients
    async getIngredients() {
      await this.$http
        .get("http://localhost:5000/api/ingredients")
        .then((response) => {
          this.ingredients = JSON.parse(JSON.stringify(response.data[0]));
          this.processRoute();
        });
    },
    // Adding new ingredient
    async addIngredient(newIngredient) {
      await this.axios
        .post("http://localhost:5000/api/ingredients", {
          name: newIngredient.name,
          description: newIngredient.description,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.newIngredient.name = "";
      this.newIngredient.description = "";
      this.ingredients = this.getIngredients();
    },
    // Modify currently ingredient
    async modifyIngredient(id_ingredient) {
      console.log(id_ingredient);
      await this.axios
        .put(`/ingredients/${id_ingredient}`, {
          name: this.selectedIngredient.IGD_name,
          description: this.selectedIngredient.IGD_description,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.ingredients = this.getIngredients();
    },

    // Delete currently ingredient by id
    async deleteIngredient(id_ingredient) {
      await this.axios
        .delete(`/ingredients/${id_ingredient}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.ingredients = this.getIngredients();
      this.$router.push("ingredients");
    },
  },
};
</script>