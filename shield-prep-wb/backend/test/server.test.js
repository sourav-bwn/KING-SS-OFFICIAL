const test = require('node:test');
const assert = require('node:assert');
const app = require('../server');

let server;
let base;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      base = `http://127.0.0.1:${server.address().port}`;
      resolve();
    });
  });
});

test.after(() => server.close());

const post = (path, body, token) =>
  fetch(base + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(body || {}),
  });

test('register rejects missing required fields', async () => {
  for (const body of [
    {},
    { phone: '5550000001' },
    { phone: '5550000001', password: 'x' },
    { password: 'x', name: 'No Phone' },
  ]) {
    const r = await post('/auth/register', body);
    assert.equal(r.status, 400, JSON.stringify(body));
    const d = await r.json();
    assert.match(d.message, /required/);
  }
});

test('register with all fields succeeds and awaits approval', async () => {
  const r = await post('/auth/register', {
    phone: '5550000002',
    password: 'secret',
    name: 'New Student',
  });
  assert.equal(r.status, 200);
  const d = await r.json();
  assert.match(d.message, /approval/i);
});

test('admin user listing never includes passwords', async () => {
  const login = await post('/auth/login', {
    phone: '1234567890',
    password: 'password',
  });
  assert.equal(login.status, 200);
  const { token } = await login.json();
  const r = await fetch(base + '/admin/users', {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert.equal(r.status, 200);
  const raw = await r.text();
  const users = JSON.parse(raw);
  assert.ok(users.length >= 2);
  for (const u of users) {
    assert.ok(!('password' in u), 'password must not be exposed');
    assert.ok(u.phone && u.role, 'other fields remain');
  }
  // prove no password field and no stored secret value leaks into the body
  assert.ok(!raw.includes('"password"'), 'no password field at all');
  for (const secret of ['password', 'studentpass']) {
    assert.ok(
      !raw.includes(`"${secret}"`) && !raw.includes(`:${JSON.stringify(secret)}`),
      `stored secret "${secret}" must not appear in the response body`
    );
  }
});

test('content requires authentication', async () => {
  const r = await fetch(base + '/content');
  assert.equal(r.status, 401);
});
