<template>
  <v-card >
    <v-card-title class="text-h5 textSuccessDelete">
      Passenger successfully deleted !
    </v-card-title>

    <v-card-actions class="d-flex justify-center">
      <v-btn color="green darken-2" text @click="closeCuccessDelete">
        Ok
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'SuccessfullyDeletedCard',
  methods: {
    closeCuccessDelete() {
      this.$emit('closeCuccessDelete');
    },
  },
};
</script>

<style lang="scss" scoped>
.textSuccessDelete {
  text-align: center;
  word-break: normal;
}
</style>
