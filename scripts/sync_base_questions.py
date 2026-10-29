#!/usr/bin/env python3
"""
Copie la base « Enceinte, j'ai le droit de… ? » du Google Sheet dans l'app (public/app/index.html).

Le sheet fait foi : on corrige une fiche dans le sheet, puis on relance ce script.
Les fiches sont écrites dans le bloc <script id="baseQ" type="application/json"> de l'app.

Usage : python3 scripts/sync_base_questions.py
Auth : token Google du compte perso via gapi.py (vault, skill pre-audit-seo-la-raiponse, alias "default").
"""
import json, re, sys, urllib.parse
from pathlib import Path

sys.path.insert(0, "/Users/sandranussbaum/Documents/Second cerveau/Second Cerveau Sandra/3 TOOLS/skills/pre-audit-seo-la-raiponse")
import gapi

SHEET = "1rwOj-2kTmHjj_3-fFivV045mR3pYKg3RpsUCu7ROkx4"
APP = Path(__file__).resolve().parent.parent / "public" / "app" / "index.html"
HEAD = ["Catégorie", "Objet", "Synonymes (recherche)", "Verdict", "Pourquoi", "Condition", "Organisme", "Lien", "Statut de la source"]
VERDICT = {"Oui": "oui", "Avec précaution": "prudence", "Non": "non", "Pas de position": "aucune"}

url = f"https://sheets.googleapis.com/v4/spreadsheets/{SHEET}/values/" + urllib.parse.quote("Base!A1:K400")
rows = gapi.call(url, alias="default")["values"]
assert rows[0][:9] == HEAD, f"En-tête du sheet inattendu : {rows[0][:9]}"

base = []
for r in rows[1:]:
    r = (r + [""] * 11)[:11]
    if not r[1].strip():
        continue
    assert r[3] in VERDICT, f"Verdict inconnu pour {r[1]} : {r[3]!r}"
    officiel = not r[8].lower().startswith("pas de position") and r[6] not in ("", "-", "aucune")
    base.append({
        "c": r[0], "o": r[1].strip(), "s": r[2].strip(), "v": VERDICT[r[3]],
        "p": r[4].strip(), "k": r[5].strip() if r[5].strip().lower() not in ("aucune", "-") else "",
        "g": r[6].strip() if officiel else "", "u": r[7].split(" ; ")[0].strip() if r[7].startswith("http") else "",
    })
    if "bon sens" in r[8].lower():
        base[-1]["b"] = 1  # la fiche contient un repère de bon sens, pas une consigne officielle

html = APP.read_text()
bloc = re.compile(r'(<script id="baseQ" type="application/json">)(.*?)(</script>)', re.S)
assert bloc.search(html), "Bloc baseQ introuvable dans l'app"
payload = json.dumps(base, ensure_ascii=False, separators=(",", ":")).replace("</", "<\\/")
APP.write_text(bloc.sub(lambda m: m.group(1) + payload + m.group(3), html, count=1))
print(f"{len(base)} fiches copiées dans {APP.relative_to(APP.parent.parent.parent)}")
