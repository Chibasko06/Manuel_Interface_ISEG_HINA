# Manuel d'utilisation ISEG / HINA - EPICS

Manuel utilisateur de l'interface Phoebus developpee pour superviser une alimentation Haute Tension ISEG dans le cadre du projet HINA a l'IJCLab.

Le projet HINA designe l'installation experimentale globale. L'interface documentee ici n'est pas tout le systeme HINA : elle correspond a une brique du futur controle-commande global, dediee uniquement a l'alimentation ISEG.

Le contenu s'appuie sur le rapport de stage et la soutenance de Mohammed Chibani Bahi : contexte HINA, alimentation ISEG, architecture EPICS, PV, IOC embarque, interface principale, fenetres de reglage, vue detaillee et depannage.

## Structure

```text
manual/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
├── assets/
└── README.md
```

## Installation

Aucune installation n'est requise. Ouvrir directement `index.html` dans un navigateur moderne.

Le site fonctionne sans framework et sans serveur local. Les polices Inter sont chargees depuis Google Fonts si l'acces reseau est disponible ; sinon le navigateur utilise les polices systeme de secours.

## Contenu documente

- Ecran principal `main.bob` : 12 canaux, ON/OFF, Trip, Vset, Vmeas, Imeas, Details.
- Fenetre `voltage_settings.bob` : consigne tension, mesure, nominal, rampes, VTC.
- Fenetre `current_settings.bob` : consigne courant, mesure, nominal, rampes, Trip mode, Trip delay.
- Vue `detail_channel.bob` : blocs States, Alarmes, Voltage et Current.
- Depannage : communication EPICS, IOC embarque, et cas `UDF INVALID` corrige avec `field(SCAN, "1 second")`.

## Personnalisation et maintenance

- Modifier le contenu des chapitres dans `index.html`.
- Mettre a jour les captures dans `images/` si les displays Phoebus evoluent.
- Documenter toute modification de PV, macro Phoebus ou fichier EPICS.
- Garder une version du manuel associee aux fichiers `.bob`, `.db`, `.sub` et `.pv` utilises.

## Ajout de captures

Les captures reelles de l'interface sont stockees dans `manual/images/` :

- `main.png` : ecran principal de controle-commande.
- `voltage_settings.png` : fenetre de reglage tension.
- `current_settings.png` : fenetre de reglage courant.
- `detail_channel.png` : vue detaillee d'un canal.

1. Placer les captures dans `manual/images/`.
2. Utiliser un nom explicite, par exemple `capture-voltage.png`.
3. Ajouter l'image dans une carte :

```html
<figure class="image-card">
  <img src="images/capture-voltage.png" alt="Fenetre Voltage reelle" data-full="images/capture-voltage.png">
  <figcaption>Fenetre Voltage de l'interface de supervision ISEG.</figcaption>
</figure>
```

Les images sont automatiquement agrandissables au clic.

## Export PDF

Ouvrir `index.html`, puis utiliser le bouton d'impression ou le raccourci du navigateur. Choisir l'option "Enregistrer en PDF". La feuille de style contient des regles dediees pour masquer le menu, conserver les tableaux et ameliorer la mise en page imprimee.

## Maintenance

Mettre a jour les sections Depannage, FAQ et Glossaire lorsque de nouveaux cas d'exploitation sont identifies pendant les tests ou l'integration future dans le systeme global HINA.
