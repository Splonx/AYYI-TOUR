# AYYI TOUR - Transport Service VIP

Site officiel de presentation des services premium AYYI TOUR.

---

# Presentation

AYYI TOUR est une societe specialisee dans le transport VIP et les services de chauffeur prive a :

- Agadir
- Marrakech
- Region Maroc

Le site permet :

- la presentation des services
- la gestion dynamique de la flotte
- la prise de contact par email et WhatsApp
- l'administration du contenu via un back-office securise

---

# Fonctionnalites

## Front Office

- Homepage premium noir/dore
- Animations et fond dynamique
- Presentation des services
- Galerie flotte de vehicules
- CTA email prerempli pour planifier un trajet
- Contact WhatsApp direct
- Responsive mobile/tablette/desktop

## Back Office

- Connexion admin securisee
- Gestion des services
- Gestion de la flotte
- Ajout, modification et suppression avec confirmation
- Mode local de developpement via `data/admin-catalog.json`
- Integration Supabase prete via variables d'environnement

---

# Lancer le projet

```bash
npm install
npm run dev
```

Ouvrir ensuite :

```text
http://localhost:3000
```

---

# Configuration

Copier `.env.example` vers `.env.local`, puis renseigner les variables selon l'environnement :

```env
NEXT_PUBLIC_SITE_URL="https://ayyi-tour.com"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
# ou NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="your-publishable-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
# ou SUPABASE_SECRET_KEY="your-secret-key"
ADMIN_LOGIN="Sami"
ADMIN_PASSWORD="change-this-password"
ADMIN_SESSION_SECRET="replace-with-a-long-random-secret"
```

Sans Supabase, l'administration utilise le mode local avec `data/admin-catalog.json`.

Le bouton "Planifier un trajet" ouvre le client email de l'utilisateur avec un
message prerempli vers `reservation@ayyi-tour.com`.

---

# Deploiement production

## Vercel

- Framework preset: Next.js
- Build command: `npm run build`
- Install command: `npm install`
- Production domain: `https://ayyi-tour.com`
- Renseigner toutes les variables de `.env.example` dans Vercel Project Settings > Environment Variables.
- Ne jamais exposer `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SECRET_KEY`, `ADMIN_PASSWORD` ou `ADMIN_SESSION_SECRET` cote client.

## OVH DNS

Ajouter le domaine `ayyi-tour.com` dans Vercel, puis configurer les DNS OVH avec les valeurs donnees par Vercel:

- Domaine racine `ayyi-tour.com`: record `A` vers l'adresse IP Vercel fournie.
- Sous-domaine `www`: record `CNAME` vers la cible Vercel fournie.
- Une fois valide, activer la redirection canonique vers `https://ayyi-tour.com`.

## Supabase

- Appliquer les migrations du dossier `supabase/migrations`.
- Verifier que les tables `services` et `fleet` existent.
- Les images de flotte sont servies localement depuis `public/fleet`.
- Garder RLS active.
- Utiliser `SUPABASE_SERVICE_ROLE_KEY` ou `SUPABASE_SECRET_KEY` uniquement dans les variables serveur Vercel.
- Apres connexion admin, ouvrir `/admin/diagnostics` pour verifier les variables,
  les tables et le bucket Storage en production.

## Checklist production

- `npm run lint`
- `npm run build`
- Tester `/`, `/services`, `/fleet`, `/admin/login`, `/robots.txt`, `/sitemap.xml`.
- Tester le lien email "Planifier un trajet" et les liens WhatsApp.
- Verifier le rendu mobile avant mise en ligne.
