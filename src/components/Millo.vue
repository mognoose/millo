<template>
  <div>
    <h1>Millo</h1>
    <div class="home">
      <div class="schedule">
        <table>
          <thead>
            <tr>
              <th>OSALLISTUJAT</th>
              <th
                v-for="(time, i) in schedule.times"
                :key="i"
                @click="onView(cs.id)"
              >
                {{ formatTime(time) }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, it) in schedule.users" :key="it">
              <td>
                {{ user.name }}
              </td>
              <td v-for="(t, i) in schedule.times" :key="i">
                <!-- {{ answer(user, i) }} -->
                <answer-btn :user="user" :time="i" @changeAns="changeAnswer" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getScheduleByCode, changeAnswer } from "@/firebase";
import { useRoute } from "vue-router";
import { mapGetters } from "vuex";
import AnswerBtn from "@/components/AnswerBtn.vue";

export default {
  name: "Millo",
  components: {
    AnswerBtn,
  },
  setup() {
    const route = useRoute();
    const schedule = getScheduleByCode(route.params.id);
    return { schedule };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
    formatTime(time) {
      const date = new Date(time.seconds * 1000);
      return `${date.getUTCDate()}.${date.getUTCMonth() + 1}`;
    },
    changeAnswer(ans) {
      ans.id = this.$route.params.id
      changeAnswer(ans);      
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
