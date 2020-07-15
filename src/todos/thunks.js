import { createTodo, removeTodo, markTodoAsCompleted, loadTodosInProgress, loadTodosSuccess, loadTodosFailure } from './actions';
export const loadTodos = () => async dispatch => {
    try{
        dispatch(loadTodosInProgress());
        const resp = await fetch('http://localhost:8080/todos');
        const todos = await resp.json();
    
        dispatch(loadTodosSuccess(todos));
    }
    catch(e){
        dispatch(loadTodosFailure);
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => () =>{alert(text)};

export const addTodoRequest = text => async (dispatch) => {
    try{
        const body = JSON.stringify({text});
        const resp = await fetch('http://localhost:8080/todos',{
            headers:{
                'Content-Type': 'application/json',
            },
            method:'post',
            body,
        });
        const todo = await resp.json();
        dispatch(createTodo(todo));
    }
    catch(e){
        dispatch(displayAlert(e));
    }
} 

export const deleteRequest = id => async (dispatch) => {
    try{
        const resp = await fetch(`http://localhost:8080/todos/${id}`,{
            method:'delete',
        });
        const removedTodo = await resp.json();
        dispatch(removeTodo(removedTodo));
    }
    catch(e){
        dispatch(displayAlert(e));
    }
}

export const completeTodoRequest = id => async(dispatch) => {
    try{
        const resp = await fetch(`http://localhost:8080/todos/${id}/completed`,{
            headers:{
                'Content-Type': 'application/json',
            },
            method:'post',
        });
        const todo = await resp.json();
        dispatch(markTodoAsCompleted(todo));
    }
    catch(e){
        dispatch(displayAlert(e));
    }
} 