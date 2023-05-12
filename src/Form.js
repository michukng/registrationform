import { useState, useEffect } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Form = () => {

    const [visible, setVisible ] = useState(false);
    const [iconVisible, setIconVisible] = useState(<AiOutlineEyeInvisible />);
    const [inputType, setInputType] = useState("password");
    const [iconClass, setIconClass] = useState("icon-invisible");

    useEffect(() => {
        setVisible(false);
    }, []);

    const handleVisible = (e) => {
        e.preventDefault();
        if (!visible) {
            setVisible(true);
            setIconVisible(<AiOutlineEye />);
            setInputType("text");
            setIconClass("icon-visible");
        } else {
            setVisible(false);
            setIconVisible(<AiOutlineEyeInvisible />);
            setInputType("password");
            setIconClass("icon-invisible");
        }
    }
    
  return (
    <main>
      <form>
        <label htmlFor="Login">
            Nazwa użytkownika
        </label>
        <input
            type="text"
        />
        <label htmlFor="mail">
            Mail
        </label>
        <input
            type='email'
        />
        <label htmlFor='pasword'>
            Hasło
        </label>
        <input
            type={inputType}
        />
        <button className={iconClass} onClick={handleVisible}>
            {iconVisible}
        </button>
        <label htmlFor="Repeat password">
            Powtórz hasło
        </label>
        <input
            type={inputType}
        />
        <button className={iconClass} onClick={handleVisible}>
            {iconVisible}
        </button>
        <p className='p-already-registered'>Masz już konto? Zaloguj się.</p>
        <button type="submit" className='reg-btn'>
            Zarejestruj się
        </button>
      </form>
    </main>
  )
}

export default Form
