import axios from "axios";
import React, {useState, useContext} from "react";
import {IsLoginContext} from "./App.js";
import { Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components';

let LoginForm = styled.div`
    width: 22rem;
    margin: auto;
    padding-bottom: 3rem;

    input, button {
        width: 100%;
        height: 3rem;
        margin-bottom: 1rem;
    }
    input {
        border: solid 1px lightgrey;
        border-radius: 4px;
        padding: 0.7rem;
    }
    h3 {
        font-weight: bold;
        text-align: left;
    }
    p {
        text-align: left;
    }
`
let Signin = styled.span`
  font-size: 13pt;
  text-decoration: underline;
`
let Alarm = styled.div`
    width: 100%;
    text-align: left;
    color: red;
    font-weight: bold;
    font-size: 13pt;
   
`

function Login() {

    let history = useHistory();

    let [alarm, setAlarm] = useState('')
    let [account, setAccount] = useState({
        userId: '',
        userPw: ''
    })
    let setIsLogin = useContext(IsLoginContext);

    // 아이디 : 영어/숫자 6-12자
    let idFormat = RegExp(/^[A-Za-z0-9]{6,12}$/);
    // 비밀번호 : 영어/숫자/특수문자(각 최소 1개씩) 조합 9-20자
    let passwordFormat = RegExp(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[~`!@#$%\^&*()-+=])[A-Za-z0-9~`!@#$%\^&*()-+=]{9,20}$/);

    let onChangeFunc = (e) => {
        setAccount({
            ...account, [e.target.name]: e.target.value
        })
    }

    let submitFunc = (e) => {
        e.preventDefault();

        if (!account.userId) { setAlarm('아이디가 입력되지 않았습니다.') }
        else if (!account.userPw) { setAlarm('비밀번호가 입력되지 않았습니다.') }
        else if (!idFormat.test(account.userId) || !passwordFormat.test(account.userPw)) {
            setAlarm('아이디 또는 비밀번호를 잘못 입력하셨습니다. 입력하신 내용을 다시 확인해주세요.')
        } else {
            alert('유효성검사 완료. Ajax를 시도합니다!');
            console.log(account);
            
            axios.post('/login', {
                    userId:account.userId,
                    userPw:account.userPw
                })
            .then(res => {
                // 
                console.log(res)
                // 서버에서 보내준 유저정보가 없으면 (아이디/비밀번호 틀리거나 회원정보 없는 경우)
                if(res) {
                    alert('로그인되었습니다🐢');
                    // 서버에서 response로 accessToken과 user정보가 넘어온다고 가정
                    // localStorage.setItem('accessToken', res['accessToken']);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    // 갖고있는 회원정보는 대여/로그인여부/마이페이지출입가능여부/마이페이지'~님'에만 쓰이므로 이름, 아이디만 가져와도 되는가?
                    
                    // 로컬스토리지에서 getItem하면 되니까 굳이 state에 담을 필요가 없는가?
                    // setIsLogin({
                    //     userName: '서버에서 갖고온 회원정보.유저이름',  // res['user'].userName
                    //     userId: '서버에서 갖고온 회원정보.유저아이디'   // res['user'].userId
                    // });

                    // 추가할일 : getItem이든 state값 확인이든 해서 App.js의 로그인/회원가입이 로그아웃으로 변경되도록 해야함
                    // 추가할일2 : 로그인 여부에 따른 회원가입창 출입관리
                    history.push("/");
                } else {
                    setAlarm('아이디 또는 비밀번호를 잘못 입력하셨습니다.')
                }
            })
            .catch(error => {
                alert('통신실패! 에러명 : ' + error);
            });
        }
    }

    return (
        <LoginForm>
            <form onSubmit={submitFunc}>
                <h3>로그인</h3>
                <p>Go Book Go Book의 다양한 서비스를 누리세요!</p>
                <Alarm>{alarm}</Alarm>
                <input
                    type="text"
                    name="userId"
                    placeholder="아이디를 입력해주세요."
                    onChange={onChangeFunc}
                ></input>
                <input
                    type="password"
                    name="userPw"
                    placeholder="비밀번호를 입력해주세요."
                    onChange={onChangeFunc}
                ></input>
                
                <Button variant="primary" type="submit" size="lg">로그인</Button>
                아이디가 없으신가요?&nbsp;&nbsp;&nbsp;
                <Signin><Link to="/signin">회원가입</Link></Signin>
            </form>
        </LoginForm>
    );
}

export default Login;
