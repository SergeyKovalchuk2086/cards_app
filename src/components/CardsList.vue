<template>
  <div class="cards-list">
    <Card
      v-for="card in ALL_CARDS"
      :key="card._id"
      :card_data="card"
      @succDelete="succDelete"
    />
    <v-dialog v-model="successDelete" max-width="350px" :close-delay="3000">
      <SuccessfullyDeletedCard
        @succDelete="succDelete"
        @closeCuccessDelete="closeCuccessDelete"
      />
    </v-dialog>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';
import SuccessfullyDeletedCard from '@/components/SuccessfullyDeletedCard';

import { mapActions, mapGetters, mapMutations, mapState } from 'vuex';
export default {
  components: {
    Card,
    SuccessfullyDeletedCard,
  },
  name: 'CardsList',
  data() {
    return {
      successDelete: false,
    };
  },
  methods: {
    ...mapActions(['GET_CARDS', 'DELETE_CARD']),

    succDelete() {
      this.successDelete = !this.successDelete;
    },

    closeCuccessDelete() {
      this.successDelete = !this.successDelete;
    },
    // deleteCard(id) {
    //   this.DELETE_CARD(id);
    // },
    //  @deleteCard="deleteCard(card._id)"
  },
  computed: {
    ...mapGetters(['ALL_CARDS']),
  },
  mounted() {
    this.GET_CARDS();
  },
};
</script>

<style></style>
