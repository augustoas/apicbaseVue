<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal-container modal-recipe">
        <header class="modal-header" id="modalTitle">
          <p v-if="!edit">New Recipe</p>
          <p v-if="edit">Edit Recipe</p>
          <span class="action-button" @click="close()">
            <b-icon pack="fas" icon="times" size="is-small"> </b-icon
          ></span>
        </header>
        <div class="fields-container">
          <div class="input-container">
            <label class="modal-label">Recipe name:</label
            ><input class="modal-input" type="text" v-model="name" />
          </div>
        </div>
        <footer class="modal-footer modal-footer-direccion">
          <button
            class="modal-button"
            :class="{ 'modal-button': true, disabled: name.length < 1 }"
            type="button"
            :disabled="name.length < 1"
            @click="saveRecipe()"
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
  name: "RecipeModal",
  props: {
    edit: { type: Boolean, required: false, default: false },
    recipes: { type: Array, required: true },
    recipe: { type: Object, required: false },
  },

  data() {
    return {
      name: "",
    };
  },

  methods: {
    close() {
      this.$emit("close");
    },

    updateRecipes() {
      console.log("update Recipes");
      this.$store.commit("setRecipes", this.recipes);
    },

    saveRecipe() {
      console.log("saveRecipe");
      const payload = {
        name: this.name,
      };

      if (!this.edit) {
        axios
          .post("/api/recipe-new", payload)
          .then((response) => {
            this.recipes.push(response.data.recipe);
            this.$store.commit("setRecipes", this.recipes);
          })
          .catch((error) => {
            //MANEJO ERROR DE LOGIN
            console.log(error);
          });
      } else {
        axios
          .patch("/api/recipe-edit/" + this.recipe.recipe.id, payload)
          .then((response) => {
            if (response.data.ok) {
              console.log("successss editing");
              payload["id"] = this.recipe.id;
              const index = this.recipes.indexOf(this.recipe);
              this.recipes.splice(index, 1);
              this.recipes.push(payload);
            }
            this.$store.commit("setRecipes", this.recipes);
          })
          .catch((error) => {
            //MANEJO ERROR DE LOGIN
            console.log(error);
          });
      }
      this.$emit("close");
    },
  },

  created() {
    this.$eventBus.$on("updateRecipes", this.updateRecipes);
  },

  mounted() {
    console.log("mounted modal");
    console.log(this.recipe)
    if (this.edit) {
      this.name = this.recipe.name;
    }
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/modals.scss";
</style>
