const assets = {};

function loadStyle(path, base = 'styles') {
    path = `${base}/${path}.css`;
    if (path in assets) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = path;
    document.head.appendChild(link);
    assets[path] = true;
}

export { loadStyle };