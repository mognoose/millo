<template>
  <div>
    <h1>Millo</h1>
    <div class="home">
      <div class="cheatsheet-list card mt-4">
        <table>
          <thead>
            <tr>
              <th scope="col">Mikä</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="event in schedules"
              :key="event.id"
              @click="onView(event.id)"
            >
              <td>{{ event.name }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { useLoadSchedules } from "@/firebase";
import { mapMutations } from "vuex";

export default {
  name: "HomeView",
  components: {
    Header,
  },
  setup() {
    const schedules = useLoadSchedules();
    return { schedules };
  },
  mounted() {
    this.clearName();
  },
  methods: {
    ...mapMutations(["setName"]),

    async onView(id) {
      this.$router.push(`/id/${id}`);
    },
    clearName() {
      this.setName("");
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  row-gap: 2em;
  background-color: rgba(55, 55, 55, 0);
  padding: 3em;
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 3em 0;
  }
}

.cheatsheet-list {
  justify-self: center;
  grid-column: 2;
  backdrop-filter: blur(20px);
  @media only screen and (max-width: 600px) {
    grid-column: 1;
  }
}
tbody tr:hover {
  cursor: pointer;
  background-color: rgba(55, 55, 55, 0.5);
}
</style>
