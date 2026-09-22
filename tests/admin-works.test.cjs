const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

function load(file, dependencies = {}) {
  const output = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  new Function('require', 'exports', output)((name) => {
    if (!(name in dependencies)) throw new Error(`Unexpected dependency: ${name}`);
    return dependencies[name];
  }, exports);
  return exports;
}

const input = load('src/lib/admin-work-input.ts');
const draft = { name: ' Object ', name_en: '', technique: '', materials: '', story: '' };
const photo = new File(['image test bytes'], 'photo.png', { type: 'image/png' });

test('empty details are saved as an array, not null or encoded JSON', () => {
  const result = input.buildWorkPayload(draft, 'https://example.com/cover.png', []);
  assert.equal(result.name, 'Object');
  assert.deepEqual(result.detail_images, []);
  assert.deepEqual(JSON.parse(JSON.stringify(result)).detail_images, []);
});

test('reject missing cover, unsupported images, oversized files and excess details', () => {
  assert.throws(() => input.validateImages(undefined, []));
  assert.throws(() => input.validateImages(new File(['svg'], 'a.svg', { type: 'image/svg+xml' }), []));
  assert.throws(() => input.validateImages({ name: 'huge.jpg', type: 'image/jpeg', size: 11 * 1024 * 1024 }, []));
  assert.throws(() => input.validateImages(photo, Array(13).fill(photo)));
  assert.doesNotThrow(() => input.validateImages(photo, [photo]));
});

function fixture({ role = 'admin', failedUpload = 0, insertError = null } = {}) {
  const state = { uploads: [], removed: [], payload: null };
  const bucket = {
    upload: async (path) => {
      state.uploads.push(path);
      return { error: state.uploads.length === failedUpload ? { message: 'upload denied' } : null };
    },
    getPublicUrl: (path) => ({ data: { publicUrl: `https://example.com/${path}` } }),
    remove: async (paths) => { state.removed.push(...paths); return { error: null }; },
  };
  const supabase = {
    auth: { getUser: async () => ({ data: { user: { id: 'admin-id', app_metadata: { role } } }, error: null }) },
    storage: { from: (name) => { assert.equal(name, 'works-images'); return bucket; } },
    from: (table) => {
      assert.equal(table, 'works');
      return { insert: async (payload) => { state.payload = payload; return { error: insertError }; } };
    },
  };
  const { createWork } = load('src/lib/admin-works.ts', {
    '@/lib/supabase': { supabase }, './admin-work-input': input,
  });
  return { state, createWork };
}

test('non-admin cannot start uploads or save works', async () => {
  const { state, createWork } = fixture({ role: 'user' });
  await assert.rejects(createWork(draft, photo, []), /管理员/);
  assert.equal(state.uploads.length, 0);
  assert.equal(state.payload, null);
});

test('uploads cover then details and inserts public URLs as an array', async () => {
  const { state, createWork } = fixture();
  const id = await createWork(draft, photo, [photo, photo]);
  assert.equal(state.payload.id, id);
  assert.equal(state.uploads.length, 3);
  assert.equal(state.payload.cover_image, `https://example.com/${state.uploads[0]}`);
  assert.deepEqual(state.payload.detail_images, state.uploads.slice(1).map((p) => `https://example.com/${p}`));
  assert.equal(new Set(state.uploads).size, 3);
});

test('partial upload failure cleans attempted paths and never inserts a work', async () => {
  const { state, createWork } = fixture({ failedUpload: 2 });
  await assert.rejects(createWork(draft, photo, [photo]), /上传失败/);
  assert.deepEqual(state.removed, state.uploads);
  assert.equal(state.payload, null);
});

test('unconfirmed insert preserves images and identifies the record to inspect', async () => {
  const { state, createWork } = fixture({ insertError: { message: 'network timeout' } });
  await assert.rejects(createWork(draft, photo, []), (error) => error.message.includes(state.payload.id));
  assert.deepEqual(state.removed, []);
});
