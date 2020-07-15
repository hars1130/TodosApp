import React, {useEffect} from 'react';
import styled from 'styled-components';
import NewTodoForm from './NewTodoForm';
import { loadTodos } from './thunks';
import { connect } from 'react-redux';
import { getTodosLoading, getIncompleteTodos, getCompletedTodos } from './selectors';
import { deleteRequest, completeTodoRequest } from './thunks';
import TodoListItem from './TodoListItem';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;`

const TodoList = ({ completedTodos, inCompleteTodos, isLoading, onRemovePressed, onCompletedPressed, startLoadingTodos }) => { 
    useEffect(()=>{
        startLoadingTodos();
    }, []);
    const loadingMessage = <div>Loading...</div>;
    const content = (
    <ListWrapper>
        <NewTodoForm />
        <h3>Incomplete</h3>
        {inCompleteTodos.map((todo, index) => <TodoListItem onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} key={index} todo={todo} />)}
        <h3>Completed</h3>
        {completedTodos.map((todo, index) => <TodoListItem onRemovePressed={onRemovePressed} onCompletedPressed={onCompletedPressed} key={index} todo={todo} />)}
    </ListWrapper>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    completedTodos: getCompletedTodos(state),
    inCompleteTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state),
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(deleteRequest(id)),
    onCompletedPressed: id => dispatch(completeTodoRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos()), 
})

export default connect( mapStateToProps, mapDispatchToProps )(TodoList);