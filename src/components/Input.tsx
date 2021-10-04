import React, { FC, Dispatch, SetStateAction, useEffect, useState } from "react";
import * as user from "../db/repositories/user";
import styled from "styled-components";
import axios from "axios";
const tier = require('../modules/tier');
const SERVER = 'https://solved.ac/api/v3/user/show';

const Form = styled.form`
    width: 90%;
`;

export type User = {
    name: string;
    rating: number;
    solvedCount: number;
    tier: string;
};

export type updateType = {
    updateUser: Dispatch<SetStateAction<User[]>>
};

const Input: FC<updateType> = ({ updateUser }) => {
    const [state, setstate] = useState<any>({});
    const [form, setForm] = useState({ name : '' });
    const [check, setCheck] = useState(false);

    useEffect(() => {
        const addUser = async () => {
            if (check) {
                const data: User = {
                    name: state.handle,
                    rating: state.rating,
                    solvedCount: state.solvedCount,
                    tier: tier.default[+state.tier - 1],
                }
                await user.create(data);
                setstate({});
                setCheck(false);
                updateUser((userList) => {
                    return [...userList, data];
                })
            }
        }
        addUser();
    }, [check]);

    const onSubmit = async (form: { name: string; }) => {
        const { name } = form;
        try {
            const response = await axios.get(SERVER, { params: { handle: name } });
            setstate(response.data);
            if(state) setCheck(true);
        } catch (error) {
            console.log(error)
            alert('없는 사용자');
        }
    };
    
    const { name } = form;
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(form);
        setForm({ name: '' }); // 초기화
    };

    return (
        <Form onSubmit={handleSubmit}>
            <input name="name" value={name} onChange={onChange} />
            <button type="submit">등록</button>
        </Form>
    );
};

export default Input;