# Progression du Projet Harmonia — Images du Programme 30 jours

**Date de démarrage :** 6 Juin 2026  
**Statut :** En cours — Images en création progressif

---

## 📋 Résumé du travail

Le projet **Harmonia** a intégré un **programme de transformation personnelle 30 jours** basé sur :
- **Tai-chi** : 30 séances progressives (Débutant → Intermédiaire → Avancé)
- **Yoga** : 30 séances progressives (Débutant → Intermédiaire → Avancé)
- **Loi de l'Attraction** : 12 lois qui tournent sur les 30 jours

### Architecture technique
- **Fichier contenu :** `contenu-quotidien.js` (951 lignes, 47.6 KB)
- **Affichage :** Intégré dans `rituel.html` avec calcul du jour basé sur **date d'inscription** (Option B)
- **Dossier images :** `images/` — noms standardisés `.webp`

---

## ✅ TRAVAIL TERMINÉ

### Contenu textuel (100% complet)
- ✅ **12 Lois de l'Attraction** avec titre et texte
- ✅ **30 jours Tai-chi** : titres, durée, niveau, 5 étapes, intention
- ✅ **30 jours Yoga** : titres, durée, niveau, 5 étapes, intention

### Intégration app
- ✅ Script d'affichage dans `rituel.html`
- ✅ Récupération auto de la date d'inscription (Supabase)
- ✅ Calcul du jour du programme (1-30, puis bloqué au jour 30)
- ✅ Cycle des 12 lois [(jour - 1) % 12]
- ✅ Images masquées tant qu'elles n'existent pas (pas de visuels cassés)

---

## 🎨 IMAGES EN COURS

### Tai-chi (Jour 1-30)
**Complétées :** 29 images
- ✅ Jours 1-10 (progression Débutant)
- ✅ Jours 11-20 (progression Débutant+)
- ✅ Jours 21-29 (progression Avancé)
- ⏳ Jour 30 : En attente

**Format :** `images/taichi-jour-XX.webp` (XX = 01 à 30, 2 chiffres)

### Yoga (Jour 1-30)
**Complétées :** 6 images
- ✅ Jours 1-6 (progression Débutant)
- ⏳ Jours 7-30 : À venir

**Format :** `images/yoga-jour-XX.webp` (XX = 01 à 30, 2 chiffres)

---

## 📝 Détails Tai-chi — Jours clés

| Jour | Titre | Durée | Niveau | Image |
|------|-------|-------|--------|-------|
| 1 | L'Ancrage — Posture Wuji | 8 min | Débutant | ✅ |
| 10 | Enchaînement doux — Les 3 premiers mouvements | 12 min | Débutant | ✅ |
| 15 | Le serpent qui rampe | 15 min | Débutant+ | ✅ |
| 20 | Clôturer en ramenant le qi | 15 min | Intermédiaire | ✅ |
| 25 | Brosser le genou en position basse | 20 min | Avancé | ✅ |
| 30 | Clôture du voyage (méditation en mouvement) | 20 min | Avancé | ⏳ |

---

## 📝 Détails Yoga — Jours clés

| Jour | Titre | Durée | Niveau | Image |
|------|-------|-------|--------|-------|
| 1 | L'Éveil du souffle — La Montagne (Tadasana) | 8 min | Débutant | ✅ |
| 5 | Le Chien tête en bas — Étirement complet | 11 min | Débutant | ✅ |
| 6 | La Pince debout — Étirement de l'arrière des jambes | 10 min | Débutant | ✅ |
| 7-30 | (À créer) | — | — | ⏳ |

---

## 🚀 Prochaines étapes

1. **Yoga jours 7-30** : Créer 24 images (format `yoga-jour-07.webp` à `yoga-jour-30.webp`)
2. **Tai-chi jour 30** : Finaliser la dernière image
3. **Tests** : Vérifier l'affichage dans l'app rituel.html

---

## 📂 Nommage standardisé (IMPORTANT)

- Tai-chi : `images/taichi-jour-01.webp` à `taichi-jour-30.webp`
- Yoga : `images/yoga-jour-01.webp` à `yoga-jour-30.webp`
- **Toujours 2 chiffres, toujours .webp**

---

## 💡 Notes importantes

- **Affichage jour :** Basé sur (jours depuis inscription) + 1, bloqué au jour 30
- **Lois tournantes :** Cycle de 12, répétition sur les 30 jours
- **Images masquées :** Les `<img>` se cachent si l'image n'existe pas
- **Déploiement :** Vercel redéploie automatiquement (~30s après dépôt)

---

**Dernière mise à jour :** 6 Juin 2026 — Session en pause, travail sauvegardé ✅
