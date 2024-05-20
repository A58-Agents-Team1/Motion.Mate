export default function LoginBy({
  placeholder,
  type,
  form,
  updateForm,
  handleLogin,
}) {
  return (
    <>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>{placeholder}</span>
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className='input input-bordered'
          value={form.email}
          onChange={updateForm(placeholder.toLowerCase())}
          required
        />
      </div>
      <div className='form-control'>
        <label className='label'>
          <span className='label-text'>Password</span>
        </label>
        <input
          type='password'
          placeholder='password'
          className='input input-bordered'
          value={form.password}
          onChange={updateForm('password')}
          required
        />
        <label className='label'>
          <a
            href='#'
            className='label-text-alt link link-hover'
          >
            Forgot password?
          </a>
        </label>
      </div>
      <div className='form-control mt-6'>
        <button
          type='button'
          className='btn btn-primary'
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </>
  );
}
