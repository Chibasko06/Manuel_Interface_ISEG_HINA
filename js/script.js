const root = document.documentElement;
const sidebar = document.getElementById("sidebar");
const openMenu = document.getElementById("openMenu");
const closeMenu = document.getElementById("closeMenu");
const themeToggle = document.getElementById("themeToggle");
const languageToggle = document.getElementById("languageToggle");
const printPage = document.getElementById("printPage");
const searchInput = document.getElementById("searchInput");
const searchCount = document.getElementById("searchCount");
const backToTop = document.getElementById("backToTop");
const mainNav = document.getElementById("mainNav");
const dynamicToc = document.getElementById("dynamicToc");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

const navLinks = [...mainNav.querySelectorAll("a")];
const sections = [...document.querySelectorAll("[data-title]")].filter((section) => section.id !== "sommaire");
const searchableSections = [...document.querySelectorAll(".doc-section, .hero")];
let currentLanguage = "fr";
let textNodeRegistry = [];

const englishTranslations = {
  "Manuel d'utilisation - Interface de supervision HINA": "User manual - HINA supervision interface",
  "Aller au contenu": "Skip to content",
  "Interface de contrôle-commande": "Control-command interface",
  "Accueil": "Home",
  "Présentation": "Overview",
  "Prérequis": "Prerequisites",
  "Lancement": "Launch",
  "Interface principale": "Main interface",
  "Gestion des canaux": "Channel management",
  "Réglage de la tension": "Voltage settings",
  "Réglage du courant": "Current settings",
  "Vue détaillée": "Detailed view",
  "Alarmes": "Alarms",
  "Dépannage": "Troubleshooting",
  "Glossaire": "Glossary",
  "À propos": "About",
  "Manuel ISEG / HINA": "ISEG / HINA Manual",
  "Version 1.0": "Version 1.0",
  "Manuel d'utilisation": "User manual",
  "Interface de contrôle-commande pour HINA": "Control-command interface for HINA",
  "Alimentation Haute Tension ISEG": "ISEG High Voltage Power Supply",
  "Auteur": "Author",
  "Laboratoire": "Laboratory",
  "Logiciel": "Software",
  "Capture réelle de l'écran principal de supervision des canaux haute tension.": "Real screenshot of the main high-voltage channel supervision screen.",
  "Navigation": "Navigation",
  "Sommaire": "Contents",
  "Utilisez ce sommaire pour accéder directement aux chapitres de prise en main, de réglage, de diagnostic et de dépannage de l'interface de supervision ISEG.": "Use this table of contents to directly access the getting started, settings, diagnostics and troubleshooting chapters of the ISEG supervision interface.",
  "Le projet HINA est l'installation expérimentale globale. L'interface décrite dans ce manuel n'est qu'une brique de son futur système de contrôle-commande : elle supervise uniquement l'alimentation haute tension ISEG utilisée pour les quadrupôles électrostatiques.": "The HINA project is the complete experimental installation. The interface described in this manual is only one building block of its future control-command system: it supervises only the ISEG high-voltage power supply used for the electrostatic quadrupoles.",
  "Elle a été développée sous Phoebus pour rendre exploitables les données publiées par l'IOC EPICS intégré à l'alimentation. Son objectif est de donner aux utilisateurs une vue claire des 12 canaux : état ON/OFF, Trip, tensions, courants, consignes, mesures et accès aux réglages détaillés.": "It was developed with Phoebus to make the data published by the EPICS IOC embedded in the power supply usable. Its goal is to give users a clear view of the 12 channels: ON/OFF state, Trip state, voltages, currents, setpoints, measurements and access to detailed settings.",
  "On peut voir le contrôle-commande global de HINA comme un orchestre : cette interface correspond à un instrument, par exemple un violoncelle. Seule, elle ne pilote qu'une partie précise de l'installation ; avec les autres interfaces à venir, elle contribuera à former l'ensemble cohérent du système de contrôle-commande HINA.": "The global HINA control-command system can be seen as an orchestra: this interface is one instrument, for example a cello. On its own, it controls only one specific part of the installation; together with future interfaces, it will contribute to the coherent HINA control-command system.",
  "Pour lancer Phoebus depuis un terminal Linux, placez-vous dans le dossier d'installation de Phoebus, puis exécutez le script de démarrage :": "To launch Phoebus from a Linux terminal, go to the Phoebus installation folder, then run the startup script:",
  "Démarrer Phoebus avec": "Start Phoebus with",
  "Ouvrir l'écran principal": "Open the main screen",
  "depuis le menu d'ouverture de display.": "from the display open menu.",
  "Vérifier que les 12 lignes de canaux sont visibles et que les valeurs EPICS sont connectées.": "Check that the 12 channel rows are visible and that the EPICS values are connected.",
  "Contrôler l'état global de l'alimentation avec le voyant supérieur ON/OFF.": "Check the global power supply state with the upper ON/OFF indicator.",
  "Utiliser": "Use",
  "pour consulter la vue détaillée d'un canal, puis les fenêtres de réglage si nécessaire.": "to open the detailed view of a channel, then the settings windows if needed.",
  "Information": "Information",
  "Conseil": "Tip",
  "Attention": "Warning",
  "Dans ce manuel, le terme interface désigne l'interface de supervision de l'alimentation ISEG, et non le projet HINA complet.": "In this manual, the term interface refers to the ISEG power supply supervision interface, not to the full HINA project.",
  "Commencez toujours par l'écran principal : il permet de savoir si le problème concerne un canal précis ou l'ensemble de l'alimentation.": "Always start from the main screen: it helps determine whether the issue affects one channel or the whole power supply.",
  "Les réglages haute tension influencent directement les équipements expérimentaux. Ne modifiez une consigne que si la procédure d'exploitation vous y autorise.": "High-voltage settings directly affect experimental equipment. Modify a setpoint only if the operating procedure allows it.",
  "Chapitre suivant : Prérequis": "Next chapter: Prerequisites",
  "Avant d'utiliser l'interface, le poste de contrôle doit pouvoir communiquer avec l'alimentation ISEG via le réseau local du laboratoire et le protocole EPICS Channel Access.": "Before using the interface, the control workstation must be able to communicate with the ISEG power supply through the laboratory local network and the EPICS Channel Access protocol.",
  "Dans le cadre du développement, l'alimentation a été raccordée au réseau par un switch Ethernet et configurée avec une adresse IP fixe": "During development, the power supply was connected to the network through an Ethernet switch and configured with the fixed IP address",
  ". L'interface Phoebus s'appuie ensuite sur les PV publiées par l'IOC embarqué de l'alimentation, sans serveur EPICS externe supplémentaire.": ". The Phoebus interface then relies on the PVs published by the power supply embedded IOC, without any additional external EPICS server.",
  "Démarrer Phoebus avec le support Display Builder.": "Start Phoebus with Display Builder support.",
  "Vérifier que le poste de contrôle atteint l'alimentation ISEG sur le réseau local avec": "Check that the control workstation reaches the ISEG power supply on the local network with",
  "Contrôler que l'IOC embarqué publie les PV via Channel Access.": "Check that the embedded IOC publishes PVs through Channel Access.",
  "Vérifier l'accès aux fichiers": "Check access to the files",
  "et": "and",
  "Les outils EPICS utiles sont": "The useful EPICS tools are",
  "pour lire une PV,": "to read a PV,",
  "pour écrire une consigne et": "to write a setpoint and",
  "pour suivre une valeur en temps réel.": "to monitor a value in real time.",
  "Un test minimal consiste à lancer": "A minimal test is to run",
  ", puis à vérifier une mesure comme": ", then check a measurement such as",
  "avec": "with",
  "Une PV déconnectée ou en état": "A disconnected PV or a PV in",
  "indique que la valeur affichée n'est pas exploitable.": "state means that the displayed value is not usable.",
  "Chapitre suivant : Lancement": "Next chapter: Launch",
  "Le lancement démarre par l'ouverture de": "Launch starts by opening",
  ", l'écran principal qui donne accès aux 12 canaux de l'alimentation.": ", the main screen that gives access to the 12 power supply channels.",
  "Les fenêtres spécialisées sont réutilisées pour tous les canaux grâce aux macros Phoebus. La macro": "The specialized windows are reused for all channels thanks to Phoebus macros. The macro",
  "est remplacée par le numéro du canal sélectionné afin de construire dynamiquement les noms de PV, par exemple": "is replaced by the selected channel number in order to dynamically build PV names, for example",
  "Démarrer Phoebus.": "Start Phoebus.",
  "Ouvrir le fichier": "Open the file",
  "Attendre l'initialisation des widgets et la connexion des PV.": "Wait for widget initialization and PV connection.",
  "Cliquer sur": "Click",
  "sur un canal pour ouvrir": "on a channel to open",
  "Les scripts JavaScript Phoebus associent les widgets aux PV du canal au moment de l'ouverture des fenêtres spécialisées.": "Phoebus JavaScript scripts associate widgets with the channel PVs when specialized windows are opened.",
  "Si une fenêtre affiche le mauvais canal, vérifiez la valeur transmise à la macro": "If a window displays the wrong channel, check the value passed to the macro",
  "Ne travaillez pas sur une fenêtre dont les valeurs ne correspondent pas au canal sélectionné dans l'écran principal.": "Do not work on a window whose values do not match the channel selected on the main screen.",
  "Chapitre suivant : Interface principale": "Next chapter: Main interface",
  "L'écran principal": "The main screen",
  "fournit une vision globale des 12 canaux de l'alimentation ISEG.": "provides an overview of the 12 channels of the ISEG power supply.",
  "Chaque ligne correspond à un canal. L'utilisateur peut visualiser l'état ON/OFF, l'état Trip, la tension de consigne": "Each row corresponds to one channel. The user can view the ON/OFF state, the Trip state, the voltage setpoint",
  ", la tension mesurée": ", the measured voltage",
  ", le courant mesuré": ", the measured current",
  "et ouvrir la page détaillée avec le bouton": "and open the detailed page with the button",
  "Editables": "Editable",
  "Vset et consignes": "Vset and setpoints",
  "Les champs bleu clair correspondent aux valeurs que l'utilisateur peut modifier lorsque l'écriture est autorisée.": "Light blue fields correspond to values that the user can modify when writing is allowed.",
  "Consultables": "Read-only",
  "Vmeas, Imeas, Trip": "Vmeas, Imeas, Trip",
  "Les champs blancs ou gris affichent des valeurs mesurées ou des états renvoyés par l'IOC embarqué.": "White or grey fields display measured values or states returned by the embedded IOC.",
  "Actions": "Actions",
  "ON/OFF et Open": "ON/OFF and Open",
  "Le bouton ON/OFF agit sur le canal ; le bouton Open ouvre la vue détaillée du canal sélectionné.": "The ON/OFF button acts on the channel; the Open button opens the selected channel detailed view.",
  "Repérer la ligne du canal concerné, de": "Locate the relevant channel row, from",
  "à": "to",
  "Vérifier le voyant ON/OFF et le voyant Trip.": "Check the ON/OFF indicator and the Trip indicator.",
  "Comparer": "Compare",
  ", puis contrôler": ", then check",
  "pour consulter les détails, alarmes et réglages complets.": "to consult the complete details, alarms and settings.",
  "L'interface principale joue le rôle de tableau de bord : elle évite de consulter individuellement chaque PV EPICS.": "The main interface acts as a dashboard: it avoids having to inspect each EPICS PV individually.",
  "Une différence importante entre Vset et Vmeas peut indiquer une rampe en cours, un canal OFF ou une condition de protection.": "A significant difference between Vset and Vmeas may indicate an active ramp, an OFF channel or a protection condition.",
  "Le voyant Trip doit être traité comme une mise en sécurité du canal ; consultez la vue détaillée avant toute remise en service.": "The Trip indicator must be treated as a channel safety shutdown; consult the detailed view before restarting.",
  "Organisation réelle de l'écran principal : commandes, états, consignes et mesures.": "Actual organization of the main screen: commands, states, setpoints and measurements.",
  "Chapitre suivant : Gestion des canaux": "Next chapter: Channel management",
  "Un canal est une sortie indépendante de l'alimentation. Dans ce projet, les 12 canaux doivent pouvoir être surveillés séparément.": "A channel is an independent power supply output. In this project, the 12 channels must be monitored separately.",
  "La gestion courante d'un canal se fait d'abord depuis l'écran principal : l'utilisateur repère la ligne du canal, vérifie l'état ON/OFF, le Trip, la consigne tension et les mesures. Pour l'analyse complète d'un canal, consulter ensuite la section": "Routine channel management first takes place from the main screen: the user identifies the channel row, checks the ON/OFF state, Trip state, voltage setpoint and measurements. For complete channel analysis, then consult the section",
  "Identifier le canal dans l'écran principal.": "Identify the channel on the main screen.",
  "Contrôler Trip et les mesures affichées.": "Check Trip and the displayed measurements.",
  "En cas d'anomalie ou de doute, utiliser": "In case of an anomaly or doubt, use",
  "puis se reporter à la section": "then refer to the section",
  "Cette section se limite aux actions visibles sur l'écran principal ; les états internes du canal sont détaillés plus loin.": "This section is limited to actions visible on the main screen; internal channel states are detailed later.",
  "Après une modification, surveillez la rampe et attendez que la mesure se stabilise avant de passer au canal suivant.": "After a modification, monitor the ramp and wait for the measurement to stabilize before moving to the next channel.",
  "Un canal peut rester OFF malgré une commande si un Trip, une limite ou une condition matérielle interdit l'activation.": "A channel may remain OFF despite a command if a Trip, a limit or a hardware condition prevents activation.",
  "Gestion des canaux depuis l'écran principal : ON/OFF, Trip, consignes, mesures et Details.": "Channel management from the main screen: ON/OFF, Trip, setpoints, measurements and Details.",
  "Chapitre suivant : Réglage de la tension": "Next chapter: Voltage settings",
  "Paramètre": "Parameter",
  "Rôle": "Role",
  "Tension de consigne demandée par l'utilisateur pour le canal. Dans l'interface, ce champ apparaît en bleu clair lorsqu'il est modifiable.": "Voltage setpoint requested by the user for the channel. In the interface, this field appears light blue when it can be modified.",
  "Tension réellement mesurée par l'alimentation ISEG. Elle permet de vérifier si la tension appliquée suit bien la consigne.": "Voltage actually measured by the ISEG power supply. It checks whether the applied voltage follows the setpoint.",
  "Tension nominale maximale du canal. Elle sert de référence de sécurité pour éviter une consigne incompatible avec le matériel.": "Maximum nominal channel voltage. It is used as a safety reference to avoid setpoints incompatible with the hardware.",
  "Vitesse de montée de la tension lorsque la consigne augmente.": "Voltage ramp-up speed when the setpoint increases.",
  "Vitesse de descente de la tension lorsque la consigne diminue.": "Voltage ramp-down speed when the setpoint decreases.",
  "Valeur minimale autorisée pour la vitesse de rampe.": "Minimum allowed ramp speed.",
  "Valeur maximale autorisée pour la vitesse de rampe.": "Maximum allowed ramp speed.",
  "Coefficient de compensation thermique. Lorsque le module dispose de l'option VTC et d'un capteur connecté, la tension peut être ajustée selon la température du canal.": "Thermal compensation coefficient. When the module has the VTC option and a connected sensor, the voltage can be adjusted according to the channel temperature.",
  "Température externe mesurée par le capteur associé au canal, utilisée pour le suivi ou la compensation VTC.": "External temperature measured by the sensor associated with the channel, used for monitoring or VTC compensation.",
  "Depuis la vue du canal, ouvrir la fenêtre de réglage tension.": "From the channel view, open the voltage settings window.",
  "pour connaître la tension réelle.": "to know the actual voltage.",
  "avant toute modification.": "before any modification.",
  "Contrôler les vitesses de rampe puis suivre la stabilisation dans la vue détaillée.": "Check the ramp speeds, then monitor stabilization in the detailed view.",
  "Lors d'une rampe,": "During a ramp,",
  "évolue progressivement vers": "gradually moves toward",
  "au rythme défini par les paramètres de rampe.": "at the rate defined by the ramp parameters.",
  "pour observer l'évolution de la tension pendant un test.": "to observe voltage evolution during a test.",
  "Ne changez pas le coefficient VTC sans vérifier que l'option matérielle et le capteur de température sont présents.": "Do not change the VTC coefficient without checking that the hardware option and temperature sensor are present.",
  "Fenêtre Voltage réelle : consigne, mesure, limites et vitesses de rampe du canal.": "Actual Voltage window: setpoint, measurement, limits and channel ramp speeds.",
  "Chapitre suivant : Réglage du courant": "Next chapter: Current settings",
  "reprend la même logique que la fenêtre tension, mais pour les paramètres courant du canal.": "uses the same logic as the voltage window, but for channel current parameters.",
  "Elle permet de consulter le courant mesuré, de régler la limite de courant, de configurer les rampes et de vérifier les paramètres de déclenchement différé": "It lets the user read the measured current, set the current limit, configure ramps and check delayed trip parameters",
  "Consigne ou limite de courant appliquée au canal. Elle définit le seuil de fonctionnement attendu.": "Current setpoint or limit applied to the channel. It defines the expected operating threshold.",
  "Courant réellement mesuré par l'alimentation. Cette valeur permet de détecter une consommation anormale.": "Current actually measured by the power supply. This value helps detect abnormal consumption.",
  "Courant nominal maximal de référence pour le canal.": "Maximum nominal reference current for the channel.",
  "Vitesse de montée de la consigne ou limite courant.": "Ramp-up speed of the current setpoint or limit.",
  "Vitesse de descente de la consigne ou limite courant.": "Ramp-down speed of the current setpoint or limit.",
  "Valeur minimale autorisée pour la rampe courant.": "Minimum allowed current ramp value.",
  "Valeur maximale autorisée pour la rampe courant.": "Maximum allowed current ramp value.",
  "Délai avant déclenchement du Trip après dépassement ou condition de protection liée au courant.": "Delay before Trip triggering after an overrun or current-related protection condition.",
  "Mode de déclenchement associé au courant. Il définit le comportement de protection appliqué par l'alimentation.": "Current-related trip mode. It defines the protection behavior applied by the power supply.",
  "Ouvrir la fenêtre courant depuis le canal concerné.": "Open the current window from the relevant channel.",
  "Vérifier les rampes de courant.": "Check the current ramps.",
  "avant de modifier une limite.": "before changing a limit.",
  "visible dans la vue détaillée indique un fonctionnement en régulation ou limitation de courant.": "visible in the detailed view indicates operation in current regulation or limitation.",
  "Si un Trip survient, comparez le courant mesuré avec la limite configurée avant toute remise en route.": "If a Trip occurs, compare the measured current with the configured limit before restarting.",
  "ne doit pas servir à contourner un défaut ou une fuite réelle.": "must not be used to bypass a real fault or leakage.",
  "Fenêtre Current réelle : limites, mesures, rampes et paramètres de Trip.": "Actual Current window: limits, measurements, ramps and Trip parameters.",
  "Chapitre suivant : Vue détaillée": "Next chapter: Detailed view",
  "La vue": "The view",
  "regroupe les informations complètes du canal sélectionné.": "groups the complete information for the selected channel.",
  "Elle reprend les blocs Voltage et Current, ajoute un bloc d'états et un bloc d'alarmes. C'est la fenêtre à consulter lorsqu'un canal ne réagit pas comme prévu, lorsqu'un Trip apparaît ou lorsque l'on veut confirmer le mode de régulation réel.": "It includes the Voltage and Current blocks, adds a states block and an alarms block. This is the window to consult when a channel does not react as expected, when a Trip appears, or when the real regulation mode must be confirmed.",
  "Indicateur": "Indicator",
  "Description": "Description",
  "Vue synthétique de l'état du canal dans le bloc States.": "Synthetic view of the channel state in the States block.",
  "Retour matériel indiquant si le canal est réellement activé, indépendamment de la commande demandée.": "Hardware feedback indicating whether the channel is actually enabled, independently of the requested command.",
  "Voyant du bloc Alarmes signalant un déclenchement de sécurité.": "Alarm block indicator reporting a safety trip.",
  "Voyant indiquant que la limite de courant est atteinte ou active.": "Indicator showing that the current limit is reached or active.",
  "Voyant indiquant que la limite de tension est atteinte ou active.": "Indicator showing that the voltage limit is reached or active.",
  "État interprété par l'interface à partir des PV du canal.": "State interpreted by the interface from the channel PVs.",
  "Code d'état brut renvoyé par l'alimentation, utile lors d'un diagnostic avancé.": "Raw status code returned by the power supply, useful for advanced diagnostics.",
  "Constant Voltage : le canal fonctionne en régulation de tension.": "Constant Voltage: the channel operates in voltage regulation.",
  "Constant Current : le canal fonctionne en régulation ou limitation de courant.": "Constant Current: the channel operates in current regulation or limitation.",
  "Indique qu'une rampe de tension est en cours.": "Indicates that a voltage ramp is in progress.",
  "Bloc regroupant Trip, Voltage Limite, Current Limite et Status brut.": "Block grouping Trip, Voltage Limit, Current Limit and Raw Status.",
  "Lecture croisée des états, mesures, limites et alarmes du canal.": "Cross-reading of the channel states, measurements, limits and alarms.",
  "Chapitre suivant : Alarmes": "Next chapter: Alarms",
  "Le bloc Alarmes de la vue détaillée signale les conditions de protection ou d'anomalie du canal.": "The Alarms block in the detailed view reports protection or anomaly conditions for the channel.",
  "Chapitre suivant : Dépannage": "Next chapter: Troubleshooting",
  "Le dépannage doit partir des symptômes visibles dans Phoebus, puis vérifier la communication EPICS et enfin l'état matériel de l'alimentation.": "Troubleshooting should start from the symptoms visible in Phoebus, then check EPICS communication and finally the hardware state of the power supply.",
  "Symptôme": "Symptom",
  "Cause probable": "Probable cause",
  "Solution": "Solution",
  "Chapitre suivant : Glossaire": "Next chapter: Glossary",
  "Ce glossaire reprend les termes utilisés dans l'interface de supervision ISEG, dans EPICS et dans le contexte du projet HINA.": "This glossary lists terms used in the ISEG supervision interface, in EPICS and in the HINA project context.",
  "Chapitre suivant : FAQ": "Next chapter: FAQ",
  "Cette FAQ répond aux situations les plus probables lors de l'utilisation de l'interface de supervision ISEG et de ses fenêtres Phoebus.": "This FAQ answers the most likely situations when using the ISEG supervision interface and its Phoebus windows.",
  "Pourquoi certaines valeurs sont-elles grisées ?": "Why are some values greyed out?",
  "Pourquoi les mesures restent-elles à zéro ?": "Why do measurements stay at zero?",
  "Comment vérifier une PV sans Phoebus ?": "How can I check a PV without Phoebus?",
  "Pourquoi une valeur est-elle inaccessible ?": "Why is a value inaccessible?",
  "Pourquoi le canal reste OFF ?": "Why does the channel remain OFF?",
  "Comment savoir si une rampe est en cours ?": "How do I know if a ramp is in progress?",
  "À quoi servent les macros Phoebus ?": "What are Phoebus macros used for?",
  "Pourquoi comparer Phoebus avec iCS2 ?": "Why compare Phoebus with iCS2?",
  "Chapitre suivant : À propos": "Next chapter: About",
  "Retour à l'accueil": "Back to home"
};

