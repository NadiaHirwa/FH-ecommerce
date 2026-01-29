const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
const UPLOADS = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS)) fs.mkdirSync(UPLOADS, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + '-' + Math.random().toString(36).slice(2,8) + ext;
    cb(null, name);
  }
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.use('/uploads', express.static(UPLOADS));

app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const url = `/uploads/${req.file.filename}`;
  res.json({ url, path: url });
});

function readJson(name) {
  const f = path.join(DATA_DIR, name + '.json');
  try {
    if (!fs.existsSync(f)) fs.writeFileSync(f, JSON.stringify([]));
    return JSON.parse(fs.readFileSync(f));
  } catch (e) { return []; }
}
function writeJson(name, data) {
  const f = path.join(DATA_DIR, name + '.json');
  fs.writeFileSync(f, JSON.stringify(data, null, 2));
}

// Generic CRUD for products/categories/brands
['products','categories','brands'].forEach((resource) => {
  app.get(`/api/admin/${resource}`, (req, res) => {
    res.json(readJson(resource));
  });

  app.post(`/api/admin/${resource}`, (req, res) => {
    const items = readJson(resource);
    const item = req.body;
    item.id = item.id || `${resource[0]}${Date.now()}`;
    items.unshift(item);
    writeJson(resource, items);
    res.json(item);
  });

  app.put(`/api/admin/${resource}/:id`, (req, res) => {
    const items = readJson(resource);
    const idx = items.findIndex(i => String(i.id) === String(req.params.id));
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    items[idx] = { ...items[idx], ...req.body };
    writeJson(resource, items);
    res.json(items[idx]);
  });

  app.delete(`/api/admin/${resource}/:id`, (req, res) => {
    let items = readJson(resource);
    items = items.filter(i => String(i.id) !== String(req.params.id));
    writeJson(resource, items);
    res.json({ ok: true });
  });
});

const PORT = process.env.PORT || 5176;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
