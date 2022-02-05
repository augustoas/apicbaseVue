<template>
  <div id="recipes">
    <div class="recipes-container">
      <h1>Recipes</h1>
      <h2>
        Here you can create your favorite recipes with your favorite
        ingredients.
      </h2>

      <div class="header">
        <div class="add-recipe-button" @click="showRecipeModal">
          Create Recipe
        </div>
      </div>
      <h1 class="table-title" v-if="this.recipes.length > 0">My Recipes</h1>
      <div class="search-input" v-if="this.recipes.length > 0">
        <input type="text" v-model="search" placeholder="Search recipes" />
      </div>

      <div class="recipes-table" v-if="this.recipes.length > 0">
        <div class="table-rows" v-for="r in filteredRecipes" v-bind:key="r.id">
          <div class="item-container">
            <span class="item-title">{{ r.name }}</span>

            <div class="item-info">
              <div class="ingredients">
                <div class="no-ingredients" v-if="r.ingredients.length < 1">
                  0 ingredients added
                </div>
                <div
                  class="ingredients-list"
                  v-for="i in r.ingredients"
                  v-bind:key="i.id"
                >
                  <span>{{ i.name }}</span>
                  <span> {{ calculateAmount(i, r) }} {{ i.unit }}</span>
                  <span
                    class="action-button"
                    @click="
                      showItemModal({ edit: true, ingredient: i, recipe: r })
                    "
                    ><b-icon pack="fas" icon="edit" size="is-small"> </b-icon
                  ></span>
                  <span
                    class="action-button"
                    @click="
                      deleteIngredientFromRecipe({ ingredient: i, recipe: r })
                    "
                    ><b-icon pack="fas" icon="trash" size="is-small"> </b-icon
                  ></span>
                </div>
              </div>
            </div>

            <div class="actions">
              <span
                class="action-button"
                @click="showRecipeModal({ edit: true, recipe: r })"
                ><b-icon pack="fas" icon="edit" size="is-small"> </b-icon
              ></span>
              <span class="action-button" @click="deleteRecipe(r)"
                ><b-icon pack="fas" icon="trash" size="is-small"> </b-icon
              ></span>
              <span class="action-button" @click="addIngredient({ recipe: r })"
                ><b-icon pack="fas" icon="plus" size="is-small"> </b-icon
              ></span>
            </div>
            <span class="details-button" @click="recipeDetail(r)"
              >View Detail</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import RecipeModal from "@/components/RecipeModal";
import RecipeDetail from "@/components/RecipeDetail";
import addIngredientModal from "@/components/addIngredientModal";
import editIngredientRecipeModal from "@/components/editIngredientRecipeModal";

