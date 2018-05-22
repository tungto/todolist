import React, { Component } from 'react';


class TaskForm extends Component {
    constructor(props){
        super(props);
        this.state = ({
            name: "",
            status: false,
            id: '',
        })
    }
    /*chỉ được gọi một lần => khi đang hiển thi taskform
    mà ấn vào sửa của các cell khác thì content ở filed
    tên và trạng thái ở taskform không được update*/
    componentWillMount() {
        if(this.props.taskEditing !== null){
            this.setState({
                name: this.props.taskEditing.name,
                status: this.props.taskEditing.status,
                id: this.props.taskEditing.id,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps && nextProps.taskEditing){
            this.setState({
                name: nextProps.taskEditing.name,
                status: nextProps.taskEditing.status,
                id: nextProps.taskEditing.id,
            })
        } else if(nextProps && nextProps.taskEditing === null) {
            this.onClearValue()
        }

    }

    onUpdate = (e) => {
        var target = e.target;
        var value = target.value;
        var name = target.name;
        // Chú  ý ép kiểu target.value của prop status 
        // vì giá trị trả về là string chứ không phải boolean
        if(name === 'status'){
            value = target.value === 'true' ? true : false;
        }
        // console.log(this.state)
        this.setState({
            [name]: value
        }) 
    }

    onSubmit = (e) => {
      e.preventDefault();
      if(this.state.name){
        this.props.onSubmitAt(this.state);
        this.onClearValue();
      }
      
  }
    onClearValue = (e) => {
        /*Tại sao khi invoke luôn cái hàm coloseForm ở dưới 
        lại có thể toggle được nút thêm công việc mặc dù nó 
        khống phải là hàm khi click nút này gọi tới (hàm được
        gọi tới là hàm toggleForm*/
    // this.onCloseForm()
        // clear content trong taskform 
        this.setState({
            name: "",
            status: false,
            id: ""
        })
        // console.log("run")
        // console.log(e.target.className)
        // if(e.target.className === "btn btn-danger"){
        //     this.onCloseForm()
        // }
        
    }
    onCloseForm = () => {
        this.props.closeForm();
    }
    clearAndClose = () => {
        this.onClearValue();
        this.props.closeForm();
    }

  render() {
    return (
     <div className="panel panel-warning">
         <div className="panel-heading">
             <h3 className="panel-title">
             <div className="d-flex justify-content-lg-between">
                <span>{this.state.id !== "" ? 'Update Task' : 'Thêm Công Việc'}</span>
               <i className="fa fa-times" onClick ={this.props.closeForm} ></i>
             </div>
             </h3>
         </div>
         <div className="panel-body">
             <form onSubmit={this.onSubmit} >
                 <div className="form-group">
                     <label>Tên :</label>
                     <input 
                        type="text" 
                        className="form-control"
                        name="name"
                        onChange={this.onUpdate}
                        value={this.state.name}
                        />
                 </div>
                 <label>Trạng Thái :</label>
                 <select 
                    onChange={this.onUpdate}
                    className="form-control" 
                    required="required"
                    name="status"
                    value={this.state.status}
                    >
                     <option value={true}>Kích Hoạt</option>
                     <option value={false}>Ẩn</option>
                 </select>
                 <br/>
                 <div className="text-center">
                     <input 
                        type="submit" 
                        className="btn btn-warning"
                        // onClick={this.onCloseForm}
                        defaultValue="Thêm"
                    />
                    &nbsp;
                     <input 
                        type="button" 
                        className="btn btn-danger"
                        onClick={this.clearAndClose}
                        defaultValue="Hủy Bỏ"
                    />
                 </div>
             </form>
         </div>
     </div>
    );
  }
}

export default TaskForm;
