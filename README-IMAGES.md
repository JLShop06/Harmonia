# Progression du Projet Harmonia — Images du Programme 30 jours

**Date de démarrage :** 6 Juin 2026  
**Dernière session :** 8 Juin 2026  
**Statut :** ✅ Images Tai-chi et Yoga complètes (30/30 chacune)

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

## 🎨 IMAGES

### Tai-chi (Jour 1-30) ✅ COMPLET
Complétées : **30 images**
- ✅ Jours 1-10 (progression Débutant)
- ✅ Jours 11-20 (progression Débutant+)
- ✅ Jours 21-29 (progression Avancé)
- ✅ Jour 30 (Clôture du voyage) — ajouté le 8 Juin 2026

Format : `images/taichi-jour-XX.webp` (XX = 01 à 30, 2 chiffres)

### Yoga (Jour 1-30) ✅ COMPLET
Complétées : **30 images**
- ✅ Jours 1-6 (progression Débutant)
- ✅ Jours 7-20 (progression Débutant) — ajoutés le 8 Juin 2026
- ✅ Jours 21-30 (progression Intermédiaire) — ajoutés le 8 Juin 2026

Format : `images/yoga-jour-XX.webp` (XX = 01 à 30, 2 chiffres)

---

## 📝 Détails Tai-chi — Jours clés
| Jour | Titre | Durée | Niveau | Image |
|------|-------|-------|--------|-------|
| 1 | L'Ancrage — Posture Wuji | 8 min | Débutant | ✅ |
| 10 | Enchaînement doux — Les 3 premiers mouvements | 12 min | Débutant | ✅ |
| 15 | Le serpent qui rampe | 15 min | Débutant+ | ✅ |
| 20 | Clôturer en ramenant le qi | 15 min | Intermédiaire | ✅ |
| 25 | Brosser le genou en position basse | 20 min | Avancé | ✅ |
| 30 | Clôture du voyage (méditation en mouvement) | 20 min | Avancé | ✅ |

## 📝 Détails Yoga — Jours clés
| Jour | Titre | Durée | Niveau | Image |
|------|-------|-------|--------|-------|
| 1 | L'Éveil du souffle — La Montagne (Tadasana) | 8 min | Débutant | ✅ |
| 5 | Le Chien tête en bas — Étirement complet | 11 min | Débutant | ✅ |
| 6 | La Pince debout — Étirement de l'arrière des jambes | 10 min | Débutant | ✅ |
| 10 | Salutation au soleil simplifiée | 12 min | Débutant | ✅ |
| 15 | Le guerrier I (Virabhadrasana I) | 15 min | Débutant | ✅ |
| 20 | Relaxation finale (Savasana) | 15 min | Débutant | ✅ |
| 25 | Le bateau (Navasana) | 20 min | Intermédiaire | ✅ |
| 30 | Relaxation profonde et gratitude (Savasana) | 20 min | Intermédiaire | ✅ |

---

## 🚀 Prochaines étapes
- ✅ Yoga jours 7-30 : 24 images créées
- ✅ Tai-chi jour 30 : image finalisée
- ⏳ Tests : Vérifier l'affichage dans l'app `rituel.html`

---

## 📂 Nommage standardisé (IMPORTANT)
- **Tai-chi** : `images/taichi-jour-01.webp` à `taichi-jour-30.webp`
- **Yoga** : `images/yoga-jour-01.webp` à `yoga-jour-30.webp`
- Toujours 2 chiffres, toujours `.webp`

---

## 💡 Notes importantes
- **Affichage jour :** Basé sur (jours depuis inscription) + 1, bloqué au jour 30
- **Lois tournantes :** Cycle de 12, répétition sur les 30 jours
- **Images masquées :** Les `<img>` se cachent si l'image n'existe pas
- **Déploiement :** Vercel redéploie automatiquement (~30s après dépôt)

---

**Dernière mise à jour : 8 Juin 2026 — Toutes les images Tai-chi (30) et Yoga (30) sont en place ✅**
