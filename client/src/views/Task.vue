<template>
<div>
  <div class="rows">
    <div class="row">

  <form class="form" @submit.prevent="addTask">
    <div class="form-group">
        <label>Points:</label>
        <input type="number" class="form-control" placeholder="" v-model="points">
    </div>
    <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" placeholder="Enter your task" v-model="name">
    </div>
    <div class="form-group">
        <label>Assign to:</label>
        <input type="text" class="form-control" placeholder="Assign to" v-model="assign">
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
    </div>
    <div class="row">
    <TaskList />
    </div>
</div>
  </div>
</template>

<script>
import {db} from '../firebase'
import TaskList from './TaskList'

export default {
  data () {
    return {
      points: 0,
      name: '',
      assign: '',
    }
  },
  methods: {
    addTask () {
      console.log('a')
      db.ref('tasks').push({
        points: this.points,
        name: this.name,
        assign: this.assign,
        status: 0
      })
      this.$store.dispatch('setTask')
    }
  },
  created () {
    this.$store.dispatch('setTask')
    // this.start()
  },
  // methods:{
  //   // start(){
  //   //   db.ref('tasks').once('value', snapshot => {
  //   //     // console.log('ini adalah snapkey',snapshot.val())
  //   //     // let arr = []
  //   //     // snapshot.forEach(data => {
  //   //     //     arr.push({
  //   //     //         id: data.key,
  //   //     //         name: data.val().name,
  //   //     //         assign: data.val().assign,
  //   //     //         points: data.val().points
  //   //     //     })
  //   //     // })
  //   //     for(var data in snapshot.val()){
  //   //       this.task.push({
  //   //         id: data,
  //   //         name: snapshot.val()[data].name,
  //   //         assign: snapshot.val()[data].assign,
  //   //         points: snapshot.val()[data].points,
  //   //         status: snapshot.val()[data].status
  //   //       })
  //   //       console.log(this.task)
  //   //     }
  //   //     // this.task = snapshot.val()
  //   //     // console.log('INI SNAP',snapshot.val())
  //   // })
  //   // }
  // },
  components: {
      TaskList
  }
}
</script>

<style>
.form{
    padding-right: 10%;
    padding-left: 10%;
    display: inline-block;
}
</style>
