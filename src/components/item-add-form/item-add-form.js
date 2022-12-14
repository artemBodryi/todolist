import { React, Component } from 'react';
import './item-add-form.css'

export default class ItemAddForm extends Component {

    state = {
        label: ''
    };

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.props.onCreateItem(this.state.label);
        this.setState({
            label: ''
        });
    }
    render() {
        return (
           <>
            <form
                className="item-add-form d-flex"
                onSubmit={this.onSubmit}>

                <input type="text"
                       className="form-control"
                       value={this.state.label}
                       onChange={this.onLabelChange}
                       placeholder="What needs to be done?" />

            <button type="submit"
                    className="btn btn-outline-secondary">Add</button>
            </form>
           </> 
        );
    }
}