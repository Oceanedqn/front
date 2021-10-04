<template>
  <v-layout column>
    <v-row class="pa-4">
      <v-col cols="12" sm="12" class="pt-0 pb-1">
        <v-sheet color="secondary" rounded="lg" min-height="5vh"></v-sheet>
      </v-col>
      <v-col cols="12" sm="6" class="pt-0">
        <v-sheet rounded="lg" min-height="85vh" color="secondary">
          <v-text-field
            v-model="newModelTitle"
            @click:append="addProcess"
            @keyup.enter="addProcess"
            class="pa-3"
            outlined
            label="Add process"
            append-icon="mdi-plus"
            hide-details
            clearable
            color="primary"
          ></v-text-field>
          <v-card
            class="pa-3 overflow-y-auto secondary"
            elevation="0"
            max-height="79vh"
          >
            <v-list rounded class="pt-0" color="tertiary">
              <v-subheader>process</v-subheader>
              <v-list-item-group v-model="selectedItem" color="primary">
                <div v-for="proc in process" :key="proc.MDL_id">
                  <v-list-item
                    @click="getStepById"
                    :id="proc.MDL_id"
                    exact
                    :to="'/process?id=' + proc.MDL_id"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="proc.MDL_name"
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

      <v-col cols="12" sm="6" class="pt-0">
        <v-sheet min-height="85vh" rounded="lg" color="secondary">
          <h3 class="pa-3">Process</h3>
          <v-text-field
            class="pa-3"
            outlined
            dense
            label="selectedProcess.PRC_name"
            hide-details
            color="primary"
          ></v-text-field>
          <v-text-field
            class="pa-3"
            outlined
            dense
            label="selectedProcess.PRC_description"
            hide-details
            color="primary"
          ></v-text-field>
          <v-select
            class="pa-3"
            :items="collections"
            label="Step"
            hide-details
            outlined
            dense
          ></v-select>
          <v-text-field
            class="pa-3"
            outlined
            dense
            label="selectedProcess.CST_step_number"
            hide-details
            color="primary"
          ></v-text-field>
          <v-text-field
            class="pa-3"
            outlined
            dense
            label="selectedProcess.CST_validation_test"
            hide-details
            color="primary"
          ></v-text-field>

          <v-row align="center" justify="space-around" class="pa-3">
            <v-btn class="mx-auto cinqnary"
              ><v-icon left> mdi-pencil </v-icon>modifier</v-btn
            >
            <v-btn class="mx-auto quatenary" @click="getStepById"
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
  name: "Process",
  newModelTitle: "",
  selectedItem: 1,

  components: {},

  data: () => ({
    collections: ["coll1", "coll2", "coll3", "coll4"],
    models: ["proc1", "proc2", "proc3", "proc4"],
    selectedModel: null,
    process: [
      {
        MDL_id: 1,
        MDL_name: "process name",
        MDL_description: "description",
        MDL_uht_price: 45,
        CLT_id: 2,
        PRC_id: 2,
      },
      {
        MDL_id: 2,
        MDL_name: "process name2",
        MDL_description: "description2",
        MDL_uht_price: 46,
        CLT_id: 3,
        PRC_id: 3,
      },
    ],
  }),

  methods: {
    processRoute() {
      if ("id" in this.$route.query && this.process != null) {
        const selectedID = parseInt(this.$route.query.id);
        const model = this.process.find((model) => model.STP_id === selectedID);
        this.selectedModel = model ?? null;
      } else {
        this.selectedModel = null;
      }
    },
    addProcess() {
      console.log("addProcess");
    },
  },
};
</script>