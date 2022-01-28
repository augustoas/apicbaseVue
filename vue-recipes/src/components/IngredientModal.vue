<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal-container modal-ingredients">
        <header class="modal-header" id="modalTitle">
          <p>New Ingredient</p>
          <span class="action-button" @click="close()">
            <b-icon pack="fas" icon="times" size="is-small"> </b-icon
          ></span>
        </header>
        <div class="fields-container">
          <div class="input-container">
            <label class="modal-label">Ingredient name:</label
            ><input class="modal-input" type="text" v-model="name" />
          </div>
          <div class="input-container">
            <label class="modal-label">Article ID:</label
            ><input class="modal-input" type="number" v-model="articleNumber" />
          </div>
          <div class="input-container">
            <label class="modal-label">Amount:</label>
            <input class="modal-input" type="number" v-model="amount" />
            <select class="select-dropdown" v-model="unitSelected">
              <option v-for="u in units" :value="u" v-bind:key="u">
                {{ u }}
              </option>
            </select>
          </div>

          <div class="input-container">
            <label class="modal-label">Cost:</label
            ><input class="modal-input" type="number" v-model="cost" />
          </div>
        </div>
        <footer class="modal-footer modal-footer-direccion">
          <button
            class="modal-button"
            :class="{ 'modal-button': true, disabled: checkDisabled }"
            type="button"
            :disabled="checkDisabled"
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
  name: "IngredientModal",
  props: {
    edit: { type: Boolean, required: false, default: false },
    ingredients: { type: Array, required: true },
    ingredient: { type: Object, required: false },
  },

  data() {
    return {
      units: ["gr", "kg", "cl", "l"],
      articleNumber: "",
      name: "",
      amount: "",
      cost: "",
      unitSelected: "",
    };
  },

  computed: {
    checkDisabled() {
      if (
        this.name.length < 1 ||
        this.amount.length < 1 ||
        this.cost.length < 1 ||
        this.unitSelected.length < 1 ||
        this.articleNumber.length < 1
      )
        return true;
      return false;
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },
    selectUnit(u) {
      console.log("select unit", u);
    },
    saveIngredient() {
      console.log("saveIngredient");
      const payload = {
        name: this.name,
        articleNumber: this.articleNumber,
        amount: this.amount,
        unit: this.unitSelected,
        cost: this.cost,
      };

      if (!this.edit) {
        axios
          .post("/api/ingredient-new", payload)
          .then((response) => {
            this.ingredients.push(response.data.ingredient);
            this.$store.commit("setIngredients", this.ingredients);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .patch("/api/ingredient-edit/" + this.ingredient.id, payload)
          .then((response) => {
            if (response.data.ok) {
              console.log("successss editing ingredient");
              payload["id"] = this.ingredient.id;
              const index = this.ingredients.indexOf(this.ingredient);
              this.ingredients.splice(index, 1);
              this.ingredients.push(payload);
            }
            this.$store.commit("setIngredients", this.ingredients);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      //window.location.reload()
      this.$emit("close");
    },
  },

  mounted() {
    console.log("mounted modal");
    if (this.edit) {
      this.name = this.ingredient.name;
      this.articleNumber = this.ingredient.articleNumber;
      this.cost = this.ingredient.cost;
      this.unitSelected = this.ingredient.unit;
      this.amount = this.ingredient.amount;
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/modals.scss";
</style>
