import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { setItem } from '../utils/localStorage';
import logo from '../assets/logoPintada2-removebg-preview.png';
import backSvg from '../assets/Animated Shape.svg';

type User = {
  email: string,
  password: string,
};

function Login() {
  const navigate = useNavigate();

  const INITIAL_STATE = { email: '', password: '' };
  const [form, setForm] = useState<User>(INITIAL_STATE);
  const { email, password } = form;

  const validadeForm = (validator.isEmail(email) && password.length > 6);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  // seta para o localStorage o e-mail e vai para rota /meals.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItem('user', { email });
    navigate('/meals');
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center
     flex-col"
    >
      <img src={ backSvg } alt="" className="absolute -z-10 w-screen h-screen" />
      <img src={ logo } alt="logo" className="p-10 w-96 translate-y-20 translate-x-2" />
      <form
        className="w-3/4 h-4/5 flex p-5 flex-col items-center
          justify-center
          gap-16
        "
        onSubmit={ handleSubmit }
      >
        <h1 className="text-blue-500">
          Recipes App
        </h1>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="email"
            className="border border-blue-600 p-2
            flex flex-row items-center text-blue-500
          "
          >
            Email:
            <input
              className="w-full p-2 bg-transparent outline-none text-blue-500"
              type="email"
              name="email"
              id="email"
              data-testid="email-input"
              value={ email }
              onChange={ handleChange }
            />
          </label>
          <label
            htmlFor="password"
            className="border border-blue-600 p-2
            flex flex-row items-center text-blue-500
          "
          >
            Password:
            <input
              className="w-56 p-2 bg-transparent outline-none text-blue-500"
              type="password"
              name="password"
              id="password"
              data-testid="password-input"
              value={ password }
              onChange={ handleChange }
            />
          </label>
        </div>
        <button
          data-testid="login-submit-btn"
          disabled={ !validadeForm }
          className=" w-56 border border-blue-600 p-2
          disabled:cursor-not-allowed text-blue-500
          "
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
