<template>
  <v-layout column>
    <v-row class="pa-6">
      <v-col cols="12" sm="6">
        <v-sheet rounded="lg" min-height="88vh" color="secondary">
          <v-expansion-panels>
            <v-expansion-panel class="tertiary">
              <v-expansion-panel-header>
                Ajouter un model
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                  v-model="newModel.name_mdl"
                  class="pa-3"
                  outlined
                  dense
                  label="name"
                  hide-details
                  :rules="rules"
                  clearable
                  color="primary"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="newModel.description"
                  class="pa-3"
                  outlined
                  dense
                  :rules="rules"
                  label="description"
                  hide-details
                  clearable
                  required
                  color="primary"
                ></v-text-field>
                <v-text-field
                  v-model="newModel.price"
                  class="pa-3"
                  outlined
                  dense
                  :rules="rules"
                  label="price"
                  hide-details
                  clearable
                  color="primary"
                  required
                ></v-text-field>
                <v-select
                  v-model="newModel.id_clt"
                  class="pa-3"
                  :items="collections"
                  item-text="CLT_name"
                  item-value="CLT_id"
                  label="Collections"
                  hide-details
                  outlined
                  dense
                ></v-select>
                <v-select
                  v-model="newModel.id_prc"
                  :items="process"
                  item-text="PRC_name"
                  item-value="PRC_id"
                  class="pa-3"
                  label="Process"
                  hide-details
                  dense
                  outlined
                ></v-select>
                <v-row align="center" justify="space-around" class="pa-3">
                  <v-btn class="mx-auto primary" @click="addModel(newModel)"
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
                <div v-for="model in models" :key="model.MDL_id">
                  <v-list-item
                    :id="model.MDL_id"
                    exact
                    :to="'/models?id=' + model.MDL_id"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="model.MDL_name"
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
          <h3 class="pa-3">Model {{ selectedModel }}</h3>
          <v-text-field
            v-if="selectedModel != null"
            v-model="selectedModel.MDL_name"
            class="pa-3 height"
            outlined
            dense
            label="name"
            hide-details
            color="primary"
          ></v-text-field>
          <v-text-field
            v-if="selectedModel != null"
            v-model="selectedModel.MDL_description"
            class="pa-3"
            outlined
            dense
            label="description"
            hide-details
            color="primary"
          ></v-text-field>
          <v-text-field
            v-if="selectedModel != null"
            v-model="selectedModel.MDL_uht_price"
            class="pa-3"
            outlined
            dense
            label="price"
            hide-details
            color="primary"
          ></v-text-field>
          <v-select
            v-if="selectedModel != null"
            class="pa-3"
            :items="collections"
            label="Collections"
            v-model="selectedModel.CLT_id"
            item-text="CLT_name"
            item-value="CLT_id"
            hide-details
            outlined
            dense
          ></v-select>
          <v-select
            v-if="selectedModel != null"
            v-model="selectedModel.PRC_id"
            :items="process"
            item-text="PRC_name"
            item-value="PRC_id"
            class="pa-3"
            label="Process"
            hide-details
            dense
            outlined
          ></v-select>
          <v-row
            v-if="selectedModel != null"
            align="center"
            justify="space-around"
            class="pa-3"
          >
            <v-btn
              class="mx-auto cinqnary"
              @click="modifyStep(selectedModel.MDL_id)"
              ><v-icon left> mdi-pencil </v-icon>modifier</v-btn
            >
            <v-btn
              class="mx-auto quatenary"
              @click="deleteStep(selectedModel.MDL_id)"
              ><v-icon left> mdi-delete </v-icon>supprimmer</v-btn
            >
          </v-row>
          <v-divider></v-divider>
          <h3 class="pa-3">Ingredients {{ selected }}</h3>
          <v-checkbox
            v-if="selectedModel != null"
            v-model="selected"
            class="pa-3"
            label="John"
            value="John"
          ></v-checkbox>
          <v-checkbox
            v-if="selectedModel != null"
            class="pa-3"
            v-model="selected"
            label="Jacob"
            value="Jacob"
          ></v-checkbox>
        </v-sheet>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  name: "Models",

  components: {},

  data: () => ({
    selected: ["John"],
    newModel: {
      name_mdl: "",
      description: "",
      price: null,
      id_clt: null,
      id_prc: null,
    },
    selectedItem: 1,
    models: null,
    selectedModel: null,
    rules: [(v) => !!v || "Field is required"],
    collections: null,
    process: null,
  }),

  mounted() {
    this.processRoute();
    this.getModels();
    this.getProcess();
    this.getCollections();
  },

  watch: {
    $route() {
      this.processRoute();
    },
  },

  methods: {
    processRoute() {
      if ("id" in this.$route.query && this.models != null) {
        const selectedID = parseInt(this.$route.query.id);
        const model = this.models.find((model) => model.MDL_id === selectedID);
        this.selectedModel = { ...model } ?? null;
        console.log(this.selectedModel);
      } else {
        this.selectedModel = null;
      }
    },
    async getModels() {
      await this.$http
        .get("http://localhost:5000/api/models")
        .then((response) => {
          this.models = JSON.parse(JSON.stringify(response.data[0]));
          this.processRoute();
          this.getProcess();
          this.getCollections();
        });
    },
    async getCollections() {
      await this.$http
        .get("http://localhost:5000/api/collections")
        .then((response) => {
          this.collections = JSON.parse(JSON.stringify(response.data[0]));
          this.processRoute();
        });
    },
    async getProcess() {
      await this.$http
        .get("http://localhost:5000/api/process")
        .then((response) => {
          this.process = JSON.parse(JSON.stringify(response.data[0]));
          this.processRoute();
        });
    },
    async addModel(newModel) {
      console.log(newModel);
      console.log(this.process);
      const proc = this.process.find((proc) => proc.PRC_id === newModel.id_prc);
      console.log(proc);
      console.log("MES DATASSSS", newModel);
      await this.axios
        .post("http://localhost:5000/api/models", {
          name_mdl: newModel.name_mdl,
          description: newModel.description,
          price: newModel.price,
          id_clt: newModel.id_clt,
          id_prc: newModel.id_prc,
        })
        .then(function (response) {
          console.log(response);

          // this.newModel = {
          //   name_mdl: "",
          //   description: "",
          //   price: null,
          //   id_clt: null,
          //   id_prc: null,
          // };
        })
        .catch(function (error) {
          console.log(error);
        });
      this.models = this.getModels();
    },
    async modifyStep(id_step) {
      await this.axios
        .put(`/models/${id_step}`, {
          name: this.selectedModel.MDL_name,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.models = this.getModels();
    },

    async deleteStep(id_step) {
      await this.axios
        .delete(`/models/${id_step}`)
        .then(function (response) {
          console.log(response);
          // this.models = this.models.filter((step) => step.MDL_id !== id_step);
        })
        .catch(function (error) {
          console.log(error);
        });
      this.models = this.getModels();
      this.$router.push("models");
    },
  },
};
</script>