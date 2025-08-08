export const mapYupErrors = (errors) => {
  if (!errors || !errors.inner) return {};
  const out = {};
  for (const e of errors.inner) {
    if (!out[e.path]) out[e.path] = e.message;
  }
  return out;
};
