<template>
    <v-card>
      <v-card-title class="text-h5 textConfirmDelete">
        Are you sure you want to delete {{ name ? name : "No name" }}?
      </v-card-title>

      <v-card-actions class="d-flex justify-center">
        <v-btn color="green darken-2" text @click="deleteCard"> Ok </v-btn>
        <v-btn color="green darken-2" text @click="closeConfirmDelete">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
export default {
  name: "ConfirmDelete",
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    closeConfirmDelete() {
      this.$emit("closeConfirmDelete");
    },
    deleteCard() {
      this.$emit("deleteCard");
    },
  },
};
</script>

<style lang="scss" scoped>
.textConfirmDelete {
  text-align: center;
  word-break: normal;
}
</style>
