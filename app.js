window.addEventListener('load', () => {
  window.vue = new Vue({
    el: '#app',
    data: {
      todo_list: []
    },

    mounted() {
      this.todo_list = this._getTodoList();
    },

    watch: {
      'todo_list': '_saveTodoList'
    },

    methods: {
      /**
       * @public
       *
       * This method gets the to-do item text from textbox and
       * creates an uncompleated to-do item with this to-do item
       * text.
       */
      addTodoItem() {
        var $txt_todo_item = this.$refs.txt_todo_item;
        if (!$txt_todo_item.value) return;

        var todo_item = {
          status: false,
          text: $txt_todo_item.value
        };

        this.todo_list.push(todo_item);
        $txt_todo_item.value = "";
      },

      /**
       * @public
       *
       * This method changes to status of to-do item.
       *
       * @param {number} index To-do item index
       */
      changeStatus(index) {
        var currentStatus = this.todo_list[index].status;
        currentStatus = !currentStatus;
      },

      /**
       * @public
       *
       * This method removes a to-do item from the to-do list.
       *
       * @param {number} index To-do item index
       */
      removeTodoItem(index) {
        this.todo_list.splice(index, 1);
      },

      /**
       * @private
       *
       * This method gets the to-do list from localStorage.
       *
       * @returns {Array} To-do List
       */
      _getTodoList() {
        return JSON.parse(localStorage.getItem('todo_list')) || [];
      },

      /**
       * @private
       *
       * This medhod saves the to-do list as JSON format to localStorage.
       */
      _saveTodoList() {
        localStorage.setItem('todo_list', JSON.stringify(this.todo_list));
      }
    }
  });
});
