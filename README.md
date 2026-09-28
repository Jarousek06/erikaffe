# ERIKAFFE — web

Statický web pro kavárnu **ERIKAFFE** (Štětí). Žádný build, žádné závislosti —
čisté HTML + CSS + JS.

## Struktura

```
erikaffe/
├── index.html     celá stránka
├── style.css      styl
├── main.js        interakce (menu, scroll, apod.)
└── README.md
```

## Lokální spuštění

```bash
python -m http.server 5178 --directory erikaffe
```

Pak otevřít http://localhost:5178

## Nasazení

[Netlify Drop](https://app.netlify.com/drop) — přetáhnout celou složku `erikaffe/`.
