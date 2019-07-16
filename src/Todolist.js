import React,{Component , Fragment} from 'react';
import TodolistItem from './TodolistItem';
import axios from 'axios';
import './TodolistStyle.css'


class Todolist extends Component {
    constructor (props) {
        super(props);
        this.state={
           inputvalue:'',
            list:[],
        }

        this.handlelistchange=this.handlelistchange.bind(this);
        this.handleBtnClick=this.handleBtnClick.bind(this);


    }
    render() {
        return (
            <Fragment>
              <div>
                  <label htmlFor={'inputArea'}>输入</label>
                  <input
                          id={'inputArea'}
                          className="input"
                          value={this.state.inputvalue}
                          onChange={this.handlelistchange}
                          ref={(input) =>{this.input = input}}
                    />
                  <button onClick={this.handleBtnClick}>提交</button></div>
               <ul>
                   {this.getToDoItem()}
               </ul>

            </Fragment>

        )
    }
    componentDidMount(){
        axios.get('/api/todolist')
             .then((res) => {
                 console.log(res.data);
                 this.setState(
                     () => ({
                         list:[...res.data]
                     })
                 )
             })
             .catch(()=>{alert('err')})
    }
    getToDoItem () {
      return  this.state.list.map((item,index) => {

            return (
                <TodolistItem
                    key={item}
                    content={item}
                    index={index}
                    deleteItem={this.handleItemDelete.bind(this)}
                />
            )
        })
    }

    handlelistchange(e) {
        const value= this.input.value;
        this.setState( ()=> ({
               inputvalue: value
        }))
        }




    handleBtnClick(e){
        this.setState( (prevState)=>({
            list:[...prevState.list,prevState.inputvalue],
            inputvalue:''
        }))


    }

    handleItemDelete(index) {
        //修改一个state的副本，再替换

        this.setState( ()=>{
            const list = [...this.state.list];
                   list.splice(index,1);
           return {list} ;
        })
    }
}


export  default Todolist;