/**
 * Test Runner for The_89_Blog
 * Run with: npm test
 */

const assert = require('assert');
const http = require('http');

console.log('🧪 Running tests for The_89_Blog...');

// Test 1: Check module structure
try {
  const app = require('../src/server.js');
  assert.ok(app, 'Server module should exist');
  console.log('✅ Server module loads');
} catch (err) {
  console.error('❌ Server module failed to load:', err);
  process.exit(1);
}

// Test 2: Check server responsiveness
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET',
  timeout: 3000
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    assert.strictEqual(res.statusCode, 200, 'Homepage should return 200');
    assert.ok(data.includes('The_89_Project'), 'Page should contain site title');
    console.log('✅ Homepage responds correctly');

    // Test 3: Check admin page
    const adminReq = http.get('http://localhost:3000/admin', (aRes) => {
      let aData = '';
      aRes.on('data', chunk => aData += chunk);
      aRes.on('end', () => {
        assert.strictEqual(aRes.statusCode, 200, 'Admin page should return 200');
        assert.ok(aData.includes('Admin Panel'), 'Admin page should contain title');
        console.log('✅ Admin panel accessible');

        console.log('📝 All core tests passed! Blog is ready.');
      });
    });
    adminReq.on('error', (e) => console.error('❌ Admin page error:', e));
    adminReq.setTimeout(3000, () => adminReq.abort());
  });
});

req.on('error', (e) => {
  console.error('❌ Server not responding. Make sure it is running with: npm start');
  console.error('Error:', e.message);
  process.exit(1);
});

req.setTimeout(3000, () => {
  req.abort();
  console.error('❌ Server took too long to respond');
  process.exit(1);
});
