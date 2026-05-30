const collectionEl = document.getElementById('collection');
const fileEl = document.getElementById('file');
const convertBtn = document.getElementById('convert');
const errorEl = document.getElementById('error');
const swaggerWrap = document.getElementById('swagger-wrap');

fileEl.addEventListener('change', async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  collectionEl.value = await file.text();
});

convertBtn.addEventListener('click', async () => {
  errorEl.hidden = true;
  let body;
  try {
    body = JSON.parse(collectionEl.value.trim() || '{}');
  } catch {
    errorEl.textContent = 'Invalid JSON in collection field.';
    errorEl.hidden = false;
    return;
  }
  convertBtn.disabled = true;
  try {
    const res = await fetch('/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || data.error || res.statusText);
    }
    swaggerWrap.hidden = false;
    SwaggerUIBundle({
      spec: data,
      dom_id: '#swagger-ui',
      deepLinking: true,
    });
  } catch (err) {
    errorEl.textContent = err.message || String(err);
    errorEl.hidden = false;
  } finally {
    convertBtn.disabled = false;
  }
});
