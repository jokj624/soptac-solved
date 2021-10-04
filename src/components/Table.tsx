import React, { FC, useMemo, useEffect, useState } from "react";
import * as user from "../db/repositories/user";
import Input from "./Input";
import styled from "styled-components";
const REDIRECT = "https://solved.ac/profile/";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    algin-items: center;
`;

const Rating = styled.table`
    width: 100%;
    border-top: 1px solid #444444;
    border-collapse: collapse;

     th, td {
    border-bottom: 1px solid #444444;
    border-left: 1px solid #444444;
    padding: 10px;
    }
    th:first-child, td:first-child {
    border-left: none;
    }
`

export type User = {
    name: string;
    rating: number;
    solvedCount: number;
    tier: string;
};

const Table : FC = () => {
    const [allUser, updateUser] = useState([] as User[]);
    const userView = useMemo(() => {
        return allUser.map((user, index) => {
            return (
                <tbody key={index}>
                    <tr>
                        <td>{index+1}</td>
                        <td><a href = {REDIRECT + user.name}> {user.name} </a></td>
                        <td>{user.tier}</td>
                        <td>{user.solvedCount}</td>
                        <td>{user.rating}</td>
                    </tr>
                </tbody>
            );
        })
    }, [allUser.length]);

    useEffect(() => {
        const genAllUser = async () => {
            const data = await user.all();
            updateUser(data);
        };
        genAllUser();
    }, []);
    return (
        <Main>
        <Input updateUser = {updateUser} />
        <Rating>
            <thead>
                <tr>
                    <th>#</th>
                    <th>핸들</th>
                    <th>티어</th>
                    <th>푼 문제 수</th>
                    <th>레이팅</th>
                </tr>
            </thead>
            {userView}
        </Rating>
        </Main>
    );
};

export default Table;