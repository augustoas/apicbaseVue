<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal-container modal-recipe">
        <header class="modal-header" id="modalTitle">
          <p>Edit Recipe Ingredient</p>
          <span class="action-button" @click="close()">
            <b-icon pack="fas" icon="times" size="is-small"> </b-icon
          ></span>
        </header>
        <div class="fields-container">
          <div class="input-container">
            <label class="modal-label"
              >Ingredient: {{ ingrec.ingredient.name }}</label
            ><input class="modal-input" type="text" v-model="amount" />
          </div>
        </div>
        <footer class="modal-footer modal-footer-direccion">
          <button
            class="modal-button"
            :class="{ 'modal-button': true, disabled: amount.length < 1 }"
            type="button"
            :disabled="amount.length < 1 || amount < 0"
            @click="saveIngredient()"
          >
            {{ "Confirm" }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  name: "editIngredientRecipeModal",
  props: {
    ingrec: { type: Object, required: false },
    ingrecs: { type: Array, required: true },
  },

  data() {
    return {
      amount: "",
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },
    saveIngredient() {
      const payload = {
        r_amount: this.amount,
      };
      axios
        .patch("/api/ingredient-recipe-edit/" + this.ingrec.id, payload)
        .then((response) => {
          if (response.data.ok) {
            this.ingrec.r_amount = this.amount;
            this.$store.commit("updateIngredientRecipe", this.ingrec);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.$emit("close");
    },
  },

  mounted() {
    this.amount = this.ingrec.r_amount;
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/modals.scss";
</style>
