<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal-container modal-recipeDetail">
        <header class="modal-header" id="modalTitle">
          <p>Detail</p>
          <span class="action-button" @click="close()">
            <b-icon pack="fas" icon="times" size="is-small"> </b-icon
          ></span>
        </header>

        <h1>{{ recipe.name }}</h1>
        <div class="ingredients-list-container">
          <div
            class="ingredient-list"
            v-for="ing in recipe.ingredients"
            v-bind:key="ing.id"
          >
            <div class="list-fields-container">
              <span>{{ ing.name }}</span>
              <span>{{ calculateAmount(ing, recipe) }} {{ ing.unit }}</span>
              <span>{{ ingredientCost(ing) }} EURO</span>
            </div>
          </div>
        </div>

        <span class="total-cost">Total: {{ recipeCost() }} EURO</span>

        <footer class="modal-footer modal-footer-direccion">
          <button class="modal-button" type="button" @click="close()">
            {{ "Close Detail" }}
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RecipeDetail",
  props: {
    recipe: { type: Object, required: true },
  },

  data() {
    return {};
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
    ingredientCost(ing) {
      var ingAmount = this.calculateAmount(ing, this.recipe);
      var cost = (ingAmount * ing.cost) / ing.amount;
      return Math.round(cost * 100) / 100;
    },

    calculateAmount: function (i, r) {
      var ingrec = this.ingrec.find(
        (x) => x.ingredient.id === i.id && x.recipe.id === r.id
      );
      return ingrec.r_amount;
    },
    recipeCost() {
      console.log("recipeCost");
      var cost = 0;
      for (var i in this.recipe.ingredients) {
        cost += this.ingredientCost(this.recipe.ingredients[i]);
      }
      console.log(cost);
      return Math.round(cost * 100) / 100;
    },
    testFunction() {
      console.log("recipe", this.recipe);
    },
  },

  mounted() {
    console.log("mounted modal detail");
    console.log("recipe", this.recipe);
  },
};
</script>

<style scoped lang="scss">
@import "@/styles/modals.scss";

h1 {
  font-weight: 700;
  align-self: center;
  margin: 10px;
  font-size: 18px;
  color: #1c344c;
}

p {
  color: #1c344c;
}

.ingredient-list {
  margin: 15px;
}

.list-fields-container {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.total-cost {
  font-weight: 600;
  margin: 15px;
  margin-left: auto;
}
</style>
