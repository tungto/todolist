import React, { Component } from 'react';
import TaskItem from './TaskItem';


class TaskList extends Component {
	 constructor(props){
		super(props);
		this.state = {
			filterName: '',
			filterStatus: -1, // all: -1, avive: 1, deactive: 0
		}
	 } 
	onChange = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.value;
		this.props.onFilter(
			name === 'filterName' ? value : this.state.filterName,
			name === 'filterStatus' ? value : this.state.filterStatus,
		)
		this.setState({
			[name]: value,
		});
	}

	render() {
			var { tasks, filterTable, keyword } = this.props;
			// Search on table
			var { filterName } = this.state;
			if(filterName){
				tasks = tasks.filter((task) => {
					return task.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
				})
			} else {
				tasks = this.props.tasks
			}
			// sort on table
			tasks = tasks.filter((task) =>{
				if(filterTable.status === -1){
					return task;
				} else {
					return task.status === (filterTable.status === 1 ? true : false)
				}
			})

			// search on banner
			if(keyword){
				tasks = tasks.filter((task) => {
					return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
				})
			}

			var elTasks = tasks.map((task, index) => {
					return <TaskItem 
											key={task.id}
											index={index + 1}
											name={task.name}
											status={task.status}
											id={task.id}
											onChangeStatus={this.props.onChangeStatus}
											deleteItem={this.props.deleteItem}
											UpdateItem={this.props.UpdateItem}
									/>
			})
			return (
					<div className="row mt-15">
								 <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
										 <table className="table table-bordered table-hover">
												 <thead>
														 <tr>
																 <th className="text-center">STT</th>
																 <th className="text-center">Tên</th>
																 <th className="text-center">Trạng Thái</th>
																 <th className="text-center">Hành Động</th>
														 </tr>
												 </thead>
												 <tbody>
														<tr>
															<td></td>
															<td>
																	<input 
																		type="text" 
																		className="form-control" 
																		name="filterName" 
																		value={ filterName }
																		onChange = {this.onChange}
																		/>
															</td>
															<td>
																	<select 
																		className="form-control"
																		name="filterStatus"
																		value={this.state.filterStatus}
																		onChange = {this.onChange}
																		>
																			<option value="-1">Tất Cả</option>
																			<option value="0">Ẩn</option>
																			<option value="1">Kích Hoạt</option>
																	</select>
															</td>
															<td></td>
														</tr>
														{ elTasks }
												 </tbody>
										 </table>
								 </div>
						 </div>
			);
	}
}

export default TaskList;
