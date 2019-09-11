import React, { Component } from 'react';

var click = 0, delay = 400, timer = null

export default class ClickIdentifier extends Component {
    onClickIdentifier = () => {
        click++
        if (click === 1) {
            timer = setTimeout(function () {

                alert("Single Click");  //perform single-click action    
                click = 0;             //after action performed, reset counter

            }, delay);
        }
        else {
            clearTimeout(timer);    //prevent single-click action
            alert("Double Click");  //perform double-click action
            click = 0;             //after action performed, reset counter
        }
    }
    render() {
        return (
            <>
                <div onClick={(e) => { this.onClickIdentifier() }}> Click Here</div>
            </>
        )
    }
}