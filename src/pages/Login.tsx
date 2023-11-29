import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { useLocalStorage } from '../hooks/useLocalStorage';

type User = {
  email: string,
  password: string,
};

function Login() {
  const navigate = useNavigate();

  const INITIAL_STATE = { email: '', password: '' };
  const [form, setForm] = useState<User>(INITIAL_STATE);
  const { email, password } = form;

  const { setItem } = useLocalStorage('user');

  const validadeForm = (validator.isEmail(email) && password.length > 6);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  // seta para o localStorage o e-mail e vai para rota /meals.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItem({ email });
    navigate('/meals');
  };

  return (
    <div
      className="w-screen h-screen flex bg-gradient-to-tr from-indigo-950
      via-blue-950 to-blue-900 items-center justify-center"
    >
      <form
        className="w-3/4 h-4/5 flex p-5 flex-col items-center
          justify-around shadow-2xl bg-blue-400 rounded-md sm:flex-row "
        onSubmit={ handleSubmit }
      >
        <div className="flex flex-col gap-3">
          <label
            htmlFor="email"
            className="shadow-lg shadow-blue-950/50
          bg-blue-800/50 rounded-md p-1 sm:w-72 sm:h-16 flex h-16 items-center
          "
          >
            E-mail:
            <input
              className="bg-transparent focus:outline-none ml-2"
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
            className="shadow-lg shadow-blue-950/50
          bg-blue-800/50 rounded-md p-1 sm:w-72 sm:h-16 flex h-16 items-center
          "
          >
            Password:
            <input
              className="bg-transparent focus:outline-none ml-2 "
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
          className="w-36 transition ease-in-out
          delay-150 bg-blue-800/50 hover:-translate-y-1
          hover:scale-110 hover:bg-blue-800 duration-300 p-2 rounded-md
          hover:text-blue-200 shadow-lg shadow-blue-950/50
          "
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
