function Login() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          data-testid="password-input"
        />
        <button
          data-testid="password-input"
        >
          Enter
        </button>
      </form>
    </div>
  );
}

export default Login;
