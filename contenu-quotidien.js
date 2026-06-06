// contenu-quotidien.js
// Bibliothèque de contenu quotidien Harmonia : programme progressif 30 jours.
// Chaque jour = 1 séance de tai-chi + 1 séance de yoga + 1 loi de l'attraction (cycle de 12).
// Les images sont à créer aux chemins indiqués (champ "image"). Tant qu'elles n'existent
// pas, l'affichage prévoit un visuel de remplacement.

window.HARMONIA_CONTENU = {

  // ===== LES 12 LOIS DE L'ATTRACTION (cycle quotidien) =====
  lois: [
    { n: 1,  titre: "La Loi de la Manifestation",
      texte: "Tout ce que vous vivez aujourd'hui a d'abord existé comme une pensée. Vos pensées dominantes façonnent votre réalité. Aujourd'hui, observez ce à quoi vous pensez le plus souvent : c'est la graine de ce qui vient. Choisissez consciemment une pensée qui vous élève, et revenez-y dès que votre esprit s'égare." },
    { n: 2,  titre: "La Loi de l'Attraction Magnétique",
      texte: "Le semblable attire le semblable. Votre état intérieur agit comme un aimant : la gratitude attire l'abondance, l'anxiété attire le manque. Aujourd'hui, avant chaque décision, demandez-vous : « Est-ce que cela vient de la peur ou de la confiance ? » Puis choisissez la confiance." },
    { n: 3,  titre: "La Loi de l'Action Inspirée",
      texte: "Désirer ne suffit pas : l'univers répond au mouvement. Il existe deux types d'action — celle qui vient de la pression, et celle qui vient de l'élan intérieur. Aujourd'hui, posez un petit geste aligné avec votre rêve, non parce que vous « devez », mais parce que cela vous appelle." },
    { n: 4,  titre: "La Loi de l'Alignement Énergétique",
      texte: "Vous ne recevez pas ce que vous voulez, mais ce que vous êtes. Aujourd'hui, incarnez déjà la personne que vous souhaitez devenir : tenez-vous comme elle, respirez comme elle, parlez-vous comme elle. L'énergie précède toujours la matière." },
    { n: 5,  titre: "La Loi de la Gratitude",
      texte: "La gratitude est la fréquence la plus puissante. Elle transforme ce que vous avez en suffisance et ouvre la porte à davantage. Aujourd'hui, nommez trois choses pour lesquelles vous êtes reconnaissant — en ressentant vraiment chaque bienfait dans votre corps." },
    { n: 6,  titre: "La Loi de la Vibration",
      texte: "Tout est énergie en mouvement, y compris vos émotions. Une émotion n'est pas un problème : c'est une information sur votre fréquence du moment. Aujourd'hui, quand une émotion lourde surgit, ne la combattez pas — respirez profondément et choisissez doucement une pensée plus haute." },
    { n: 7,  titre: "La Loi de la Croyance",
      texte: "Vous n'obtenez pas ce que vous espérez, mais ce que vous croyez profondément possible. Aujourd'hui, identifiez une croyance limitante (« je ne suis pas capable de… ») et reformulez-la en possibilité (« j'apprends à… »)." },
    { n: 8,  titre: "La Loi de la Clarté",
      texte: "L'univers ne peut pas livrer une commande floue. Plus votre intention est claire, plus elle devient réalisable. Aujourd'hui, écrivez précisément ce que vous voulez vraiment — pas vaguement « être heureux », mais concrètement, en images nettes." },
    { n: 9,  titre: "La Loi du Lâcher-Prise",
      texte: "Tenir trop fort étouffe ce que l'on désire. Après avoir semé votre intention et agi, faites confiance et relâchez le contrôle du « comment ». Aujourd'hui, exercez-vous à dire : « Je fais ma part, et je laisse la vie faire le reste. »" },
    { n: 10, titre: "La Loi de l'Abondance",
      texte: "L'abondance n'est pas une quantité, c'est un état d'esprit. Celui qui se sent riche de peu attire davantage que celui qui se sent pauvre de beaucoup. Aujourd'hui, remarquez toutes les formes de richesse déjà présentes : le temps, les liens, la santé, la beauté." },
    { n: 11, titre: "La Loi de la Patience et du Rythme",
      texte: "Toute graine respecte son temps de germination. Le doute naît souvent juste avant la récolte. Aujourd'hui, faites confiance au rythme des choses : votre travail intérieur agit même quand vous ne voyez encore rien à la surface." },
    { n: 12, titre: "La Loi de l'Harmonie",
      texte: "Vous êtes relié à tout ce qui vous entoure. Quand votre corps, votre mental et votre environnement vibrent ensemble, la vie s'écoule sans effort. Aujourd'hui, cherchez l'harmonie plutôt que la perfection : un geste doux pour le corps, une pensée apaisée, un espace rangé autour de vous." }
  ],

  // ===== PROGRAMME 30 JOURS (tai-chi + yoga) =====
  // Lot 1 : jours 1 à 10
  jours: [
    {
      jour: 1,
      taichi: {
        titre: "L'Ancrage — Posture Wuji",
        duree: "8 min", niveau: "Débutant",
        image: "images/taichi-jour-01.webp",
        etapes: [
          "Tenez-vous debout, pieds écartés à la largeur des épaules, parallèles. Bras le long du corps.",
          "Fléchissez légèrement les genoux, comme assis sur un tabouret très haut. Poids réparti également.",
          "Imaginez un fil tirant le sommet du crâne vers le ciel : la colonne s'allonge, les épaules se relâchent.",
          "Langue contre le palais, yeux mi-clos, respirez par le ventre : 6 s d'inspiration, 6 s d'expiration.",
          "Restez immobile et enraciné, en ressentant le contact des pieds avec le sol."
        ],
        intention: "Je suis stable et enraciné comme un arbre."
      },
      yoga: {
        titre: "L'Éveil du souffle — La Montagne (Tadasana)",
        duree: "8 min", niveau: "Débutant",
        image: "images/yoga-jour-01.webp",
        etapes: [
          "Debout, pieds joints ou légèrement écartés, bras le long du corps.",
          "Répartissez le poids également : sentez talons, pointes, bords des pieds.",
          "Allongez la colonne vers le haut, ouvrez la poitrine, relâchez les épaules vers l'arrière.",
          "Yeux fermés, respirez par le nez : inspirez en gonflant le ventre, expirez en le rentrant. 10 respirations.",
          "Restez présent à la sensation d'être grand, stable et calme comme une montagne."
        ],
        intention: "Je me tiens droit et digne, ancré dans le présent."
      }
    },
    {
      jour: 2,
      taichi: {
        titre: "Bercer l'énergie — Ouverture des bras",
        duree: "9 min", niveau: "Débutant",
        image: "images/taichi-jour-02.webp",
        etapes: [
          "Reprenez la posture d'ancrage du jour 1.",
          "À l'inspiration, montez les deux bras devant vous jusqu'aux épaules, paumes vers le bas.",
          "À l'expiration, abaissez les bras en pliant un peu plus les genoux, paumes pressant vers le sol.",
          "Répétez 10 fois en synchronisant le souffle : monter = inspirer, descendre = expirer.",
          "Mouvement continu, sans à-coup, comme une vague. Épaules détendues."
        ],
        intention: "Mon souffle et mon corps ne font qu'un."
      },
      yoga: {
        titre: "L'Étirement du réveil — Bras levés",
        duree: "9 min", niveau: "Débutant",
        image: "images/yoga-jour-02.webp",
        etapes: [
          "Depuis la Montagne, inspirez en levant les deux bras au-dessus de la tête, paumes face à face.",
          "Étirez-vous vers le haut, épaules basses, nuque longue.",
          "À l'expiration, redescendez les bras sur les côtés en un grand cercle lent.",
          "Répétez 6 fois en suivant le souffle. Sentez la cage thoracique s'ouvrir.",
          "Terminez bras le long du corps, observez la légèreté dans le haut du dos."
        ],
        intention: "J'ouvre mon corps et j'accueille l'énergie nouvelle."
      }
    },
    {
      jour: 3,
      taichi: {
        titre: "Repousser les nuages — Mouvement des mains",
        duree: "10 min", niveau: "Débutant",
        image: "images/taichi-jour-03.webp",
        etapes: [
          "En posture d'ancrage, levez les mains à hauteur de poitrine, paumes vers l'extérieur.",
          "À l'expiration, poussez lentement les paumes devant vous, comme pour écarter un rideau de brume.",
          "À l'inspiration, ramenez les mains vers la poitrine, paumes tournées vers vous.",
          "Répétez 8 fois, très lentement. Le regard suit le mouvement des mains.",
          "Laissez les bras redescendre, restez immobile 30 s pour ressentir l'énergie."
        ],
        intention: "J'écarte mes tensions et je fais de la place au calme."
      },
      yoga: {
        titre: "La Posture de l'Enfant — Détente du dos",
        duree: "10 min", niveau: "Débutant",
        image: "images/yoga-jour-03.webp",
        etapes: [
          "À genoux sur un tapis, gros orteils qui se touchent, genoux à la largeur des hanches.",
          "À l'expiration, penchez le buste vers l'avant, front au sol, bras devant ou le long du corps.",
          "Relâchez tout le poids du buste vers le sol. Hanches vers les talons.",
          "Respirez calmement 2 à 3 minutes, le dos s'étire à chaque expiration.",
          "Remontez très lentement, vertèbre après vertèbre, la tête en dernier."
        ],
        intention: "Je relâche mes tensions et je m'offre un moment de douceur."
      }
    },
    {
      jour: 4,
      taichi: {
        titre: "Caresser la crinière du cheval sauvage",
        duree: "10 min", niveau: "Débutant",
        image: "images/taichi-jour-04.webp",
        etapes: [
          "En ancrage, transférez le poids sur la jambe droite, formez un « ballon » entre vos mains devant le ventre.",
          "Avancez le pied gauche d'un pas, talon d'abord, en transférant doucement le poids dessus.",
          "Séparez les mains : la gauche monte vers le haut (hauteur des yeux), la droite descend vers la hanche.",
          "Le regard suit la main qui monte. Le mouvement vient des hanches, pas des bras.",
          "Revenez au centre et répétez de l'autre côté. 6 fois en tout, très lentement."
        ],
        intention: "J'avance avec douceur et fluidité."
      },
      yoga: {
        titre: "Le Chat-Vache — Mobilité de la colonne",
        duree: "10 min", niveau: "Débutant",
        image: "images/yoga-jour-04.webp",
        etapes: [
          "À quatre pattes, mains sous les épaules, genoux sous les hanches.",
          "À l'inspiration (Vache), creusez le dos, ouvrez la poitrine, regard vers le haut.",
          "À l'expiration (Chat), arrondissez le dos, rentrez le menton, poussez le sol avec les mains.",
          "Enchaînez lentement au rythme du souffle, 10 fois.",
          "Revenez à un dos neutre et observez la souplesse gagnée."
        ],
        intention: "J'assouplis ma colonne et je libère mon dos."
      }
    },
    {
      jour: 5,
      taichi: {
        titre: "La Grue blanche déploie ses ailes",
        duree: "10 min", niveau: "Débutant",
        image: "images/taichi-jour-05.webp",
        etapes: [
          "Depuis l'ancrage, déplacez légèrement le poids sur la jambe droite.",
          "Levez la main droite vers le haut (au-dessus de l'épaule), paume vers l'extérieur.",
          "Abaissez la main gauche vers la hanche gauche, paume vers le sol.",
          "Effleurez le sol de la pointe du pied gauche, comme une grue en équilibre.",
          "Tenez 3 respirations, revenez au centre, puis changez de côté. 4 fois en tout."
        ],
        intention: "Je trouve l'équilibre entre force et légèreté."
      },
      yoga: {
        titre: "Le Chien tête en bas — Étirement complet",
        duree: "11 min", niveau: "Débutant",
        image: "images/yoga-jour-05.webp",
        etapes: [
          "À quatre pattes, orteils repliés sous les pieds, mains bien à plat.",
          "À l'expiration, poussez les hanches vers le haut et l'arrière pour former un V inversé.",
          "Gardez les genoux légèrement fléchis si besoin, talons tirés vers le sol sans forcer.",
          "Allongez la colonne, laissez la tête détendue entre les bras. Respirez 5 fois.",
          "Revenez doucement à quatre pattes, puis en posture de l'enfant pour récupérer."
        ],
        intention: "J'étire tout mon corps et je relâche mes épaules."
      }
    },
    {
      jour: 6,
      taichi: {
        titre: "Jouer du luth — Coordination des mains",
        duree: "10 min", niveau: "Débutant",
        image: "images/taichi-jour-06.webp",
        etapes: [
          "En ancrage, avancez légèrement le pied gauche, talon posé, pointe levée.",
          "Amenez la main gauche en avant à hauteur du visage, paume vers la droite.",
          "Placez la main droite plus bas, devant le coude gauche, comme tenant un luth.",
          "Maintenez la posture, respirez 3 fois en ressentant l'alignement bras-tronc.",
          "Revenez au centre et répétez de l'autre côté. 4 fois en tout."
        ],
        intention: "Je coordonne mon corps avec calme et précision."
      },
      yoga: {
        titre: "La Pince debout — Étirement de l'arrière des jambes",
        duree: "10 min", niveau: "Débutant",
        image: "images/yoga-jour-06.webp",
        etapes: [
          "Debout en Montagne, pieds largeur de hanches.",
          "À l'inspiration, levez les bras ; à l'expiration, penchez-vous vers l'avant depuis les hanches.",
          "Laissez le buste pendre, genoux légèrement fléchis, mains vers le sol ou les tibias.",
          "Relâchez la nuque et la tête, respirez 5 fois en laissant le dos s'allonger.",
          "Remontez lentement en déroulant la colonne, tête en dernier."
        ],
        intention: "Je me penche vers l'intérieur et je relâche mes jambes."
      }
    },
    {
      jour: 7,
      taichi: {
        titre: "Repli et poussée — Brosser le genou",
        duree: "11 min", niveau: "Débutant",
        image: "images/taichi-jour-07.webp",
        etapes: [
          "En ancrage, ramenez la main droite près de l'oreille, paume vers l'avant.",
          "Avancez le pied gauche d'un pas, talon d'abord.",
          "Poussez la main droite vers l'avant tandis que la main gauche « brosse » au-dessus du genou gauche.",
          "Transférez le poids sur la jambe avant en gardant le buste droit.",
          "Revenez et alternez les côtés. 6 fois, en synchronisant le souffle."
        ],
        intention: "Je repousse mes obstacles avec sérénité."
      },
      yoga: {
        titre: "Le Guerrier I — Force et ancrage",
        duree: "11 min", niveau: "Débutant",
        image: "images/yoga-jour-07.webp",
        etapes: [
          "Debout, faites un grand pas en arrière avec le pied droit, pied avant pointé devant.",
          "Pliez le genou gauche au-dessus de la cheville, hanches face à l'avant.",
          "À l'inspiration, levez les bras au-dessus de la tête, paumes face à face.",
          "Regard vers l'avant ou les mains, respirez 4 fois en gardant la stabilité.",
          "Revenez debout et changez de côté."
        ],
        intention: "Je me tiens fort et déterminé."
      }
    },
    {
      jour: 8,
      taichi: {
        titre: "Saisir la queue de l'oiseau — Parer (Peng)",
        duree: "11 min", niveau: "Débutant",
        image: "images/taichi-jour-08.webp",
        etapes: [
          "En ancrage, formez un ballon entre vos mains à hauteur de poitrine.",
          "Avancez le pied gauche, transférez le poids vers l'avant.",
          "Avant-bras gauche devant vous (paume vers vous), main droite suivant en soutien.",
          "Sentez la poussée douce vers l'avant, comme repousser une grande balle.",
          "Revenez en arrière en transférant le poids, répétez 6 fois."
        ],
        intention: "J'accueille et je dévie sans résister."
      },
      yoga: {
        titre: "Le Guerrier II — Ouverture et endurance",
        duree: "11 min", niveau: "Débutant",
        image: "images/yoga-jour-08.webp",
        etapes: [
          "Grand pas latéral, pied avant pointé devant, pied arrière à 90°.",
          "Pliez le genou avant au-dessus de la cheville, hanches ouvertes sur le côté.",
          "Étendez les bras à l'horizontale, regard au-dessus de la main avant.",
          "Gardez les épaules basses, respirez 4 fois en tenant la posture.",
          "Revenez et changez de côté."
        ],
        intention: "Je suis ouvert, stable et endurant."
      }
    },
    {
      jour: 9,
      taichi: {
        titre: "Saisir la queue de l'oiseau — Reculer (Lü)",
        duree: "11 min", niveau: "Débutant",
        image: "images/taichi-jour-09.webp",
        etapes: [
          "Depuis la posture de parade du jour 8, tournez légèrement la taille vers la droite.",
          "Laissez les mains suivre le mouvement de la taille, comme guidant une vague qui reflue.",
          "Transférez le poids sur la jambe arrière en gardant le dos droit.",
          "Le mouvement vient entièrement de la rotation des hanches, pas des épaules.",
          "Revenez au centre, répétez 6 fois, très lentement."
        ],
        intention: "Je cède avec souplesse pour mieux revenir."
      },
      yoga: {
        titre: "La Torsion assise — Détox de la colonne",
        duree: "10 min", niveau: "Débutant",
        image: "images/yoga-jour-09.webp",
        etapes: [
          "Assis jambes allongées, pliez la jambe droite et posez le pied à l'extérieur du genou gauche.",
          "Inspirez en allongeant la colonne, bras gauche autour du genou droit.",
          "Expirez en tournant le buste vers la droite, main droite posée derrière vous.",
          "Regard par-dessus l'épaule droite, respirez 4 fois en grandissant à chaque inspiration.",
          "Revenez au centre et changez de côté."
        ],
        intention: "Je libère mes tensions et je purifie mon centre."
      }
    },
    {
      jour: 10,
      taichi: {
        titre: "Enchaînement doux — Les 3 premiers mouvements",
        duree: "12 min", niveau: "Débutant",
        image: "images/taichi-jour-10.webp",
        etapes: [
          "Commencez par l'Ancrage (jour 1) : 3 respirations profondes.",
          "Enchaînez avec Bercer l'énergie (jour 2) : 3 montées-descentes des bras.",
          "Poursuivez avec Repousser les nuages (jour 3) : 3 poussées des paumes.",
          "Reliez les mouvements sans pause, en gardant le souffle lent et continu.",
          "Terminez en ancrage, immobile, 1 minute, pour ressentir l'ensemble."
        ],
        intention: "Je relie mes gestes en un flux harmonieux."
      },
      yoga: {
        titre: "Salutation au soleil simplifiée",
        duree: "12 min", niveau: "Débutant",
        image: "images/yoga-jour-10.webp",
        etapes: [
          "Debout en Montagne, mains jointes devant le cœur, une respiration.",
          "Inspirez bras levés ; expirez en pince vers l'avant (genoux souples).",
          "Inspirez dos plat à mi-hauteur ; expirez en posture de l'enfant ou planche douce.",
          "Revenez en chien tête en bas, 3 respirations.",
          "Remontez vers l'avant, déroulez la colonne, et revenez mains au cœur."
        ],
        intention: "Je salue le jour avec gratitude et énergie."
      }
    },
    {
      jour: 11,
      taichi: {
        titre: "Repousser le singe (Tai-chi)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/taichi-jour-11.webp",
        etapes: [
          "Tenez-vous droit, pieds écartés à la largeur des hanches, bras détendus le long du corps.",
          "Reculez lentement la main droite ouverte vers l'arrière, paume vers le haut, le regard la suit.",
          "Ramenez cette main près de l'oreille, puis poussez-la doucement vers l'avant, paume en avant.",
          "Pendant ce temps, l'autre main recule vers la hanche, paume vers le haut. Alternez les côtés.",
          "Enchaînez 6 répétitions lentes par côté en gardant la respiration calme et continue."
        ],
        intention: "Je laisse partir ce qui m'encombre et j'avance avec légèreté."
      },
      yoga: {
        titre: "Posture de l'enfant (Yoga)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/yoga-jour-11.webp",
        etapes: [
          "Mettez-vous à genoux sur le tapis, gros orteils joints, genoux légèrement écartés.",
          "Asseyez les fesses sur les talons et inspirez profondément en grandissant le dos.",
          "Sur l'expiration, penchez le buste vers l'avant et posez le front au sol.",
          "Étirez les bras devant vous, paumes au sol, ou laissez-les le long du corps.",
          "Respirez lentement dans cette posture pendant 8 à 10 respirations profondes."
        ],
        intention: "Je m'accorde le repos et je relâche toute tension."
      }
    },
    {
      jour: 12,
      taichi: {
        titre: "La grue blanche déploie ses ailes",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/taichi-jour-12.webp",
        etapes: [
          "Debout, pieds joints, transférez le poids sur la jambe droite.",
          "Levez lentement le bras droit au-dessus de la tête, paume vers l'extérieur.",
          "Abaissez le bras gauche le long de la cuisse, paume vers le sol, doigts pointés vers le bas.",
          "Effleurez le sol de la pointe du pied gauche pour l'équilibre, regard à l'horizon.",
          "Tenez 3 respirations puis revenez et changez de côté. Répétez 4 fois par côté."
        ],
        intention: "Je m'élève avec calme et je garde mon équilibre intérieur."
      },
      yoga: {
        titre: "La pince debout (Uttanasana)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/yoga-jour-12.webp",
        etapes: [
          "Debout, pieds écartés à la largeur des hanches, inspirez en levant les bras au ciel.",
          "Sur l'expiration, penchez-vous vers l'avant depuis les hanches, genoux légèrement fléchis.",
          "Laissez tomber la tête et les bras vers le sol, relâchez la nuque complètement.",
          "Attrapez vos coudes opposés et laissez le poids du buste étirer le dos des jambes.",
          "Respirez 6 fois, puis remontez lentement en déroulant la colonne vertèbre par vertèbre."
        ],
        intention: "Je me plie sans me briser, je reste souple face à la vie."
      }
    },
    {
      jour: 13,
      taichi: {
        titre: "Caresser la crinière du cheval sauvage",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/taichi-jour-13.webp",
        etapes: [
          "Position debout, pieds écartés, mains comme si vous teniez un ballon devant le ventre.",
          "Avancez d'un pas la jambe gauche en pliant le genou, transférez le poids devant.",
          "Ouvrez les bras en diagonale : main gauche monte au niveau des yeux, main droite descend à la hanche.",
          "Le regard suit la main qui monte. Le mouvement est lent, fluide, continu.",
          "Ramenez le ballon au centre et changez de côté. 5 répétitions par côté."
        ],
        intention: "J'avance avec douceur et je dompte mes énergies."
      },
      yoga: {
        titre: "Le chat-vache (Marjaryasana)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/yoga-jour-13.webp",
        etapes: [
          "Placez-vous à quatre pattes, mains sous les épaules, genoux sous les hanches.",
          "Inspirez en creusant le dos : ventre vers le sol, regard vers le haut (posture de la vache).",
          "Expirez en arrondissant le dos : menton vers la poitrine, nombril vers le ciel (posture du chat).",
          "Synchronisez chaque mouvement avec votre respiration, fluide et sans à-coups.",
          "Répétez ce va-et-vient 10 fois en écoutant chaque vertèbre se mobiliser."
        ],
        intention: "J'ondule avec la vie et je libère ma colonne."
      }
    },
    {
      jour: 14,
      taichi: {
        titre: "Mains tournant comme des nuages",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/taichi-jour-14.webp",
        etapes: [
          "Debout, pieds écartés, genoux légèrement fléchis, dos droit et détendu.",
          "Levez la main droite à hauteur des yeux, paume vers vous, main gauche au niveau du ventre.",
          "Déplacez doucement le poids d'une jambe à l'autre en faisant tourner les mains comme des nuages.",
          "Les mains se croisent au centre puis s'écartent, le buste pivote légèrement.",
          "Continuez ce mouvement lent et hypnotique pendant 2 minutes."
        ],
        intention: "Mes pensées passent comme des nuages, je reste serein."
      },
      yoga: {
        titre: "La torsion assise (Ardha Matsyendrasana)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/yoga-jour-14.webp",
        etapes: [
          "Asseyez-vous jambes tendues, puis pliez la jambe droite et posez le pied à l'extérieur du genou gauche.",
          "Inspirez en grandissant la colonne, bras gauche levé vers le ciel.",
          "Expirez en tournant le buste vers la droite, coude gauche contre le genou droit.",
          "Posez la main droite derrière vous et regardez par-dessus l'épaule droite.",
          "Tenez 5 respirations, revenez au centre, puis changez de côté."
        ],
        intention: "Je me tourne vers de nouvelles perspectives avec ouverture."
      }
    },
    {
      jour: 15,
      taichi: {
        titre: "Le serpent qui rampe (Tai-chi bas)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/taichi-jour-15.webp",
        etapes: [
          "Pieds largement écartés, fléchissez profondément la jambe droite, jambe gauche tendue.",
          "Posez les mains ouvertes devant vous et glissez le poids du corps vers la gauche.",
          "Descendez bas en gardant le dos droit, comme si vous glissiez au ras du sol.",
          "Remontez en transférant le poids sur la jambe gauche désormais fléchie.",
          "Alternez de gauche à droite 6 fois, lentement, en contrôlant l'équilibre."
        ],
        intention: "Je m'ancre profondément et je puise ma force dans la terre."
      },
      yoga: {
        titre: "Le guerrier I (Virabhadrasana I)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/yoga-jour-15.webp",
        etapes: [
          "Debout, faites un grand pas en arrière avec le pied droit, pied avant pointé devant.",
          "Tournez légèrement le pied arrière à 45 degrés et alignez le talon avant avec la voûte arrière.",
          "Fléchissez le genou avant au-dessus de la cheville, cuisse parallèle au sol si possible.",
          "Levez les bras au ciel, paumes face à face, regard vers le haut, épaules basses.",
          "Tenez 5 respirations puis changez de jambe."
        ],
        intention: "Je me tiens debout dans ma force avec courage."
      }
    },
    {
      jour: 16,
      taichi: {
        titre: "Frapper avec les deux poings (Tai-chi)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/taichi-jour-16.webp",
        etapes: [
          "Position stable, pieds écartés, poings fermés détendus au niveau des hanches.",
          "Avancez le poids sur la jambe avant en pliant le genou.",
          "Décrivez un grand cercle vers l'extérieur avec les deux poings, comme pour encercler.",
          "Ramenez les poings vers l'avant à hauteur des tempes, comme un coup doux et contrôlé.",
          "Revenez à la position de départ. Répétez 6 fois avec respiration ample."
        ],
        intention: "Je rassemble mon énergie et j'agis avec détermination."
      },
      yoga: {
        titre: "Le guerrier II (Virabhadrasana II)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/yoga-jour-16.webp",
        etapes: [
          "Pieds largement écartés, tournez le pied droit à 90 degrés vers l'extérieur.",
          "Fléchissez le genou droit au-dessus de la cheville, cuisse vers la parallèle au sol.",
          "Ouvrez les bras à l'horizontale, parallèles au sol, paumes vers le bas.",
          "Tournez la tête vers la main droite, regard fixé au loin au-delà des doigts.",
          "Tenez 5 respirations, puis changez de côté."
        ],
        intention: "Je regarde droit devant et je tiens ma position avec assurance."
      }
    },
    {
      jour: 17,
      taichi: {
        titre: "Brosser le genou et avancer",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/taichi-jour-17.webp",
        etapes: [
          "Debout, pieds écartés, une main près de l'oreille, l'autre devant le ventre.",
          "Avancez la jambe opposée en pliant le genou, transférez le poids devant.",
          "Poussez la main de l'oreille vers l'avant, paume en avant, à hauteur de poitrine.",
          "L'autre main 'brosse' au-dessus du genou avant et se pose à la hanche.",
          "Changez de côté en avançant l'autre jambe. 5 répétitions par côté."
        ],
        intention: "Je balaie les obstacles et j'avance pas à pas."
      },
      yoga: {
        titre: "Le triangle (Trikonasana)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/yoga-jour-17.webp",
        etapes: [
          "Pieds largement écartés, pied droit tourné à 90 degrés vers l'extérieur.",
          "Inspirez en ouvrant les bras à l'horizontale.",
          "Expirez en penchant le buste vers la droite, main droite vers la cheville ou le tibia.",
          "Levez le bras gauche vers le ciel, alignant les deux bras, regard vers la main haute.",
          "Tenez 5 respirations, remontez, puis changez de côté."
        ],
        intention: "Je m'étire vers l'équilibre entre force et souplesse."
      }
    },
    {
      jour: 18,
      taichi: {
        titre: "Aiguille au fond de la mer",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/taichi-jour-18.webp",
        etapes: [
          "Debout, pieds joints, poids sur la jambe droite, dos droit.",
          "Levez la main droite au-dessus, puis abaissez-la lentement devant le corps.",
          "Penchez le buste vers l'avant en pointant les doigts vers le sol comme une aiguille.",
          "Gardez la nuque dans le prolongement du dos, le mouvement reste lent.",
          "Remontez en déroulant la colonne. Répétez 5 fois."
        ],
        intention: "Je plonge en moi pour trouver le calme profond."
      },
      yoga: {
        titre: "Le demi-pont (Setu Bandhasana)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/yoga-jour-18.webp",
        etapes: [
          "Allongez-vous sur le dos, genoux pliés, pieds à plat près des fessiers.",
          "Posez les bras le long du corps, paumes au sol.",
          "Inspirez et soulevez doucement le bassin vers le ciel en poussant sur les pieds.",
          "Gardez les cuisses parallèles, serrez légèrement les omoplates sous le dos.",
          "Tenez 5 respirations puis redescendez vertèbre par vertèbre. Répétez 3 fois."
        ],
        intention: "J'ouvre mon cœur et je m'élève en douceur."
      }
    },
    {
      jour: 19,
      taichi: {
        titre: "Tourner et frapper du talon",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/taichi-jour-19.webp",
        etapes: [
          "Debout, pieds écartés, bras croisés devant la poitrine, poignets souples.",
          "Transférez le poids sur la jambe gauche, équilibre stable.",
          "Ouvrez les bras lentement sur les côtés tout en levant le genou droit.",
          "Tendez doucement la jambe droite vers l'avant, talon poussé, sans forcer.",
          "Reposez le pied et changez de côté. 4 répétitions par côté."
        ],
        intention: "J'ouvre mon espace et j'affirme ma présence."
      },
      yoga: {
        titre: "L'arbre (Vrksasana)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/yoga-jour-19.webp",
        etapes: [
          "Debout, transférez le poids sur la jambe gauche, regard fixé sur un point devant vous.",
          "Posez la plante du pied droit sur la cheville, le mollet ou l'intérieur de la cuisse gauche.",
          "Évitez de poser le pied directement sur le genou.",
          "Joignez les mains devant la poitrine, puis montez-les au-dessus de la tête si l'équilibre tient.",
          "Tenez 5 respirations puis changez de jambe."
        ],
        intention: "Je m'enracine et je grandis vers la lumière."
      }
    },
    {
      jour: 20,
      taichi: {
        titre: "Clôturer en ramenant le qi",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/taichi-jour-20.webp",
        etapes: [
          "Debout, pieds écartés à la largeur des hanches, bras le long du corps.",
          "Inspirez en levant lentement les bras sur les côtés jusqu'au-dessus de la tête.",
          "Tournez les paumes vers le bas au sommet du mouvement.",
          "Expirez en descendant les mains devant le visage et le buste, comme pour ramener l'énergie.",
          "Posez les mains l'une sur l'autre sur le bas-ventre. Répétez 6 fois lentement."
        ],
        intention: "Je rassemble mon énergie et je l'ancre en moi."
      },
      yoga: {
        titre: "Relaxation finale (Savasana)",
        duree: "15 min",
        niveau: "Débutant",
        image: "images/yoga-jour-20.webp",
        etapes: [
          "Allongez-vous sur le dos, jambes légèrement écartées, bras le long du corps paumes vers le ciel.",
          "Fermez les yeux et laissez tout le poids du corps se déposer dans le sol.",
          "Relâchez consciemment chaque partie du corps, des pieds jusqu'au visage.",
          "Laissez la respiration devenir naturelle, sans la contrôler.",
          "Restez ainsi 5 minutes, dans un lâcher-prise complet."
        ],
        intention: "Je m'abandonne au calme et je laisse l'énergie circuler."
      }
    }
  ]
};
