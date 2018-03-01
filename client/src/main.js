// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import {db} from './firebase'

Vue.config.productionTip = false

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    backlog:[],
    todo:[],
    doing:[],
    done:[]
  },
  mutations: {
    setTask (state, task) {
      state.backlog = task.filter(element => {
        return element.status === 0
      })
      state.todo = task.filter(element => {
        return element.status === 1
      })
      state.doing = task.filter(element => {
        return element.status === 2
      })
      state.done = task.filter(element => {
        return element.status === 3
      })    
    }
  },
  actions: {
    setTask ({commit}) {
      db.ref('tasks').on('value', snapshot => {
        // console.log('ini adalah snapkey',snapshot.val())
        // let arr = []
        // snapshot.forEach(data => {
        //     arr.push({
        //         id: data.key,
        //         name: data.val().name,
        //         assign: data.val().assign,
        //         points: data.val().points
        //     })
        // })
        let task = []
        for(var data in snapshot.val()){
          task.push({
            id: data,
            name: snapshot.val()[data].name,
            assign: snapshot.val()[data].assign,
            points: snapshot.val()[data].points,
            status: snapshot.val()[data].status
          })
          console.log(task)
        }
        commit('setTask', task)
        // this.task = snapshot.val()
        // console.log('INI SNAP',snapshot.val())
    })
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