Object.assign(englishTranslations, {
  "État du canal": "Channel state",
  "ON réel": "Actual ON",
  "Status brut": "Raw status",
  "Voyant indiquant que la limite de courant est atteinte.": "Indicator showing that the current limit has been reached.",
  "Voyant indiquant que la limite de tension est atteinte.": "Indicator showing that the voltage limit has been reached.",
  "dans la ligne du canal.": "in the channel row.",
  "Lire le bloc States : ON réel, rampe en cours, mode CV et mode CC.": "Read the States block: actual ON, ramp in progress, CV mode and CC mode.",
  "Lire le bloc Alarmes : Trip, Voltage Limite, Current Limite et Status brut.": "Read the Alarms block: Trip, Voltage Limit, Current Limit and Raw Status.",
  "Comparer les blocs Voltage et Current avec les valeurs visibles sur l'écran principal.": "Compare the Voltage and Current blocks with the values visible on the main screen.",
  "La vue détaillée a été conçue pour éviter de multiplier les fenêtres : les informations tension, courant, états et alarmes sont réunies sur un seul écran.": "The detailed view was designed to avoid multiplying windows: voltage, current, states and alarms are grouped on a single screen.",
  "Pour comprendre un comportement inattendu, lisez d'abord les voyants, puis les valeurs mesurées, puis les consignes.": "To understand unexpected behavior, first read the indicators, then the measured values, then the setpoints.",
  "Un voyant vert indique un état actif ou normal selon le champ ; vérifiez toujours le libellé associé au voyant.": "A green indicator means an active or normal state depending on the field; always check the label associated with the indicator.",
  "Vue détaillée réelle : état réel, protections, régulation, blocs Voltage et Current.": "Actual detailed view: real state, protections, regulation, Voltage and Current blocks.",
  "Dans cette interface, les informations d'alarme sont issues des PV de l'alimentation ISEG. Elles permettent de repérer un Trip, une limite de tension, une limite de courant ou un état brut renvoyé par le matériel.": "In this interface, alarm information comes from the ISEG power supply PVs. It helps identify a Trip, a voltage limit, a current limit or a raw state returned by the hardware.",
  "Identifier le canal concerné depuis l'écran principal.": "Identify the relevant channel from the main screen.",
  "Ouvrir sa vue détaillée.": "Open its detailed view.",
  "Lire les voyants": "Read the indicators",
  "Voltage Limite": "Voltage Limit",
  "Current Limite": "Current Limit",
  "Noter le": "Record the",
  "si une analyse plus poussée est nécessaire.": "if further analysis is needed.",
  "Un état EPICS": "An EPICS state",
  "signifie que la PV ne possède pas de valeur valide au moment de la lecture.": "means that the PV has no valid value at read time.",
  "pour vérifier si une alarme ou une mesure évolue réellement dans le temps.": "to check whether an alarm or a measurement really changes over time.",
  "Un Trip est une protection. Il ne doit pas être ignoré ni contourné par une simple modification de consigne.": "A Trip is a protection. It must not be ignored or bypassed by simply changing a setpoint.",
  "Bloc Alarmes de la vue détaillée : Trip, Voltage Limite, Current Limite et Status brut.": "Alarms block in the detailed view: Trip, Voltage Limit, Current Limit and Raw Status.",
  "Le cas le plus important rencontré pendant le développement concernait des mesures bloquées à zéro avec l'état": "The most important case encountered during development involved measurements stuck at zero with the state",
  ". La cause identifiée était l'absence du champ": ". The identified cause was the absence of the field",
  "dans les records de mesure, corrigée par": "in the measurement records, corrected by",
  ", puis redéploiement et redémarrage de l'IOC.": ", then redeployment and restart of the IOC.",
  "Tous les PV sont gris.": "All PVs are grey.",
  "Alimentation non joignable, IOC embarqué indisponible ou problème Channel Access.": "Power supply unreachable, embedded IOC unavailable or Channel Access issue.",
  "Tester le réseau, puis lire une PV avec": "Test the network, then read a PV with",
  "Impossible de modifier une valeur.": "Unable to modify a value.",
  "Champ en lecture seule, PV non modifiable ou canal dans un état bloquant.": "Read-only field, non-writable PV or channel in a blocking state.",
  "Vérifier que le champ est bleu clair, puis contrôler l'état du canal.": "Check that the field is light blue, then check the channel state.",
  "Canal bloqué en Trip.": "Channel stuck in Trip.",
  "Déclenchement de protection lié au courant, à la tension ou à l'état matériel.": "Protection trip related to current, voltage or hardware state.",
  "Ouvrir la vue détaillée, lire Trip, limites et Status brut avant remise en service.": "Open the detailed view, read Trip, limits and Raw Status before restarting.",
  "Connexion EPICS perdue.": "EPICS connection lost.",
  "Problème réseau, switch, adresse IP, IOC ou Channel Access.": "Network, switch, IP address, IOC or Channel Access issue.",
  "et l'accès à iCS2.": "and access to iCS2.",
  "IOC arrêté.": "IOC stopped.",
  "IOC embarqué non actif ou redémarrage nécessaire après configuration.": "Embedded IOC inactive or restart required after configuration.",
  "Redémarrer l'IOC selon la procédure ISEG/iCS2.": "Restart the IOC according to the ISEG/iCS2 procedure.",
  "Perte du réseau Ethernet.": "Ethernet network loss.",
  "Switch déconnecté, câble défaillant ou adresse IP inaccessible.": "Disconnected switch, faulty cable or unreachable IP address.",
  "Vérifier la liaison réseau locale avec l'alimentation.": "Check the local network link with the power supply.",
  "Impossible d'ouvrir une fenêtre.": "Unable to open a window.",
  "Fichier": "File",
  "absent, chemin incorrect ou macro": "missing, incorrect path or macro",
  "non transmise.": "not passed.",
  "Vérifier": "Check",
  "ou": "or",
  "reste à zéro.": "stays at zero.",
  "Record EPICS en mode Passive, absence de champ": "EPICS record in Passive mode, missing field",
  ", état": ", state",
  "Ajouter": "Add",
  "aux records concernés, redéployer puis redémarrer l'IOC.": "to the affected records, redeploy, then restart the IOC.",
  "Identifier si le problème touche un canal ou l'ensemble de l'alimentation.": "Identify whether the issue affects one channel or the whole power supply.",
  "Tester la communication réseau avec l'alimentation.": "Test network communication with the power supply.",
  "Lire une PV avec": "Read a PV with",
  "et suivre son évolution avec": "and monitor its evolution with",
  "Comparer Phoebus avec iCS2 lorsque c'est possible.": "Compare Phoebus with iCS2 when possible.",
  "Les fichiers": "The files",
  "expliquent comment les PV sont générées et publiées par l'IOC.": "explain how PVs are generated and published by the IOC.",
  "Si une mesure ne se met pas à jour, vérifiez d'abord son mode de scan avant de chercher un défaut matériel.": "If a measurement does not update, first check its scan mode before looking for a hardware fault.",
  "Ne concluez pas qu'une valeur Phoebus est correcte tant que la PV n'a pas été validée côté EPICS ou iCS2.": "Do not conclude that a Phoebus value is correct until the PV has been validated on the EPICS or iCS2 side.",
  ": Experimental Physics and Industrial Control System, ensemble d'outils utilisés pour construire des systèmes de contrôle-commande distribués.": ": Experimental Physics and Industrial Control System, a set of tools used to build distributed control-command systems.",
  ": Input Output Controller, serveur EPICS connecté au matériel. Dans ce projet, l'IOC est embarqué dans l'alimentation ISEG.": ": Input Output Controller, an EPICS server connected to hardware. In this project, the IOC is embedded in the ISEG power supply.",
  ": variable EPICS représentant une mesure, une consigne, un état ou une alarme.": ": EPICS variable representing a measurement, a setpoint, a state or an alarm.",
  ": abréviation de Process Variable.": ": abbreviation of Process Variable.",
  ": constructeur d'alimentations haute tension utilisées dans des installations scientifiques.": ": manufacturer of high-voltage power supplies used in scientific installations.",
  ": haute tension fournie aux équipements expérimentaux, notamment aux quadrupôles électrostatiques.": ": high voltage supplied to experimental equipment, especially electrostatic quadrupoles.",
  "Canal": "Channel",
  ": sortie indépendante de l'alimentation permettant de piloter un équipement ou une voie spécifique.": ": independent output of the power supply used to drive a specific device or line.",
  ": déclenchement de protection à la suite d'une condition anormale.": ": protection triggering after an abnormal condition.",
  ": limite courant atteinte ou active.": ": current limit reached or active.",
  ": limite tension atteinte ou active.": ": voltage limit reached or active.",
  ": progression contrôlée d'une valeur vers une consigne.": ": controlled progression of a value toward a setpoint.",
  ": Constant Voltage, régulation en tension.": ": Constant Voltage, voltage regulation.",
  ": Constant Current, régulation ou limitation en courant.": ": Constant Current, current regulation or limitation.",
  ": logiciel de supervision permettant de créer des interfaces graphiques pour les systèmes EPICS.": ": supervision software used to create graphical interfaces for EPICS systems.",
  ": outil Phoebus utilisé pour construire les fichiers d'interface": ": Phoebus tool used to build interface files",
  ": paramètre de substitution permettant de réutiliser une même fenêtre pour plusieurs canaux, par exemple": ": substitution parameter allowing the same window to be reused for several channels, for example",
  ": affichage Phoebus intégré dans un autre affichage.": ": Phoebus display embedded in another display.",
  ": protocole EPICS client/serveur utilisé pour lire, écrire et surveiller les PV.": ": EPICS client/server protocol used to read, write and monitor PVs.",
  ": interface web fournie par ISEG pour configurer et administrer l'alimentation.": ": web interface provided by ISEG to configure and administer the power supply.",
  ": champ EPICS définissant la fréquence de mise à jour automatique d'une PV.": ": EPICS field defining the automatic update frequency of a PV.",
  ": état EPICS indiquant qu'une PV ne possède pas de valeur valide.": ": EPICS state indicating that a PV has no valid value.",
  "Fichier .db": ".db file",
  ": fichier modèle contenant les définitions des records EPICS.": ": template file containing EPICS record definitions.",
  "Fichier .sub": ".sub file",
  ": fichier de substitution injectant les paramètres réels du matériel dans les modèles.": ": substitution file injecting real hardware parameters into templates.",
  "Fichier .pv": ".pv file",
  ": fichier listant les Process Variables générées et accessibles.": ": file listing generated and accessible Process Variables.",
  "Quadrupôle électrostatique": "Electrostatic quadrupole",
  ": élément d'optique ionique utilisé pour guider ou focaliser les ions.": ": ion optics element used to guide or focus ions.",
  "Identifier le terme dans l'écran Phoebus ou dans le message EPICS.": "Identify the term in the Phoebus screen or in the EPICS message.",
  "Consulter la définition correspondante.": "Consult the corresponding definition.",
  "Revenir à la section du manuel associée au champ ou à l'état concerné.": "Return to the manual section associated with the relevant field or state.",
  "Le nom d'une PV ISEG suit une nomenclature qui contient notamment le numéro de série, le module et le canal.": "The name of an ISEG PV follows a naming convention that includes the serial number, module and channel.",
  "Pour diagnostiquer un problème, notez le nom complet de la PV concernée avant de lancer": "To diagnose an issue, note the full name of the relevant PV before running",
  "Les termes constructeur ISEG peuvent avoir une signification précise dans la documentation matérielle.": "ISEG manufacturer terms may have a precise meaning in the hardware documentation.",
  "Les valeurs grisées correspondent généralement à des mesures ou états en lecture seule, comme": "Greyed-out values generally correspond to read-only measurements or states, such as",
  ". Si un champ normalement actif devient gris, vérifiez la connexion de la PV.": ". If a normally active field becomes grey, check the PV connection.",
  "Si": "If",
  ", le record EPICS peut ne pas être scanné automatiquement. Le correctif utilisé pendant le stage a été d'ajouter": ", the EPICS record may not be scanned automatically. The fix used during the internship was to add",
  "puis de redéployer et redémarrer l'IOC.": "then redeploy and restart the IOC.",
  "pour modifier une consigne autorisée et": "to modify an authorized setpoint and",
  "Le champ peut être en lecture seule, associé à une PV non connectée, verrouillé par l'état du canal ou non prévu comme réglage utilisateur.": "The field may be read-only, associated with a disconnected PV, locked by the channel state, or not intended as a user setting.",
  "La commande peut être bloquée par un Trip, une limite atteinte, un état matériel non valide ou une perte de communication EPICS.": "The command may be blocked by a Trip, a reached limit, an invalid hardware state or a loss of EPICS communication.",
  "Ouvrez la vue détaillée et contrôlez le voyant": "Open the detailed view and check the indicator",
  "Rampe en cours (V)": "Ramp in progress (V)",
  ". Pendant la rampe,": ". During the ramp,",
  "Elles évitent de créer une fenêtre différente pour chaque canal. La macro": "They avoid creating a different window for each channel. The macro",
  "remplace dynamiquement le numéro de canal dans les noms de PV.": "dynamically replaces the channel number in PV names.",
  "iCS2 est l'interface web constructeur. Elle peut aider à confirmer si une valeur incohérente vient de Phoebus, d'EPICS ou de l'alimentation elle-même.": "iCS2 is the manufacturer web interface. It can help confirm whether an inconsistent value comes from Phoebus, EPICS or the power supply itself.",
  "Identifier le symptôme observé dans Phoebus.": "Identify the symptom observed in Phoebus.",
  "Lire la réponse associée.": "Read the associated answer.",
  "Si nécessaire, appliquer la procédure de dépannage avec les outils EPICS.": "If necessary, apply the troubleshooting procedure using EPICS tools.",
  "La plupart des anomalies visibles dans Phoebus doivent être confirmées par la lecture directe des PV EPICS.": "Most anomalies visible in Phoebus must be confirmed by directly reading EPICS PVs.",
  "Gardez sous la main les noms des PV critiques : tension mesurée, courant mesuré, état ON/OFF, Trip et ramping.": "Keep the critical PV names close at hand: measured voltage, measured current, ON/OFF state, Trip and ramping.",
  "Une action sur une consigne haute tension doit toujours être cohérente avec l'état matériel réel du canal.": "Any action on a high-voltage setpoint must always be consistent with the real hardware state of the channel.",
  "Ce manuel accompagne l'interface de supervision de l'alimentation ISEG développée pendant le stage de Mohammed Chibani Bahi à l'IJCLab, au sein de l'équipe FIIRST, pour le projet HINA.": "This manual accompanies the ISEG power supply supervision interface developed during Mohammed Chibani Bahi's internship at IJCLab, within the FIIRST team, for the HINA project.",
  "Le travail porte sur une interface de contrôle-commande Phoebus destinée à superviser une alimentation haute tension ISEG. Cette alimentation alimente des quadrupôles électrostatiques et publie ses données dans EPICS grâce à son IOC intégré.": "The work concerns a Phoebus control-command interface intended to supervise an ISEG high-voltage power supply. This power supply feeds electrostatic quadrupoles and publishes its data in EPICS through its integrated IOC.",
  "Conserver ce manuel avec les fichiers Phoebus associés :": "Keep this manual with the associated Phoebus files:",
  "Mettre à jour les captures si l'interface évolue.": "Update the screenshots if the interface evolves.",
  "Documenter toute modification de PV, de macro ou de fichier EPICS.": "Document any PV, macro or EPICS file modification.",
  "Compléter la section dépannage avec les incidents rencontrés pendant les tests.": "Complete the troubleshooting section with incidents encountered during tests.",
  "L'interface est une première brique fonctionnelle du futur système de contrôle-commande global du projet HINA.": "The interface is a first functional building block of the future global HINA control-command system.",
  "Associez chaque version du manuel à la version des displays Phoebus et des fichiers EPICS utilisés.": "Associate each manual version with the version of the Phoebus displays and EPICS files used.",
  "L'intégration complète dans le système global HINA relève des prochaines phases du projet.": "Full integration into the global HINA system belongs to the next project phases."
});

