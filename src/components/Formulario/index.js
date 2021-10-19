import React, {useState} from 'react';
import {
    Form,
    Input,
    Button,
    notification
} from 'antd';
import MaskedInput from 'antd-mask-input';
import api from '../../services/api';


const RegisterForm = () => {
    const key = `open${Date.now()}`;
    const close = () => {
    };
    const [form] =Form.useForm();
    const onSubmit = async (values)=>{
        try {
            const response = await api.post('/users', {
               email: values.email,
                name: values.name,
                phone: values.phone.replace(' ', '').replace(/[^\d]+/g,''),
                document: values.document.replace(' ', '').replace(/[^\d]+/g,''),
                registration: values.registration
            });
            notification.open({
                message: 'Sucesso',
                description:
                    'Cadastro realizado com sucesso',
                key,
                onClose: close,
            });
            form.resetFields()
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

    return(
        <Form
            form={form}
            name="register"
            onFinish={onSubmit}
            style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        > <h1>Formulário de adição de usuários </h1>
            <Form.Item name="email" label="E-mail" rules={[
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
                <Button type="primary" htmlType="submit">
                    Salvar
                </Button>
        </Form>
    )
}
export default RegisterForm;
