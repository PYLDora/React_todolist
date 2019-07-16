import React , { Component } from 'react' ;
import  PropTypes from 'prop-types';


class TodolistItem extends Component {
    constructor(props) {
        super(props);
        this.deleteIt=this.deleteIt.bind(this);
    }

    render() {
        const { content }=this.props;
        return (
            <div onClick={this.deleteIt}>
                                {content}
                                </div>
        )
    }

    deleteIt() {
        const { deleteItem,index } = this.props;
        deleteItem( index );
    }
}
TodolistItem.propTypes = {
    content: PropTypes.string,
    deleteItem:PropTypes.func,
    index:PropTypes.number
}

export default  TodolistItem;