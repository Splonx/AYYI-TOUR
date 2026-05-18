# AYYI TOUR - Transport Service VIP

Site officiel de reservation et de presentation des services premium AYYI TOUR.

---

# Presentation

AYYI TOUR est une societe specialisee dans le transport VIP et les services de chauffeur prive a :

- Agadir
- Marrakech
- Region Maroc

Le site permet :

- la presentation des services
- la gestion dynamique de la flotte
- les demandes de reservation
- l'administration du contenu via un back-office securise

---

# Fonctionnalites

## Front Office

- Homepage premium noir/dore
- Animations et fond dynamique
- Presentation des services
- Galerie flotte de vehicules
- Formulaire de reservation
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
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
ADMIN_LOGIN="Sami"
ADMIN_PASSWORD="change-this-password"
ADMIN_SESSION_SECRET="replace-with-a-long-random-secret"
WHATSAPP_NOTIFICATION_TO="212672508363"
WHATSAPP_ACCESS_TOKEN=""
WHATSAPP_PHONE_NUMBER_ID=""
```

Sans Supabase, l'administration utilise le mode local avec `data/admin-catalog.json`.

Les demandes de reservation sont enregistrees dans le back-office. Pour envoyer
une notification WhatsApp automatique, renseigner les variables WhatsApp Business
API `WHATSAPP_ACCESS_TOKEN` et `WHATSAPP_PHONE_NUMBER_ID`; sinon le site ouvre
un message WhatsApp prerempli vers `WHATSAPP_NOTIFICATION_TO`.
