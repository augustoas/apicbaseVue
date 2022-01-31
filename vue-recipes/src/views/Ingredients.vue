<template>
  <div id="ingredients">
    <div class="ingredient-container">
      <h1>Ingredients</h1>
      <h2>Here you can create your ingredientes for your recipes</h2>
      <div class="header">
        <div class="add-ingredient-button" @click="showIngredientModal">
          Create Ingredient
        </div>
      </div>
      <h1 class="table-title" v-if="this.ingredients.length > 0">
        My Ingredients
      </h1>
      <div class="search-input" v-if="this.ingredients.length > 0">
        <input type="text" v-model="search" placeholder="Search" />
      </div>

      <div class="ingredients-table">
        <div
          class="table-rows"
          v-for="ing in filteredIngredients"
          v-bind:key="ing.id"
        >
          <div class="item-container">
            <span class="item-title">{{ ing.name }}</span>
            <div class="item-info">
              <span class="row-text">ID {{ ing.articleNumber }}</span>
              <span class="row-text">{{ ing.amount }} {{ ing.unit }}</span>
              <span class="row-text">{{ ing.cost }} EURO</span>
            </div>

            <div class="actions">
              <span
                class="action-button"
                @click="showIngredientModal({ edit: true, ingredient: ing })"
                ><b-icon pack="fas" icon="edit" size="is-small"> </b-icon
              ></span>
              <span class="action-button" @click="deleteIngredient(ing)"
                ><b-icon pack="fas" icon="trash" size="is-small"> </b-icon
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import IngredientModal from "@/components/IngredientModal";

export default {
  name: "Ingredients",
  components: {},
  data() {
    return {
      search: "",
    };
  },
  computed: {
    ingredients() {
      return this.$store.state.ingredients;
    },

    filteredIngredients() {
      return this.ingredients.filter((ing) => {
        return ing.name.match(this.search);
      });
    },
  },

  methods: {
    deleteIngredient(ing) {
      axios
        .delete("/api/ingredient-delete/" + ing.id)
        .then((response) => {
          //REMOVE ITEM BY ID
          console.log(response);
          const index = this.ingredients.indexOf(ing);
          this.ingredients.splice(index, 1);
          this.$store.commit("setIngredients", this.ingredients);
        })
        .catch((error) => {
          //MANEJO ERROR DE LOGIN
          console.log(error);
        });
    },
    showIngredientModal(props) {
      if (props && props.edit) {
        var edit = props.edit;
      }
      if (props.ingredient) {
        var ing = props.ingredient;
      }
      this.$buefy.modal.open({
        component: IngredientModal,
        active: true,
        parent: this,
        props: {
          edit: edit,
          ingredients: this.ingredients,
          ingredient: ing,
        },
      });
    },
  },

  mounted() {
    console.log("INGREDIENTS MOUNTED");
    //HACER EL AXIOS DESDE STORE O DESDE AQUÍ
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
  },
};
</script>

<style scoped lang="scss">
#ingredients {
  width: 100%;
  height: 100%;
  color: #1c344c;

  div.ingredient-container {
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

      .add-ingredient-button {
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

    div.ingredients-table {
      margin: 3px;
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
        align-items: center;
        min-width: 150px;

        .item-title {
          font-size: 18px;
          font-weight: 600;
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
        }
      }

      .row-text {
        font-size: 14px;
      }

      .action-button {
        align-self: center;
        margin: 5px;
      }
    }
  }
}
</style>
