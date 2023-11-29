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
    <div>
      <form
        onSubmit={ handleSubmit }
      >
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          value={ email }
          onChange={ handleChange }
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
          value={ password }
          onChange={ handleChange }
        />
        <button
          data-testid="login-submit-btn"
          disabled={ !validadeForm }
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
