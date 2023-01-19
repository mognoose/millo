<template>
  <div class="container">
    <span v-if="name && !userBelongs">{{ name }} ei ole osa tätä ryhmää</span>
    <Millo v-if="name && userBelongs" />
    <Kuka v-else />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Kuka from "@/components/Kuka.vue";
import Millo from "@/components/Millo.vue";
import { getScheduleByCode } from "@/firebase";
import { useRoute } from "vue-router";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    Header,
    Kuka,
    Millo,
  },
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      userBelongs: false
    };
  },
  setup() {
    const route = useRoute();
    const schedule = getScheduleByCode(route.params.id);
    return { schedule };
  },
  updated () {
    this.checkName();
  },
  methods: {
    checkName(){
      const usernames = this.schedule.users.map(user => user.name)
      console.log("this.name:", this.name);
      console.log("usernames:", usernames);
      if (usernames.includes(this.name)) this.userBelongs = true;
      console.log(this.userBelongs);
    }
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

.schedule {
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
