import React from 'react';
import { Provider } from 'react-redux'
import { render } from 'react-dom';
import { createStore } from 'redux';
import RootReducer from '../reducers/index'
import Files from './files/index'

const PAGE_CONTAINERS = {
    Files,
}

window.addEventListener('DOMContentLoaded', () => {
    const namespace = document.body.getAttribute('data-redux_page');

    const Container = PAGE_CONTAINERS[namespace];

    const store = createStore(RootReducer)

    render(
        <Provider store={store}>
            <Container />
        </Provider>,
        document.getElementById('app')
    )
})
