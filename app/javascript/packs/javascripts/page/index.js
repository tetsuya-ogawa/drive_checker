import React from 'react';
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import RootReducer from '../reducers/index'
import Files from './files/index'

const PAGE_CONTAINERS = {
    Files,
}

window.addEventListener('DOMContentLoaded', () => {
    const namespace = document.body.getAttribute('data-redux_page');

    const Container = PAGE_CONTAINERS[namespace];

    const store = createStore(
        RootReducer,
        applyMiddleware(thunk)
    )

    render(
        <Provider store={store}>
            <Container />
        </Provider>,
        document.getElementById('app')
    )
})
