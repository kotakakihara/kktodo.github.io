(function() {
    'use strict';
    let deferredPrompt;
　　const addBtn = document.querySelector('.add-button');
　　addBtn.style.display = 'none';

　　window.addEventListener('beforeinstallprompt', (e) => {
// Prevent Chrome 67 and earlier from automatically showing the prompt
e.preventDefault();
// Stash the event so it can be triggered later.
deferredPrompt = e;
// Update UI to notify the user they can add to home screen
addBtn.style.display = 'block';

addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
        } else {
        console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
});
});
window.addEventListener('appinstalled', (evt) => {
  console.log('INSTALL: Success');
});

    let vm = new Vue({
      el: '#app',
      data: {
        newItem: '',
        todos: []
      },
      watch:{
          todos:{
            handler: function(){
                localStorage.setItem('todos',JSON.stringify(this.todos));
            },
            deep: true
          }        
      },
      mounted:function(){
          this.todos = JSON.parse(localStorage.getItem('todos'))||[];
      },
      methods: {
        addItem: function() {
          var item = {
            title: this.newItem,
            isDone: false
          };
          this.todos.push(item);
          this.newItem = '';
        },
        deleteItem: function(index) {
            this.todos.splice(index, 1);
        },
        purge: function() {
          this.todos = this.remaining;
        }
      },
      computed: {
        remaining: function() {
          return this.todos.filter(function(todo) {
            return !todo.isDone;});
        }
      }
    });
})();