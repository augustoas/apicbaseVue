<template>
  <div id="recipes">
    <div class="recipes-container">
      <h1>Recipes</h1>
      <h2>
        Here you can make your favorite recipes with your favourites ingredients
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
                <div
                  class="ingredients-list"
                  v-for="i in r.ingredients"
                  v-bind:key="i.id"
                >
                  <span>{{ i.name }}</span>
                  <span> {{ i.r_amount }} {{ i.unit }}</span>
                  <span
                    class="action-button"
                    @click="showItemModal({ edit: true, ingredient: i })"
                    ><b-icon pack="fas" icon="edit" size="is-small"> </b-icon
                  ></span>
                  <span
                    class="action-button"
                    @click="deleteIngredientFromRecipe({ ingredient: i })"
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
            <span class="details-button" @click="RecipeDetail(r)"
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
      return this.recipesList.filter((recipe) => {
        return recipe.name.match(this.search);
      });
    },
    ingrec() {
      return this.$store.state.ingrec;
    },
    recipesList() {
      var auxRecipes = [];
      for (var r in this.recipes) {
        var aux = {};
        aux["recipe"] = this.recipes[r];
        aux["name"] = this.recipes[r].name;
        aux["ingredients"] = [];
        for (var ir in this.ingrec) {
          if (this.recipes[r].id === this.ingrec[ir].recipe.id) {
            var ingAux = {
              id: this.ingrec[ir].ingredient.id,
              ingrec_id: this.ingrec[ir].id,
              name: this.ingrec[ir].ingredient.name,
              unit: this.ingrec[ir].ingredient.unit,
              cost: this.ingrec[ir].ingredient.cost,
              amount: this.ingrec[ir].ingredient.amount,
              r_amount: this.ingrec[ir].r_amount,
            };
            aux["ingredients"].push(ingAux);
          }
        }
        auxRecipes.push(aux);
      }
      return auxRecipes;
    },
  },

  methods: {
    deleteRecipe(r) {
      axios
        .delete("/api/recipe-delete/" + r.recipe.id)
        .then((response) => {
          console.log(response);
          console.log("r", r);
          const index = this.recipes.indexOf(r);
          this.recipes.splice(index, 1);
          this.$store.commit("setRecipes", this.recipes);
        })
        .catch((error) => {
          //MANEJO ERROR DE LOGIN
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
    showItemModal(recipe) {
      console.log("updating ingredient", recipe);
      var ingrec = this.ingrec.filter((obj) => {
        return obj.id === recipe.ingredient.ingrec_id;
      });

      this.$buefy.modal.open({
        component: editIngredientRecipeModal,
        active: true,
        parent: this,
        props: {
          ingrec: ingrec[0],
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
        },
      });
    },
    deleteIngredientFromRecipe(recipe) {
      var ingrec = this.ingrec.filter((obj) => {
        return obj.id === recipe.ingredient.ingrec_id;
      });
      console.log(ingrec[0]);
      axios
        .delete("/api/ingredient-recipe-delete/" + ingrec[0].id)
        .then((response) => {
          if (response.data["ok"]) {
            //const index = this.ingrec.indexOf(ingrec[0].id);
            //this.ingrec.splice(index, 1);
            //FILTER ITEM IN RECIPES AND INGREDiENTS TO DELETE
            this.$store.commit("updateIngredientsRecipes", ingrec[0]);
            console.log(response.data);
          }
        })
        .catch((error) => {
          //MANEJO ERROR DE LOGIN
          console.log(error);
        });
      window.location.reload();
    },

    RecipeDetail(r) {
      this.$buefy.modal.open({
        component: RecipeDetail,
        active: true,
        parent: this,
        props: {
          recipe: r,
        },
      });
    },

    updateIngRec(params) {
      console.log("update ingrec en Recipes");
      console.log("params", params);
      this.$store.commit("setIngredientsRecipes", params);
    },
  },

  created() {
    this.$eventBus.$on("updateIngRec", (params) => {
      console.log("llego a evento ");
      this.updateIngRec(params);
    });
  },

  mounted() {
    console.log("RECIPES MOUNTED");
    //HACER EL AXIOS DESDE STORE O DESDE AQUÍ
    axios
      .get("/api/recipe-list")
      .then((response) => {
        const recipes = response.data;
        this.$store.commit("setRecipes", recipes);
      })
      .catch((error) => {
        //MANEJO ERROR DE LOGIN
        console.log(error);
      });

    axios
      .get("/api/ingredient-list")
      .then((response) => {
        const ingredients = response.data;
        this.$store.commit("setIngredients", ingredients);
      })
      .catch((error) => {
        //MANEJO ERROR DE LOGIN
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
        //MANEJO ERROR DE LOGIN
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
        /* border-radius: 25px; */
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
      justify-content: space-evenly;
      flex-wrap: wrap;

      .table-rows {
        margin-top: 25px;
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
        min-width: 190px;
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
        margin-left: 60px;
      }
    }
  }
}
</style>
