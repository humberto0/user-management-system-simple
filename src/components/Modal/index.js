import React, {useEffect, useState} from 'react';
import {Modal, Button, Form, Input, notification} from 'antd';
import api from "../../services/api";
import MaskedInput from "antd-mask-input";



const ModalEdit = ({OpenModal, CloseModal, idUser, TotalDados, atualizar}) => {


    const close = () => {
    };
    const key = `open${Date.now()}`;
    const [form] =Form.useForm();


    useEffect(() => {
        form.setFieldsValue(TotalDados)
    }, [form, TotalDados])
    const onSubmit = async (values)=>{
        try {
             await api.put(`/users/${idUser}`, {
                email: values.email,
                name: values.name,
                phone: values.phone.replace(' ', ''),
                document: values.document.replace(' ', ''),
                registration: values.registration
            });
            atualizar(true);
            CloseModal(false);
            notification.open({
                message: 'Sucesso',
                description:
                    'Cadastro realizado com sucesso',
                key,
                onClose: close,
            });
        } catch (err) {
            notification.info({
                message: 'Error',
                description:
                    'Erro ao cadastrar usuário, tente novamente mais tarde',
                key,
                onClose: close,
            });
        }
    }


    return (
    <Modal
        title="Formulário de Edição de usuários"
        visible={OpenModal}
        onCancel={() => CloseModal(false)}
        footer={[]}
    >
        <Form
            form={form}
            name="register"
            onFinish={onSubmit}
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '100%',
            }}
            initialValues= {{
                name: TotalDados.name,
                phone: TotalDados.phone,
                document: TotalDados.document,
                registration: TotalDados.registration,
            }}
        >
            <Form.Item name="email" label="E-mail" initialValue={TotalDados.email} rules={[
                {
                    type: 'email',
                    message: 'O E-mail esta invalido!',
                },
            ]} style={{width: '100%', maxWidth: '500px', marginTop: '30px'}}>
                <Input/>
            </Form.Item>
            <Form.Item name="name" label="Nome" rules={[
                {
                    required: true,
                    message: 'Nome deve ser preenchido',
                },]} style={{width: '100%', maxWidth: '500px'}}>
                <Input/>
            </Form.Item>
            <Form.Item name="phone" label="Telefone" rules={[
                {
                    required: true,
                    message: 'Telefone deve ser preenchido',
                },
            ]} >
                <MaskedInput mask="(11)111111111" size="20"/>
            </Form.Item>
            <Form.Item name="document" label="CPF"    rules={[
                {
                    validator: (_, value) =>
                        value.replace(' ', '').replace(/[^\d]+/g,'').length<11 ? Promise.reject(new Error('CPF invalido')):Promise.resolve() ,
                },
            ]}
            >
                <MaskedInput mask="111.111.111-11" size="20" />
            </Form.Item>
            <Form.Item name="registration" label="Matrícula"
                       rules={[
                           {
                               required: true,
                               message: 'Matrícula deve ser preenchido',
                           },]} >
                <Input/>
            </Form.Item>
            <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <Button type="primary" htmlType="submit">
                Salvar
            </Button>
            </div>
        </Form>
    </Modal>
    )
}
export default ModalEdit;
