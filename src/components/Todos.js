import React from 'react'
import { List, Button } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

const Todos = ({ todos, Mark, deleteTodoF, Edit }) => {

    return (
        <>
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={todos}
                renderItem={item => (
                    <List.Item
                        actions={
                            item.status === 'active' ?
                                [<Button type="primary" danger shape="circle" icon={<DeleteOutlined />} size='middle' onClick={() => { Mark(item.id, 'del'); }} />
                                    , <Button type="primary" shape="circle" icon={<EditOutlined />} size='middle' onClick={() => { Edit(item.id, item.content) }} />
                                    , <Button className='success' type="primary" shape="circle" icon={<CheckOutlined />} size='middle' onClick={() => { Mark(item.id, 'done'); }} />]
                                : [<Button type="primary" className='outline' shape="circle" icon={<DeleteOutlined />} size='middle' onClick={() => { deleteTodoF(item.id); }} />]
                        }
                        className={item.status === 'done' ? 'done' : item.status === 'deleted' ? 'deleted' : null}
                    >
                        <List.Item.Meta
                            title={item.date}
                            description={item.content}
                        />
                    </List.Item>
                )}
            />
        </>
    )
}

const mapStateToProps = (state) => {
    return { todos: state.todos }
}

const mapDispatchToProps = (dispatch) => {
    return {
        Mark: (id, name) => { dispatch({ type: 'mark', id: id, name: name }) },
        deleteTodoF: (id) => { dispatch({ type: 'delete', id: id }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
