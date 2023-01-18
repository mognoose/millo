<template>
  <div>
    <div
      class="answer self"
      v-if="isSelf"
      @click="
        $emit('changeAns', {
          ans: nextAnswer(ans),
          user: user.name,
          time: time,
        })
      "
    >
      {{ symbols[ans] }}
    </div>
    <div class="answer" v-else>
      {{ symbols[ans] }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AnswerBtn",
  props: ["user", "time"],
  emits: ["changeAns"],
  computed: {
    ...mapGetters(["name"]),
    isSelf() {
      if (this.name === this.user.name) return true;
      return false;
    },
  },
  data() {
    return {
      ans: "",
      symbols: ["-", "✔", "✗", "⁉"],
    };
  },
  mounted() {
    this.answer();
  },
  methods: {
    answer() {
      if (this.user.yes && this.user.yes.includes(this.time.toString())) {
        this.ans = 1;
        return;
      }
      if (this.user.no && this.user.no.includes(this.time.toString())) {
        this.ans = 2;
        return;
      }
      if (this.user.maybe && this.user.maybe.includes(this.time.toString())) {
        this.ans = 3;
        return;
      }
      this.ans = 0;
    },
    nextAnswer(ans) {
      let answer = ans + 1;
      if (answer > 3) return 0;
      return answer;
    },
  },
};
</script>

<style scoped>
.answer {
  text-align: center;
  width: 2em;
  height: 2em;
  line-height: 2em;
}
.self {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.self:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