export default {
  name: "Recipes",
  components: {},
  data() {
    return {
      search: "",
    };
  },
  computed: {
    recipes() {
      return this.$store.state.recipes;
    },
    filteredRecipes() {
      return this.recipes.filter((recipe) => {
        return recipe.name.match(this.search);
      });
    },
    ingrec() {
      return this.$store.state.ingrec;
    },
  },

  methods: {
    deleteRecipe(r) {
      axios
        .delete("/api/recipe-delete/" + r.id)
        .then((response) => {
          console.log(response);
          const index = this.recipes.indexOf(r);
          this.recipes.splice(index, 1);
          this.$store.commit("setRecipes", this.recipes);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showRecipeModal(props) {
      if (props && props.edit) {
        var edit = props.edit;
      }
      if (props.recipe) {
        var r = props.recipe;
      }
      this.$buefy.modal.open({
        component: RecipeModal,
        active: true,
        parent: this,
        props: {
          edit: edit,
          recipes: this.recipes,
          recipe: r,
        },
      });
    },

    showItemModal(data) {
      console.log("updating ingredient", data);
      var ingrec = this.ingrec.find(
        (x) =>
          x.ingredient.id === data.ingredient.id &&
          x.recipe.id === data.recipe.id
      );

      console.log("ingrec", ingrec);

      this.$buefy.modal.open({
        component: editIngredientRecipeModal,
        active: true,
        parent: this,
        props: {
          ingrec: ingrec,
          ingrecs: this.ingrec,
        },
      });
    },
    addIngredient(props) {
      if (props.recipe) {
        var r = props.recipe;
      }
      this.$buefy.modal.open({
        component: addIngredientModal,
        active: true,
        parent: this,
        props: {
          recipe: r,
          recipes: this.recipes,
        },
      });
    },
    deleteIngredientFromRecipe(data) {
      console.log("data", data);

      var ingrec = this.ingrec.find(
        (x) =>
          x.ingredient.id === data.ingredient.id &&
          x.recipe.id === data.recipe.id
      );

      console.log("ingrec", ingrec);

      axios
        .delete("/api/ingredient-recipe-delete/" + ingrec.id)
        .then((response) => {
          if (response.data["ok"]) {
            console.log(response.data);

            const index = this.ingrec.indexOf(ingrec);
            this.ingrec.splice(index, 1);
            const index2 = data.recipe.ingredients.indexOf(data.ingredient);
            data.recipe.ingredients.splice(index2, 1);

            this.$store.commit("setIngredientsRecipes", this.ingrec);
            this.$store.commit("setRecipes", this.recipes);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    calculateAmount: function (i, r) {
      var ingrec = this.ingrec.find(
        (x) => x.ingredient.id === i.id && x.recipe.id === r.id
      );
      if (ingrec) return ingrec.r_amount;
    },

    recipeDetail(r) {
      this.$buefy.modal.open({
        component: RecipeDetail,
        active: true,
        parent: this,
        props: {
          recipe: r,
        },
      });
    },
  },

  mounted() {
    console.log("RECIPES MOUNTED");
    axios
      .get("/api/recipe-list")
      .then((response) => {
        const recipes = response.data;
        this.$store.commit("setRecipes", recipes);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/api/ingredient-list")
      .then((response) => {
        const ingredients = response.data;
        this.$store.commit("setIngredients", ingredients);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/api/ingrec-list")
      .then((response) => {
        const ingrec = response.data;
        console.log(ingrec, "INGREC");
        this.$store.commit("setIngredientsRecipes", ingrec);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped lang="scss">
#recipes {
  width: 100%;
  height: 100%;
  color: #1c344c;

  div.recipes-container {
    h1 {
      font-size: 30px;
    }

    h2 {
      font-size: 18px;
      margin-top: 30px;
    }

    .header {
      display: flex;
      margin: 10px;
      justify-content: center;

      .add-recipe-button {
        padding: 10px;
        background-color: #1c344c;
        width: 200px;
        border: 0px solid;
        font-size: 16px;
        font-weight: 600;
        color: white;
        cursor: pointer;
        margin-top: 20px;
      }
    }

    .table-title {
      font-size: 20px;
      margin-bottom: 20px;
    }

    div.recipes-table {
      margin: 5px;
      padding: 5px;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;

      .table-rows {
        margin: 10px;
        padding: 5px;
        background: white;
        border: 0px solid;
        border-radius: 5px;
        -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
        box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
      }

      .item-container {
        display: flex;
        width: 100%;
        margin: 10px 0px;
        flex-direction: column;
        min-width: 250px;
        height: 175px;
        position: relative;

        .item-title {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .item-info {
          display: flex;
          flex-direction: column;
        }

        .row-info {
          display: flex;
          width: 100%;
          margin: 3px;
        }

        .actions {
          display: flex;
          position: absolute;
          bottom: 5px;
          left: 0;
          right: 0;
          margin-left: auto;
          margin-right: auto;
          width: 80px;
        }

        .ingredients {
          width: 100%;
          overflow: scroll;
          max-height: 90px;

          .ingredients-headers {
            display: flex;
            width: 100%;
            place-content: space-around;
            margin-bottom: 5px;
          }

          .ingredients-list {
            display: flex;
            width: 100%;
            place-content: space-around;
            font-size: 14px;
            align-items: center;
          }

          .no-ingredients {
            margin-top: 20px;
            font-size: 12px;
          }
        }
      }

      .row-text {
        font-size: 16px;
        margin-left: 10px;
      }

      .action-button {
        align-self: center;
        margin: 5px;
      }

      .details-button {
        font-size: 12px;
        position: absolute;
        bottom: -10px;
        right: 100px;
      }
    }
  }
}
</style>
