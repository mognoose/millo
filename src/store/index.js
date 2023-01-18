import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: false,
    name: "",
  },
  getters: {
    loading: state => state.loading,
    name: state => state.name,
  },
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },
    setName(state, data) {
      state.name = data;
    },
  },
  actions: {
  }
})