function setTheme(theme) {
  root.classList.toggle("dark", theme === "dark");
  localStorage.setItem("hina-manual-theme", theme);
  themeToggle.setAttribute("aria-label", theme === "dark"
    ? (currentLanguage === "en" ? "Enable light mode" : "Activer le mode clair")
    : (currentLanguage === "en" ? "Enable dark mode" : "Activer le mode sombre"));
}

function captureTextNodes() {
  const ignoredTags = new Set(["SCRIPT", "STYLE"]);
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (ignoredTags.has(node.parentElement?.tagName)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  textNodeRegistry = [];
  while (walker.nextNode()) {
    textNodeRegistry.push({
      node: walker.currentNode,
      original: walker.currentNode.nodeValue,
    });
  }
}

function translateTextValue(value, language) {
  if (language === "fr") return value;

  const leading = value.match(/^\s*/)?.[0] || "";
  const trailing = value.match(/\s*$/)?.[0] || "";
  const key = value.trim().replace(/\s+/g, " ");
  const repairedKey = repairMojibake(key);
  const translated = englishTranslations[key] || englishTranslations[repairedKey];
  return translated ? `${leading}${translated}${trailing}` : value;
}

function repairMojibake(value) {
  try {
    return decodeURIComponent(escape(value));
  } catch {
    return value;
  }
}

function setLanguage(language) {
  currentLanguage = language;
  root.lang = language;
  localStorage.setItem("hina-manual-language", language);

  textNodeRegistry.forEach(({ node, original }) => {
    node.nodeValue = translateTextValue(original, language);
  });

  document.title = language === "en"
    ? "User manual - ISEG supervision interface"
    : "Manuel d'utilisation - Interface de supervision HINA";

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = language === "en"
      ? "User manual for the ISEG high-voltage power supply supervision interface integrated into the HINA project and driven by EPICS."
      : "Manuel d'utilisation de l'interface de supervision de l'alimentation Haute Tension ISEG integree au projet HINA et pilotee par EPICS.";
  }

  searchInput.placeholder = language === "en" ? "Search..." : "Rechercher...";
  languageToggle.querySelector(".lang-fr")?.classList.toggle("is-active", language === "fr");
  languageToggle.querySelector(".lang-en")?.classList.toggle("is-active", language === "en");
  languageToggle.title = language === "en" ? "Français" : "English";
  languageToggle.setAttribute("aria-label", language === "en" ? "Passer en français" : "Switch to English");
  closeMenu.setAttribute("aria-label", language === "en" ? "Close menu" : "Fermer le menu");
  openMenu.setAttribute("aria-label", language === "en" ? "Open menu" : "Ouvrir le menu");
  printPage.setAttribute("aria-label", language === "en" ? "Print manual" : "Imprimer le manuel");
  setTheme(root.classList.contains("dark") ? "dark" : "light");
  runSearch();
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function buildToc() {
  const fragment = document.createDocumentFragment();
  sections.forEach((section) => {
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.textContent = section.dataset.title;
    fragment.appendChild(link);
  });
  dynamicToc.appendChild(fragment);
}

function toggleSidebar(force) {
  const shouldOpen = typeof force === "boolean" ? force : !sidebar.classList.contains("is-open");
  sidebar.classList.toggle("is-open", shouldOpen);
}

function activateNav(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
  });
}

