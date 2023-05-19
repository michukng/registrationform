import { useState, useEffect, useRef } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Form = () => {

    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/; 
    const MAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;   

    const userRef = useRef();

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

    useEffect(() => {
        userRef.current.focus();
    }, []);

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
    }
    
  return (
    <main>
      <form>
        <label htmlFor="Login">
            Nazwa użytkownika
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
