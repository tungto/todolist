import React, { Component } from 'react';


class TaskItem extends Component {

    render() {
        return (
            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.name}</td>
                <td className="text-center">
                   <span 
                        className={ this.props.status === true ? 
                                    'label label-success' :
                                    'label label-danger' }
                        onClick={() =>this.props.onChangeStatus(this.props.id)}
                    >
                        { this.props.status === true ? "Active" : "In-Active"}
                   </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={() => this.props.UpdateItem(this.props.id)}
                    >
                        <span className="fa fa-pencil mr-5"></span> Sửa
                    </button>
                    &nbsp;
                    <button
                        type="button" className="btn btn-danger"
                        onClick={() => this.props.deleteItem(this.props.id)}
                    >
                        <span 
                            className="fa fa-trash mr-5">
                        </span> Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;
