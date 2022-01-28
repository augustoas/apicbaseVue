<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal-container modal-addIngredient">
        <header class="modal-header" id="modalTitle">
          <p>Add Ingredient</p>
          <span class="action-button" @click="close()">
            <b-icon pack="fas" icon="times" size="is-small"> </b-icon
          ></span>
        </header>

        <div class="ingredients-list" v-if="!selectedItem">
          <div
            class="ingredient"
            v-for="ing in ingredients"
            v-bind:key="ing.id"
            @click="selectItem(ing)"
          >
            {{ ing.name }}
          </div>
        </div>

        <div class="fields-container" v-if="selectedItem">
          <div class="input-container">
            <label class="modal-label"
              >{{ selectedItem.name }} amount ({{ selectedItem.unit }}):</label
            ><input class="modal-input" type="number" v-model="amount" />
          </div>
        </div>

        <footer class="modal-footer modal-footer-direccion">
          <button
            class="modal-button"
            :class="{
              'modal-button': true,
              disabled: !selectedItem || amount.length < 1,
            }"
            type="button"
            @click="addIngredient()"
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
  name: "addIngredientModal",
  props: {
    recipe: { type: Object, required: true },
  },

  data() {
    return {
      selectedItem: null,
      amount: "",
    };
  },

  computed: {
    ingredients() {
      return this.$store.state.ingredients;
    },
    ingrec() {
      return this.$store.state.ingrec;
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },

    selectItem(ing) {
      this.selectedItem = ing;
      this.step += 1;
    },

    addIngredient() {
      console.log("saveIngredient");

      const payload = {
        ingredient: this.selectedItem.id,
        recipe: this.recipe.recipe.id,
        r_amount: this.amount,
      };
      axios
        .post("/api/new-recipe-ingredient", payload)
        .then((response) => {
          if (response.data.ok) {
            console.log("RESPONSE DATA", response.data);
            this.ingrec.push(response.data.ingrec);
            this.$store.commit("setIngredientsRecipes", this.ingrec);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      this.$emit("close");
      window.location.reload();
    },
  },

  mounted() {
    console.log("mounted modal add ingredients");
    console.log("recipe", this.recipe);
  },
};
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 200;
}
.modal-container {
  background-color: #ffffff;
  position: relative;
  width: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  height: 300px;

  &.modal-ingredients {
    height: 460px;
  }
  &.modal-addIngredient {
    height: 230px;
  }
}

.modal-header {
  color: #1c344c !important;
  font-weight: 600 !important;
  font-size: 18px !important;
  line-height: 25px;
  display: flex;
  border-bottom: 1px solid #dddddd;
  padding: 15px;
  justify-content: space-between;
}

.fields-container {
  padding: 20px 20px 0px;
  align-items: center;
  display: grid;
}

.input-container {
  display: flex;
  flex-direction: column;
}

.modal-label {
  font-size: 13px;
  margin-bottom: 5px;
}

.modal-input {
  margin-top: 2px;
  margin-bottom: 10px;
  font-size: 11px;
  padding: 10px;
}

.modal-button {
  padding: 10px;
  background-color: #1c344c;
  color: white;
  font-weight: 600;
  border: none;
}

.selector-input {
  display: flex;
  .select-dropdown {
    background-color: turquoise;
  }
}

.disabled {
  background-color: #bababa;
}

.modal-footer {
  padding: 20px;
  display: flex;
  justify-content: flex-end;
}

.ingredients-list {
  margin: 15px;
}
</style>