function runSearch() {
  const query = normalizeText(searchInput.value.trim());
  let visible = 0;

  searchableSections.forEach((section) => {
    section.classList.remove("search-highlight");
    if (!query) {
      section.classList.remove("is-hidden-by-search");
      return;
    }

    const matches = normalizeText(section.innerText).includes(query);
    section.classList.toggle("is-hidden-by-search", !matches);
    section.classList.toggle("search-highlight", matches);
    if (matches) visible += 1;
  });

  searchCount.textContent = query
    ? (currentLanguage === "en" ? `${visible} section(s) found` : `${visible} section(s) trouvée(s)`)
    : "";
}

function openLightbox(img) {
  lightboxImage.src = img.dataset.full || img.src;
  lightboxImage.alt = img.alt;
  const caption = img.closest("figure")?.querySelector("figcaption")?.textContent || "";
  lightboxCaption.textContent = caption;
  lightbox.classList.add("is-open");
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightboxImage.src = "";
}

function initCollapsibles() {
  document.querySelectorAll(".collapsible-section").forEach((section) => {
    const button = section.querySelector(".section-toggle");
    button.addEventListener("click", () => {
      const collapsed = section.classList.toggle("is-collapsed");
      button.setAttribute("aria-expanded", String(!collapsed));
    });
  });
}

function initCurrentSectionObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible) {
        activateNav(visible.target.id);
      }
    },
    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: [0.08, 0.2, 0.4],
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function initImageZoom() {
  document.querySelectorAll(".image-card img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(img));
    img.tabIndex = 0;
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(img);
      }
    });
  });
}

function initSmoothNav() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 980px)").matches) {
        toggleSidebar(false);
      }
    });
  });
}

function initEvents() {
  openMenu.addEventListener("click", () => toggleSidebar(true));
  closeMenu.addEventListener("click", () => toggleSidebar(false));
  themeToggle.addEventListener("click", () => setTheme(root.classList.contains("dark") ? "light" : "dark"));
  languageToggle.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "fr" : "en"));
  printPage.addEventListener("click", () => window.print());
  searchInput.addEventListener("input", runSearch);

  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("is-visible", window.scrollY > 520);
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      toggleSidebar(false);
    }
  });
}

function init() {
  const preferredTheme = localStorage.getItem("hina-manual-theme") || "light";
  const preferredLanguage = localStorage.getItem("hina-manual-language") || "fr";
  setTheme(preferredTheme);
  buildToc();
  captureTextNodes();
  setLanguage(preferredLanguage);
  initCollapsibles();
  initCurrentSectionObserver();
  initImageZoom();
  initSmoothNav();
  initEvents();
}

init();
