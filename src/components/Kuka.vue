<template>
  <div class="container">
    <h1>Kuka</h1>
    <div class="home">
      <div class="form">
        <form @submit.prevent="addName()">
          <input
            tabindex="1"
            v-model="name"
            type="text"
            placeholder="Anna nimesi"
          />
          <button type="submit">OK</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      name: "",
    };
  },
  methods: {
    ...mapMutations(["setName"]),

    addName() {
      this.setName(this.name.toUpperCase());
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  box-sizing: border-box;
  padding-top: 3em;
}
.home {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  row-gap: 2em;
  background-color: rgba(55, 55, 55, 0);
  padding-top: 3em;
  margin: 0em;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 3em 0;
  }
  text-align: left;
}

.form {
  justify-self: center;
  grid-column: 2;
  @media only screen and (max-width: 600px) {
    grid-column: 1;
  }
}

.inner-section {
  border: 1px solid #fff;
  border-radius: 4px;
  margin: 1em;
  padding: 0.5em 2em;
  background-color: rgba(55, 55, 55, 0);
  backdrop-filter: blur(10px);

  ol {
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    margin: 0.5em;
    margin-left: 0;
    img {
      margin-right: 0.5em;
      height: 40px;
      border-radius: 4px;
    }
  }

  a:link,
  a:visited,
  a:active,
  a:hover {
    color: #fff;
    text-decoration: none;
  }
}
.section:nth-child(1) {
  grid-column-start: 2;
}
.section:nth-child(2) {
  grid-column-start: 4;
}

.enchants {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 1em 0;
  padding-bottom: 1em;
  border-bottom: 1px solid #fff;
}

.enchant-icon {
  width: 60px;
}
</style>
