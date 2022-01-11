<template>
  <v-card class="mx-auto mt-5 mb-5" max-width="344">
    <v-img
      :src="imageUrl"
      height="200px"
      width="290px"
      class="mx-auto"
      contain
    ></v-img>

    <v-card-title>
      {{ card_data.name ? card_data.name : "No name" }}</v-card-title
    >

    <v-card-subtitle>
      {{ card_data.trips ? card_data.trips : "0" }} miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-dialog v-model="confirmDelete" max-width="450px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="orange lighten-2" text v-bind="attrs" v-on="on">
            Delete
          </v-btn>
        </template>
        <ConfirmDelete
          :name="card_data.name"
          @closeConfirmDelete="closeConfirmRemove()"
          @deleteCard="deleteCard()"
        />
      </v-dialog>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-subtitle>Established in {{ established }}</v-card-subtitle>
        <v-card-text> Headquaters : {{ head_quaters }} </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

import ConfirmDelete from "@/components/ConfirmDelete";
import SuccessfullyDeletedCard from "@/components/SuccessfullyDeletedCard";

export default {
  name: "Card",
  components: {
    ConfirmDelete,
    SuccessfullyDeletedCard,
  },
  props: {
    card_data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      show: false,
      imageUrl: "",
      title: "",
      established: "",
      head_quaters: "",
      confirmDelete: false,
      successDelete: false,
    };
  },
  methods: {
    ...mapActions(["DELETE_CARD"]),
    ...mapMutations(["REMOVE_IN_STATE"]),

    //достаём данные
    setInfoCard() {
      this.card_data.airline.forEach((item) => {
        this.imageUrl = item.logo;
        this.title = item.country;
        this.established = item.established;
        this.head_quaters = item.head_quaters;
      });
    },

    //удалить карточку
    deleteCard() {
      this.DELETE_CARD(this.card_data._id).then((repsonse) => {
        if (repsonse.status === 200) {
          this.REMOVE_IN_STATE(this.card_data._id);
          this.$emit("succDelete");
        }
      });

      this.successDelete = !this.successDelete;
    },

    //закрыть окно подтверждения удаления карточки
    closeConfirmRemove() {
      this.confirmDelete = !this.confirmDelete;
    },
  },
  mounted() {
    this.setInfoCard();
  },
};
</script>

<style scoped></style>
