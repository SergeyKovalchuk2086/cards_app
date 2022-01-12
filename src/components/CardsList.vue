<template>
  <div class="cards-list" >
    <main class="d-flex flex-column" width="400">
      <Card
        v-for="card in ALL_CARDS"
        :key="card._id"
        :card_data="card"
        @succDelete="succDelete"
      />
      <!-- окно успешного удаления -->
      <v-dialog v-model="successDelete" max-width="350px">
        <SuccessfullyDeletedCard @closeCuccessDelete="closeCuccessDelete" />
      </v-dialog>
    </main>

    <footer>
      <div ref="infinitescrolltrigger" id="scoll-trigger"></div>
    </footer>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import SuccessfullyDeletedCard from "@/components/Modal/SuccessfullyDeletedCard";

import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  components: {
    Card,
    SuccessfullyDeletedCard,
  },
  name: "CardsList",
  data() {
    return {
      successDelete: false,
      page: 0,
    };
  },
  methods: {
    ...mapActions(["GET_CARDS", "DELETE_CARD"]),

    succDelete() {
      this.successDelete = !this.successDelete;
    },

    //закрыть окно подтверждения при удалении
    closeCuccessDelete() {
      this.successDelete = !this.successDelete;
    },

    //загрузка данных с rest api при скролле страницы
    setLoadingObserver() {
      const loadingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.page++;
            this.GET_CARDS(this.page);
          }
        });
      });
      loadingObserver.observe(this.$refs.infinitescrolltrigger);
    },
  },
  computed: {
    ...mapGetters(["ALL_CARDS"]),
  },
  mounted() {
    this.setLoadingObserver();
  },
};
</script>

<style scoped>
</style>
