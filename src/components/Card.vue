<template>
  <v-card class="mx-auto mt-5 mb-5" max-width="344">
    <v-img
      :src="imageUrl"
      height="200px"
      width="290px"
      class="mx-2"
      contain
      alt="Sorry :("
    ></v-img>

    <v-card-title>
      {{ card_data.name ? card_data.name : "No name" }}</v-card-title
    >

    <v-card-subtitle>
      Trips - {{ card_data.trips ? card_data.trips : "0" }}
    </v-card-subtitle>

    <v-card-actions>
      <transition
        appear
        name="slide-y-transition"
        :duration="{ enter: 5000, leave: 8000 }"
      >
        <v-dialog
          v-model="confirmDelete"
          max-width="450px"
          transition="scale-transition"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="orange lighten-2" text v-bind="attrs" v-on="on">
              Delete
            </v-btn>
          </template>
          <!-- окно подтверждения удаления -->
          <ConfirmDelete
            :name="card_data.name"
            @closeConfirmDelete="closeConfirmRemove()"
            @deleteCard="deleteCard()"
          />
        </v-dialog>
      </transition>
      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition >
      <div v-show="show" class="popupText">
        <v-divider></v-divider>
        <v-card-title>Airline name - {{ airlineName }}</v-card-title>
        <v-card-subtitle>Country - {{ airlineCountry }}</v-card-subtitle>
        <v-card-text class="pb-0"
          >Established in {{ established }}.</v-card-text
        >
        <v-card-text class="cardText">
          Headquaters : {{ head_quaters }}.
        </v-card-text>
        <v-card-text>"{{ slogan }}" </v-card-text>
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
      airlineName: "",
      airlineCountry: "",
      established: "",
      head_quaters: "",
      slogan: "",
      confirmDelete: false,
      successDelete: false,
    };
  },
  methods: {
    ...mapActions(["DELETE_CARD"]),
    ...mapMutations(["REMOVE_IN_STATE"]),

    //достаём данные и заполняем карточку
    setInfoCard() {
      this.card_data.airline.forEach((item) => {
        this.imageUrl = item.logo;
        this.airlineName = item.name;
        this.airlineCountry = item.country;
        this.established = item.established;
        this.head_quaters = item.head_quaters;
        this.slogan = item.slogan;
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

<style scoped>
.popupText {
  max-width: 306px;
}

::v-deep .v-card__text {
  padding-top: 0;
}

::v-deep .v-card__title {
  word-break: normal;
}
</style>
