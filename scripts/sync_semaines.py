#!/usr/bin/env python3
"""
Copie le suivi « semaine par semaine » du Google Sheet dans l'app (public/app/index.html).

Le sheet fait foi : on corrige une semaine dans le sheet, puis on relance ce script.
Les semaines sont écrites dans le bloc <script id="semainesQ" type="application/json"> de l'app.

Usage : python3 scripts/sync_semaines.py
Auth : token Google du compte perso via gapi.py (vault, skill pre-audit-seo-la-raiponse, alias "default").
"""
import json, re, sys, urllib.parse
from pathlib import Path

sys.path.insert(0, "/Users/sandranussbaum/Documents/Second cerveau/Second Cerveau Sandra/3 TOOLS/skills/pre-audit-seo-la-raiponse")
import gapi

SHEET = "1eGKKLKrYTNSoBqE4ElQdGyTuxOITGYFItJklvMARrQ0"
APP = Path(__file__).resolve().parent.parent / "public" / "app" / "index.html"
HEAD = ["SA", "Titre (accueil)", "Ton bébé", "Et toi", "Quand appeler", "Sources"]

url = f"https://sheets.googleapis.com/v4/spreadsheets/{SHEET}/values/" + urllib.parse.quote("Semaines!A1:J60")
rows = gapi.call(url, alias="default")["values"]
assert rows[0][:6] == HEAD, f"En-tête du sheet inattendu : {rows[0][:6]}"

semaines = []
for r in rows[1:]:
    r = (r + [""] * 10)[:10]
    if not r[0].strip().isdigit() or not r[2].strip():
        continue
    sources = []
    for s in r[5].split(" ; "):
        if " : http" in s:
            n, u = s.split(" : ", 1)
            sources.append({"n": n.strip(), "u": u.strip()})
    semaines.append({"sa": int(r[0]), "t": r[1].strip(), "b": r[2].strip(), "m": r[3].strip(), "a": r[4].strip(), "u": sources})

html = APP.read_text()
bloc = re.compile(r'(<script id="semainesQ" type="application/json">)(.*?)(</script>)', re.S)
assert bloc.search(html), "Bloc semainesQ introuvable dans l'app"
payload = json.dumps(semaines, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
APP.write_text(bloc.sub(lambda m: m.group(1) + payload + m.group(3), html, count=1))
print(f"{len(semaines)} semaines copiées dans {APP.relative_to(APP.parent.parent.parent)}")
