import React,{useEffect, useState} from 'react';
import { Table, Button } from 'antd';
import api from '../../services/api';
import {
DeleteOutlined,
EditOutlined
} from '@ant-design/icons';
import ModalEdit from "../Modal/index";


const TableUsers = ({atualizar}) => {
    const [users, setUsers] = useState([]);
    const [modalEdit, setModalEdit] = useState(false);
    const [id, setId] = useState('')
    const [dados, setDados] = useState({})
    const [carregar, setCarregar] = useState(false)

    async function loadUsers() {
        const response = await api.get('/users');
        setUsers(response.data);
    }

    useEffect(() => {
        loadUsers();
    }, [atualizar,carregar ]);

    async function handleDelete(id) {
        try {
            await api.delete(`/users/${id}`);
            loadUsers()
        } catch (err) {
            console.log(err);
        }
    }
    const columns = [
        { title: 'Nome', dataIndex: 'name', key: 'name' },
        { title: 'Telefone', dataIndex: 'phone', key: 'phone' },
        { title: 'Matrícula', dataIndex: 'registration', key: 'registration' },
        { title: 'CPF', dataIndex: 'document', key: 'document' },
        {
            title: 'Ação',
            dataIndex: 'action',
            key: 'action',
        },
    ];
    const handleUpdate = (item) => {
        setDados(item)
    }


    return(
        <>
        <Table
            columns={columns}
            expandable={{
                expandedRowRender: record => <p style={{ margin: 0 }}>E-mail: {record.description}</p>,
                rowExpandable: record => record.name !== 'Not Expandable',
            }}

            dataSource={users.map((item, index) => {
                const { name, phone, registration, document , email, id} = item;
                return {
                    name: name,
                    phone: phone,
                    registration: registration,
                    document: document,
                    description: email,
                    action:
                    <>
                        <Button type="primary" danger onClick={()=>{handleDelete(id)}}>
                        <DeleteOutlined/>
                        </Button>
                        <Button type="primary" onClick={()=>{setId(id);setModalEdit(true);handleUpdate(item) }} style={{marginLeft:'5px'}}><EditOutlined/></Button>
                    </>

                };
            })}
        />
            <ModalEdit OpenModal={modalEdit} CloseModal={setModalEdit} idUser={id} TotalDados={dados} atualizar={setCarregar}/>
        </>
    )
}
export default TableUsers;
