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

  const { setItem } = useLocalStorage();

  const validadeForm = (validator.isEmail(email) && password.length > 6);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  // seta para o localStorage o e-mail e vai para rota /meals.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setItem({ email }, 'user');
    navigate('/meals');
  };

  return (
    <div
      className="w-screen h-screen flex bg-gradient-to-r from-black
      via-gray-400 to-white items-center justify-center"
    >
      <form
        className="w-3/4 h-4/5 flex p-5 flex-col items-center
          justify-center shadow-2xl bg-gradient-to-l from-black
          via-gray-400 to-white rounded-md sm:flex-row "
        onSubmit={ handleSubmit }
      >
        <div className="flex flex-col gap-3">
          <label
            htmlFor="email"
            className="shadow-lg shadow-blue-950/50 justify-center text-left
            bg-gradient-to-r from-black text-white hover:bg-gradient-to-l
            hover:text-black
            via-gray-400 to-white rounded-md pl-6 sm:w-72 sm:h-16 flex items-center
          "
          >
            Email:
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
            bg-gradient-to-l from-black hover:bg-gradient-to-r hover:text-white
            via-gray-400 to-white rounded-md pl-2 sm:w-72 sm:h-16 flex items-center
          "
          >
            Password:
            <input
              className="bg-transparent focus:outline-none ml-2 max-w-full"
              type="password"
              name="password"
              id="password"
              data-testid="password-input"
              value={ password }
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="login-submit-btn"
            disabled={ !validadeForm }
            className="w-72 transition ease-in-out
          delay-150 bg-gradient-to-r from-black
          via-gray-400 to-white hover:-translate-y-1
          hover:scale-110 hover:bg-gradient-to-l duration-300 p-2 rounded-md
          hover:text-blue-200 shadow-lg shadow-blue-950/50
          "
          >
            Enter
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
