(function () {
  'use strict';

  const draggable = window['vuedraggable'];

  let vm = new Vue({
    el: '#app',
    components: { draggable },
    vuetify: new Vuetify(),
    data: function(){ return{
      newItem: '',
      todos: [],
    }},
    watch: {
      todos: {
        handler: function () {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    mounted: function () {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      addItem: function () {
        var item = {
          id: 0,
          selected: ["Today", "Private", "ThisSP", "NextSP", "Someday..."],
          title: this.newItem,
          isDone: false
        };
        this.todos.push(item);
        this.newItem = '';
      },
      deleteItem: function (index) {
        this.todos.splice(index, 1);
      },
      purge: function () {
        this.todos = this.remaining;
      },
      selectDeadline: function (id) {
        id += 1;
        if (id === 5) id = 0;
        return id;
      },
      sortByCategory: function() {
        this.todos = this.sortPerId;
      }
    },
    computed: {
      remaining: function () {
        return this.todos.filter(function (todo) {
          return !todo.isDone;
        });
      },
      progressNum: function () {
        return (100 - Math.round(this.remaining.length / this.todos.length * 100) || '0') + '%'
      },
      sortPerId: function() {
        const Arry = [];
        for(let i=4; i>=0; i--){
          const sortArry = this.todos.filter(function(todo) {
            return todo.id === i;
          });
          sortArry.forEach(element => {
            Arry.push(element);
          });
        };
        return Arry;
      }
    }
  });


})();
