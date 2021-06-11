import React, { useState } from 'react'
import Todos from './components/Todos'
import 'antd/dist/antd.css'
import './styles/app.scss'
import { Button, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'


const App = (props) => {
  const [newTodo, setNewTodo] = useState("");
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [activeId, setActiveId] = useState(false);

  const handleOk = () => {
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  }

  const Edit = (id, content) => {
    setShow(true);
    setEdit(true);
    setNewTodo(content);
    setActiveId(id);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!edit) {
      props.saveTodo(e.target[0].value);
    }
    else {
      props.editTodo(e.target[0].value, activeId);
    }
    setShow(false);
    setEdit(false);
    setNewTodo('');
  }

  return (
    <div className='app'>
      <div className='title'>
        <h1>Todo list</h1>
      </div>
      <div className='card'>
        <div className='todo'>
          <Todos Edit={Edit} />
          <div className='add_btn'>
            <Button type="primary" className='success' shape="circle" icon={<PlusOutlined />} size='large' onClick={() => { setShow(true); }} />
          </div>
        </div>
      </div>
      <Modal visible={show} width={800} footer={false} centered onOk={handleOk} onCancel={handleCancel}>
        <form onSubmit={(e) => handleSubmit(e)} className='add_form'>
          <Input placeholder="Type Any Task..." value={newTodo} onChange={handleChange} />
          <div className='actions'>
            <Button type="primary" className='btn btn-danger' size='large' onClick={() => { setShow(false); }}> Cancel </Button>
            <button type="submit" className='btn btn-success'> Done </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveTodo: (data) => { dispatch({ type: 'add', data: data }) },
    editTodo: (data, id) => { dispatch({ type: 'edit', data: data, id: id }) },
  }
}

export default connect(null, mapDispatchToProps)(App)
