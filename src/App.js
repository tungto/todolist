import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import logo from './logo.png';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      tasks: [],
      isDisplayForm: false,
      isEditing: null,
      filterTable: {
        name: '',
        status: -1,
      },
      keyword: "",
      sortBy: 'name',
      sortValue: 1,
    }
  }

  componentWillMount(){
    if(localStorage && localStorage.getItem('tasks') !== null){
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks,
      })
    }
  }

  onGenerateData =() => {
    var tasks = [
        {
          id: this.generateID(),
          name: "Learn programing",
          status: true,
        },
         {
          id: this.generateID(),
          name: "Read Books",
          status: true,
        },
         {
          id: this.generateID(),
          name: "Stroll Around",
          status: false,
        }
      ]
      this.setState({
         tasks: tasks
      });

      localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  s4() {
    return Math.floor((1+ Math.random()) *0x10000).toString(16).substring(1);
  }


  generateID(){
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4();
  }

  findIndex = (id) => {
   var tasks = this.state.tasks;
   var result = -1;
   tasks.forEach((task, index) => {
      if(task.id === id){
         return result = index
      }

   })
   return result;
  }

  toggleForm = () => {
    /*nếu taskform đang mở*/
    // - thay đổi isEditing về null (xóa content trong các field của taskform)
    // - đóng task form
   if(this.state.isDisplayForm && this.state.isEditing !== null){
    // taskform đang mở và content # null => sửa
      this.setState({ 
         isDisplayForm: true,
         isEditing: null
      });
      /*Nếu taskform đang mở và isEditing = null(click nút sửa => nút thêm CV)*/
   } else {
      this.setState({ 
         isDisplayForm: !this.state.isDisplayForm,
         isEditing: null
      });
    } 
  }

  closeForm = () => {
   this.setState({ 
      isDisplayForm: false,
     
   })
  } 

  onSubmitAt = (data) => {
      var tasks = this.state.tasks;
     /*KHi thêm vì chưa gọi data.is = generateID => id rỗng*/
      if(data.id === ""){
          data.id = this.generateID();
          tasks.push(data);
      }
      /*data khi sửa có sẵn id*/
      else {
         var index = this.findIndex(data.id);
         tasks[index] = data;
      }
      this.setState({
         tasks: tasks,
         isEditing: null,
      });

      localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  onChangeStatus =(id) => {
      var index = this.findIndex(id);
      // findIndex này là tự viết, có thể dùng findIndex
      //helper của js 
      if(index !== -1){
         var tasks = this.state.tasks;
         tasks[index].status = !tasks[index].status;
         this.setState({
            tasks: tasks
         });
         // Save changed status
         localStorage.setItem('tasks', JSON.stringify(tasks))
      }
  }

   onDeleteItem = (id) => {
      var index = this.findIndex(id);
      var tasks = this.state.tasks;
      tasks.splice(index, 1);
      this.setState({tasks: tasks})
      localStorage.setItem('tasks', JSON.stringify(tasks))
      if(this.state.isDisplayForm === true){
         this.toggleForm();
      }
  }

  UpdateItem = (id) => {
   var index = this.findIndex(id);
   var tasks = this.state.tasks;
   var isEditing = tasks[index]
   this.setState({
      isEditing: isEditing
   })
   // nếu taskform dang đóng
   if(this.state.isDisplayForm === false){
      this.toggleForm();
      this.setState({
      isEditing: isEditing
   })
   } 
  }

  /*nhớ check type of filter status vì khi lấy giá trị từ onChane thưởng trả về string*/
  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10)
    this.setState({
      filterTable: {
        name: filterName.toLowerCase(),
        status: filterStatus
      }
    })
  }
  onSearch = (e) => {
   this.setState({keyword: e})
  }
  onSort = (sortBy, sortValue) =>{
      this.setState({
         sortBy: sortBy,
         sortValue: sortValue
      })
  }
  

  render(){
   var { isDisplayForm, isEditing, sortBy, sortValue} = this.state;
   // console.log(tasks)
      // if(filter){
   //    if(filter.name){
   //    tasks = this.state.tasks = tasks.filter((task) => {
   //          return task.name.toLowerCase().indexOf(filter.name) !== -1
   //       });
   //    }
   // }else {
   //    tasks = this.state.tasks
   // }
   
   // console.log(tasks)
   // console.log(filter)
   // console.log(this.state.keyword)
   var tasks = this.state.tasks
   if(sortBy === 'name'){
            tasks.sort((a, b) =>{
               if(a.name > b.name) return -sortValue;
               else if(a.name < b.name) return sortValue;
               else return 0;
            });
         } else {
            tasks.sort((a, b) =>{
               if(a.status > b.status) return -sortValue;
               else if(a.status < b.status) return sortValue;
               else return 0;
            });
         }

   var elTaskForm = isDisplayForm ? 
             <TaskForm 
                toggleForm={this.toggleForm}
                onSubmitAt={this.onSubmitAt}
                taskEditing={isEditing}
                closeForm={this.closeForm}
             /> : "";

   console.log(sortBy, sortValue)
    return(
      <div className="container">
       <div className="text-center">
           <h1>Quản Lý Công Việc</h1>
           <hr/>
       </div>
       <div className="row">
         <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
             { elTaskForm }
         </div>
         <div className={ isDisplayForm ? 
            "col-xs-8 col-sm-8 col-md-8 col-lg-8" : 
            "col-xs-12 col-sm-12 col-md-12 col-lg-12" 
          }>
               <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={this.toggleForm}
                  >
                   <span className="fa fa-plus mr-5"></span> Thêm Công Việc
               </button>

               <button 
                  type="button" 
                  className="btn btn-success ml-15"
                  onClick={this.onGenerateData}
                >
                  <span className="fa fa-plus mr-5"></span>Generate Tasks
               </button>
              <TaskControl 
               onSearch={this.onSearch}
               onSort = {this.onSort}
               sortBy={sortBy}
               sortValue={sortValue}
              />
              <TaskList 
                tasks={this.state.tasks}
                onChangeStatus={this.onChangeStatus}
                deleteItem={this.onDeleteItem}
                UpdateItem={this.UpdateItem}
                onFilter={this.onFilter}
                filterTable={this.state.filterTable}
                keyword={this.state.keyword}
              />
           </div>
       </div>
   </div>
    

    );
  }
}

export default App;
