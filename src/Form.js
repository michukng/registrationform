import { useState, useEffect, useRef } from 'react';
import api from './api/users';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; 
    const MAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

const Form = () => {  

    const userRef = useRef();

    const API_URL = 'http://localhost:3500/users'
    
    const [data, setData] = useState([]);

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [confPwd, setConfPwd] = useState('');
    const [validConfPwd, setValidConfPwd] = useState(false);
    const [confPwdFocus, setConfPwdFocus] = useState(false);

    const [userExist, setUserExist] = useState(false);
    const [mailExist, setMailExist] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(API_URL);
                setData(response)
            } catch (err) {
                console.log(err)
            }
        };
        fetchData();
    }, [data])

    useEffect(() => {
        const result = USER_REGEX.test(username);
        setValidName(result);
    }, [username]);

    useEffect(() => {
        const result = MAIL_REGEX.test(mail);
        setValidMail(result);
    }, [mail]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === confPwd;
        setValidConfPwd(match);
    }, [pwd, confPwd]);

    const handleSubmit = (e) => {
        e.preventDefault();
        for (let i=0; i<data.data.length; i++) {
            if (data.data[i].username.toLowerCase() === username.toLowerCase()) {
                setUserExist(true);
                console.log(data.resposne)
                break
            } else {
                setUserExist(false);
                for (let j=0; j<data.data.length; j++) {
                    if (data.data[j].mail.toLowerCase() === mail.toLowerCase()) {
                        setMailExist(true)
                        break
                    } else {
                        setMailExist(false)
                        if (validName && validMail && validPwd && validConfPwd && !userExist && !mailExist) {
                            console.log("i")
                            let i = 0;
                            i = i+1
                            console.log(i)
                        }
                    };
                };
            };
        };
        
        
    };


  return (
    <main>
      <form>
        <p className={userExist ? "userIsTaken" : "hide"}>Nazwa użytkownika jest zajęta!</p>
        <p className={!userExist && mailExist ? "mailIsTaken" : "hide"}>Adres mail jest zajęty!</p>
        <label htmlFor="Login">
            Nazwa użytkownika
            <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validName || !username ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
        </label>
        <input
            type="text"
            id="Login"
            ref={userRef}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='off'
            onFocus={() => setUsernameFocus(true)}
            onBlur={() => setUsernameFocus(false)}
        />
        <p className={username && usernameFocus && !validName ? "instruction" : "off-screen"}>
        4 do 25 znaków. <br />
        Nazwa użytkownika musi zaczynać się literą.<br />
        Dozwolone są znaki specjalne.<br />
        </p>
        <label htmlFor="mail">
            Mail
            <span className={validMail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validMail || !mail ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
        </label>
        <input
            type='email'
            id="mail"
            autoComplete='off'
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            onFocus={() => setMailFocus(true)}
            onBlur={() => setMailFocus(false)}
        />
        <p className={mail && mailFocus && !validMail ? "instruction" : "off-screen"}>
        Nieprawidłowy format maila.<br />
        </p>
        <label htmlFor='password'>
            Hasło
            <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
        </label>
        <input
            type="password"
            id="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
        />
        <p className={pwd && pwdFocus && !validPwd ? "instruction" : "off-screen"}>
        8 do 24 znaków.<br />
        Musi zawierać duże oraz małe litery, cyfrę i znak specjalny.<br />
        Dozwolone znaki specjalne: !@#$
        </p>
        <label htmlFor="confirm password">
            Powtórz hasło
            <span className={validConfPwd && confPwd? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validConfPwd || !confPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
            </span>
        </label>
        <input
            type="password"
            id="confirm password"
            value={confPwd}
            onChange={(e) => setConfPwd(e.target.value)}
            onFocus={() => setConfPwdFocus(true)}
            onBlur={() => setConfPwdFocus(false)}
        />
        <p className={confPwd && confPwdFocus && !validConfPwd ? "instruction" : "off-screen"}>
        Hasła różnią się od siebie.
        </p>
        <p className='p-already-registered'>Masz już konto? Zaloguj się.</p>
        <button
            type="submit" 
            className='reg-btn'
            onClick={handleSubmit}>
            Zarejestruj się
        </button>
      </form>
    </main>
  )
}

export default Form
