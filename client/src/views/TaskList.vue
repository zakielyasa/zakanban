<template>
    <div>
    <div class="col-md-3">
      
        <h2>Back Log</h2>
            <div class="row">
    </div>
        <div class="card" style="width: 20rem;" v-for="tugas in backlog" :key="tugas">
            <div class="card-block">
                   <h4 class="card-title">Task: {{tugas.name}}</h4> 
                   <p class="card-text">Assign to: {{tugas.assign}}</p> 
                   <p class="card-text">Points: {{tugas.points}}</p>
            </div>
            <button class="btn btn-primary" @click="deleteTask(tugas.id)">Delete</button>
            <button class="btn btn-primary" @click="maju(tugas.id, tugas.status)">Move to todo</button>
            <br>
        </div>
        </div>
        <br>
        <div class="col-md-3">
            <h2>Todo</h2>
          <div class="card" style="width: 20rem;" v-for="tugas in todo" :key="tugas">
            <div class="card-block">
                <h4 class="card-title">Task: {{tugas.name}}</h4>
                <p class="card-text">Assign to: {{tugas.assign}}</p>
                <p class="card-text">Points: {{tugas.points}}</p>
            </div>
            <button class="btn btn-primary" @click="deleteTask(tugas.id)">Delete</button>
            <button class="btn btn-primary" @click="maju(tugas.id, tugas.status)">Move to Doing</button>
          </div>
        </div>
        <div class="col-md-3">
            <h2>Doing</h2>
          <div class="card" style="width: 20rem;" v-for="tugas in doing" :key="tugas">
            <div class="card-block">
                <h4 class="card-title">Task: {{tugas.name}}</h4>
                <p class="card-text">Assign to: {{tugas.assign}}</p>
                <p class="card-text">Points: {{tugas.points}}</p>
            </div>
            <button class="btn btn-primary" @click="mundur(tugas.id, tugas.status)">Move to Todo</button>
            <button class="btn btn-primary" @click="deleteTask(tugas.id)">Delete</button>
            <button class="btn btn-primary" @click="maju(tugas.id, tugas.status)">Move to Done</button>
          </div>
        </div>
        <div class="col-md-3">
            <h2>Done</h2>
          <div class="card" style="width: 20rem;" v-for="tugas in done" :key="tugas">
            <div class="card-block">
                <h4 class="card-title">Task: {{tugas.name}}</h4>
                <p class="card-text">Assign to: {{tugas.assign}}</p>
                <p class="card-text">Points: {{tugas.points}}</p>
            </div>
            <button class="btn btn-primary" @click="deleteTask(tugas.id)">Delete</button>
          </div>
        </div>
    <!-- <div class="row">
    <div class="col-md-3">
          <div class="card" style="width: 20rem;">
            <h2>Doing</h2>
            <div class="card-block">
                <h4 class="card-title">Special title treatment</h4>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
            </div>
          </div>
        </div>
    </div> -->
</div>
</template>

<script>
import {db} from '../firebase'
import Task from './Task'

export default {
  // props: ['task'],
  data () {
    return {
      // backlog: [],
      // todo: [],
      // doing: [],
      // done: [] 
    }
  },
  methods: {
    filterTask () {
      console.log(this.task);
      
      this.backlog = this.task.filter(element => {
        console.log(element)
        return element.status === 0
      })
      this.todo = this.task.filter(element => {
        return element.status === 1
      })
      this.doing = this.task.filter(element => {
        return element.status === 2
      })
      this.done = this.task.filter(element => {
        return element.status === 3
      })
    },
    maju (id, status) {
      db.ref('tasks').child(id).update({status:status + 1})
      this.$store.dispatch('setTask')
    },
    mundur (id, status) {
      console.log('masuk')
      db.ref('tasks').child(id).update({status: status - 1})
      this.$store.dispatch('setTask')
    },
    deleteTask (id) {
      db.ref('tasks').child(id).set(null)
    }
  },
  computed: {
    backlog: function(){
      return this.$store.state.backlog
    },
      todo: function(){
      return this.$store.state.todo
    },
      doing: function(){
      return this.$store.state.doing
    },
      done: function(){
      return this.$store.state.done
    },
  }
}
</script>

<style>
.card{
    border: 2px solid
}
</style>
