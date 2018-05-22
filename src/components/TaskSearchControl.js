import React, { Component } from 'react';


class TaskSearchControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        }
    }
    onChange = (e) => {
      var target = e.target;
      var name = target.name;
      var value = target.value;
      
      this.setState({
        [name]: value,
      });
    }
    onSearch = (e) => {
      this.props.onSearch(this.state.keyword,)
    }
    render() {
        return (
           <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
               <div className="input-group">
                   <input 
                    type="text" 
                    name="keyword"
                    className="form-control" 
                    placeholder="Nhập từ khóa..."
                    value={this.state.keyword} 
                    onChange={ this.onChange }
                    />
                   <span className="input-group-btn">
                      <button 
                        className="btn btn-primary" 
                        type="submit"
                        onClick={ this.onSearch }
                        >
                          <span className="fa fa-search mr-5"></span>Tìm
                      </button>
                   </span>
               </div>
           </div>
        );
    }
}



export default TaskSearchControl;
