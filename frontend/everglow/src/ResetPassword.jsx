// ResetPassword.jsx
import { useState } from 'react';

export default function ResetPassword() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const id = params.get('id');

  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch('/auth/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, token, password: pw })
    });
    const data = await res.json();
    if (data.ok) setMsg('Password reset successful');
    else setMsg(data.error || 'Failed');
  };

  return (
    <form onSubmit={submit}>
      <input type="password" value={pw} onChange={e => setPw(e.target.value)} required />
      <button>Reset</button>
      <div>{msg}</div>
    </form>
  );
}
