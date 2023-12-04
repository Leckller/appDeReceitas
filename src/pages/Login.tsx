import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { setItem } from '../utils/localStorage';

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
      bg-blue-400"
    >
      <form
        className="w-3/4 h-4/5 flex p-5 flex-col items-center
          justify-center shadow-2xl shadow-blue-950 rounded-2xl
          gap-16
        "
        onSubmit={ handleSubmit }
      >
        {' '}
        <h1>
          Recipes App
        </h1>
        <div className="flex flex-col gap-3">
          <label
            htmlFor="email"
            className="border border-blue-950 p-2
            flex flex-row items-center
          "
          >
            Email:
            <input
              className="w-full p-2 bg-transparent outline-none"
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
            className="border border-blue-950 p-2
            flex flex-row items-center
          "
          >
            Password:
            <input
              className="w-full p-2 bg-transparent outline-none"
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
          className=" w-5/6 border border-blue-950 p-2
          disabled:cursor-not-allowed
          "
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
