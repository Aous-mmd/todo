const initState = {
    todos: [
        { id: 1, date: '5 january', content: 'first todo', status: 'done' },
        { id: 2, date: '6 january', content: 'second todo', status: 'deleted' },
        { id: 3, date: '7 january', content: 'third todo', status: 'active' },
    ]
}
const rootReducer = (state = initState, action) => {
    if (action.type === 'mark') {
        let newList = state.todos.map((item) => {
            if (item.id === action.id) {
                if (action.name === 'del') {
                    return { ...item, status: 'deleted' }
                }
                else {
                    return { ...item, status: 'done' }
                }
            }
            return item;
        });
        return {
            todos: newList
        }
    }
    else if (action.type === 'delete') {
        let newTodos = state.todos.filter(todo => { return todo.id !== action.id });
        return {
            todos: newTodos
        }
    }
    else if (action.type === 'add') {
        let oldItems = [...state.todos];
        let x = new Date();
        oldItems.push({ id: Math.floor(Math.random() * Math.abs((x.getSeconds() - x.getMinutes()))), date: Date().toLocaleString(), content: action.data, status: 'active' });
        return {
            todos: oldItems
        }
    }
    else if (action.type === 'edit') {
        let newList = state.todos.map((item) => {
            if (item.id === action.id) {
                return { ...item, content: action.data }
            }
            return item;
        });
        return {
            todos: newList
        }
    }
    return state;
}

export default rootReducer;