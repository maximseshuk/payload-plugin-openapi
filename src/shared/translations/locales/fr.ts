import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const fr: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Nombre de niveaux de documents liés à peupler.',
    paramSort: 'Champ de tri ; préfixez avec `-` pour un ordre décroissant, par ex. `-createdAt`.',
    paramSortShort: 'Champ de tri ; préfixez avec `-` pour un ordre décroissant.',
    paramDraft: 'Renvoie les versions brouillon.',
    paramTrash: 'Inclut les documents mis à la corbeille.',
    paramAutosave:
      "Enregistrer en sauvegarde automatique : met à jour la dernière version enregistrée automatiquement au lieu d'en ajouter une.",
    paramPublishAllLocales: 'Publier toutes les langues, pas seulement celle de la requête.',
    paramUnpublishAllLocales: 'Dépublier toutes les langues et repasser le document en brouillon.',
    paramOverrideLock: 'Ignorer un verrou détenu par un autre utilisateur. Par défaut false.',
    paramSelectedLocales: 'Copier seulement ces langues dans le doublon. Par défaut : toutes les langues.',
    paramFlattenLocales:
      "Avec `locale=all`, définissez sur false pour conserver les champs localisés sous forme d'objets par locale. true par défaut.",
    paramLocale:
      "Locale à renvoyer, ou `all` pour toutes les locales. Voir la section Localisation dans la description de l'API.",
    paramFallbackLocale: 'Locale de repli pour les valeurs localisées manquantes, ou `none` pour désactiver.',
    paramValidateLocale:
      "Locales à valider, ou `all` pour toutes les locales. Répétez le paramètre pour plus d'une locale.",
    paramComputeHierarchyPaths:
      'Mettre à true pour calculer les chemins `{{slugPath}}` et `{{titlePath}}`. Sélectionner l’un de ces champs les calcule aussi.',

    schemaSelect: 'Choisissez les champs à renvoyer, par ex. `select[title]=true`. Omettez pour tout renvoyer.',
    schemaPopulate: 'Peuple les documents liés par collection, par ex. `populate[posts][title]=true`.',
    schemaJoins: 'Contrôles par jointure (limit/page/sort/where/count), par ex. `joins[posts][limit]=10`.',
    schemaWhere:
      'Filtre `where` de Payload. Imbriquez un champ puis un opérateur : `where[field][equals]=value`. Combinez les clauses avec les tableaux `and` / `or`, par ex. `where[or][0][field][equals]=value`. Chaque champ ne liste que les opérateurs valides pour son type.',
    schemaSupportedTimezones: 'Fuseaux horaires pris en charge au format IANA.',
    schemaPerLocale: 'Valeurs par locale, renvoyées lorsque `locale=all`.',
    schemaHierarchySlugPath:
      'Chemin de slugs, p. ex. `parent/child`. Calculé à la lecture avec `computeHierarchyPaths=true` ou s’il est sélectionné. Inutilisable dans `where`.',
    schemaHierarchyTitlePath:
      'Chemin de titres, p. ex. `Parent/Child`. Calculé à la lecture avec `computeHierarchyPaths=true` ou s’il est sélectionné. Inutilisable dans `where`.',

    collectionList: 'Liste paginée de documents',
    collectionDoc: 'Un document unique',
    collectionCreated: 'Document créé',
    collectionUpdated: 'Document mis à jour',
    collectionDeleted: 'Document supprimé',
    collectionBulkUpdate: 'Résultat de la mise à jour groupée',
    collectionBulkDelete: 'Résultat de la suppression groupée',
    collectionCount: 'Nombre de documents',
    collectionDuplicated: 'Le document dupliqué',
    validateResult:
      "Résultat de la validation. Rien n'est enregistré. Les valeurs de champ invalides renvoient `valid: false` avec les erreurs, et non un statut d'erreur.",
    validateBody:
      "Données du document à valider. Sur un document enregistré ou un global, les données sont fusionnées sur le dernier brouillon, ou sur le document enregistré s'il n'y a pas de brouillon.",

    globalDoc: 'Le document global',

    authLogin: 'Résultat de la connexion',
    authLogout: 'Résultat de la déconnexion',
    authMe: "L'utilisateur actuellement authentifié",
    authRefreshToken: 'Token rafraîchi',
    authForgotPassword: 'E-mail de réinitialisation du mot de passe envoyé',
    authResetPassword: 'Résultat de la réinitialisation du mot de passe',
    authFirstRegister: "Le premier utilisateur, créé avec un token d'authentification",
    authInit: "Indique si cette collection d'authentification possède déjà des utilisateurs",
    authAccess: "Les permissions de l'utilisateur actuel pour toutes les collections et tous les globaux",
    docAccess: "Les permissions de l'utilisateur actuel pour ce document",
    docAccessBody:
      "Données du document sur lesquelles vérifier l'accès. Sans elles, Payload utilise le document enregistré, s'il existe.",
    authUnlock: 'Résultat du déverrouillage',
    authVerify: 'Résultat de la vérification',
    apiKeyReveal: "La clé d'API déchiffrée",

    versionList: 'Liste paginée de versions',
    versionSingle: 'Une version unique',
    versionRestored: 'Le document restauré',
    versionWhere: 'Filtre sur les champs de version, par ex. `where[parent][equals]=<docId>`.',

    jobsRunSummary: "Exécute les jobs en file d'attente (et, par défaut, gère les planifications)",
    jobsSchedulesSummary: "Met en file d'attente les jobs dus selon leur planification",
    jobsRunResult: "Résultat de l'exécution",
    jobsSchedulesResult: 'Résultat de la planification',
    jobsRunAllQueues: "Exécute les jobs sur toutes les files d'attente.",
    jobsLimit: 'Nombre maximal de jobs à exécuter.',
    jobsDisableScheduling: 'Ignore la gestion des planifications que `run` effectue par défaut.',
    jobsSilent: "Supprime la journalisation de l'exécution.",
    jobsSchedulesAllQueues: "Gère les planifications sur toutes les files d'attente.",
    jobsQueue: "Restreint l'opération à une seule file d'attente. Files connues : {{queues}}.",

    uploadFile: 'Le fichier binaire à téléverser.',
    uploadBody:
      "Envoyez `multipart/form-data` pour téléverser un fichier (une partie binaire `file` plus une partie `_payload` contenant les champs au format JSON), ou `application/json` avec uniquement les champs en l'absence de fichier.",
    uploadPayloadField: 'Champs {{schema}} au format JSON. Exemple : `{"alt":"A caption"}`.',
    fileServe: 'Le fichier',
    filePartial: 'Une partie du fichier, pour une requête `Range`',
    paramFileVersion: 'Renvoie le fichier enregistré avec cet ID de version.',
    uploadInstructionsSummary: "Obtenir les instructions pour téléverser un fichier avant d'enregistrer le document",
    uploadInstructionsResult:
      'Où envoyer les octets du fichier, et la valeur `file` à envoyer avec la requête de création ou de mise à jour',
    uploadStagePutSummary: 'Envoyer les octets du fichier pour un téléversement temporaire',
    uploadStageDeleteSummary: 'Supprimer un téléversement temporaire',
    uploadStageResult: 'Terminé, aucun contenu',

    error400: 'Erreur de validation ou de requête (ValidationError, QueryError)',
    error401: 'Non authentifié (AuthenticationError)',
    error403: "Interdit par le contrôle d'accès (Forbidden, UnverifiedEmail)",
    error404: 'Document introuvable (NotFound)',
    error500: 'Erreur interne du serveur (APIError)',

    securityBearer:
      'Collez le `token` renvoyé par le point de terminaison de connexion. Envoyé sous la forme `Authorization: Bearer <token>`. Payload accepte également le schéma `JWT <token>` et un cookie `{{cookiePrefix}}-token`.',
    securityInteractive:
      "Connexion interactive : saisissez le nom d'utilisateur (ou l'e-mail) et le mot de passe ; laissez Client ID/Secret vides.",

    tagCollections: 'Collections',
    tagCollectionsDesc: 'Points de terminaison des collections de documents (CRUD, comptage, duplication).',
    tagGlobals: 'Globaux',
    tagGlobalsDesc: 'Points de terminaison des documents globaux.',
    tagSystem: 'Système',
    tagSystemDesc: 'Points de terminaison système de Payload.',
    tagAuth: 'Authentification',
    tagVersions: 'Versions',
    tagJobs: 'Jobs',
    tagUploads: 'Téléversements',
    tagAccess: 'Accès',
    tagPlugins: 'Plugins',
    tagPluginsDesc: 'Points de terminaison ajoutés par les plugins officiels de Payload.',
    errorPlugin400: 'Requête invalide',
    errorPlugin401: 'Non authentifié',
    errorPlugin403: 'Accès refusé',
    errorPlugin404: 'Introuvable',
    errorPlugin500: 'Erreur interne du serveur',
    ecommerceAddItem: 'Ajouter un article au panier',
    ecommerceRemoveItem: 'Retirer un article du panier',
    ecommerceUpdateItem: 'Modifier la quantité d’un article du panier',
    ecommerceClearCart: 'Vider le panier',
    ecommerceMergeCart: 'Fusionner un panier invité dans ce panier',
    ecommerceCartAccess:
      'Autorisé pour le propriétaire du panier, ou pour un panier invité avec son `secret` dans le corps.',
    ecommerceCartResult: 'Le panier mis à jour',
    errorEcommerce404: 'Panier introuvable ou inaccessible',
    ecommerceQuantity: 'Nouvelle quantité, ou `{ "$inc": n }` pour la modifier de n.',
    ecommerceInitiatePayment: 'Démarrer un paiement avec `{{method}}`',
    ecommerceConfirmOrder: 'Confirmer le paiement avec `{{method}}` et créer la commande',
    ecommercePaymentBody:
      'Utilise `cartID` (avec `secret` pour un panier invité) ou le panier de l’utilisateur. Sans utilisateur, `customerEmail` est obligatoire. L’adaptateur de paiement peut exiger d’autres champs.',
    ecommerceInitiateResult: 'Paiement démarré. L’adaptateur ajoute ses propres champs, par ex. un secret client.',
    ecommerceConfirmResult: 'La commande a été créée',
    stripeWebhook: 'Recevoir les événements webhook de Stripe',
    stripeWebhookBody:
      'L’événement Stripe brut, signé dans l’en-tête `Stripe-Signature`. Appelé par Stripe, pas par les clients de l’API.',
    stripeWebhookResult: 'Événement reçu',
    errorStripeWebhook400: 'La vérification de la signature a échoué',
    stripeRest: 'Appeler une méthode autorisée de l’API Stripe',
    stripeRestResult: 'Le résultat de l’API Stripe',
    errorStripeRest404: 'L’API Stripe a renvoyé une erreur',
    mcp: 'Envoyer un message MCP JSON-RPC',
    mcpDesc:
      'Model Context Protocol via Streamable HTTP, avec des réponses JSON. Les requêtes anonymes fonctionnent ; les outils listés dépendent des droits de l’utilisateur. Les clients utilisant une version du protocole de 2025 doivent envoyer `Accept: application/json, text/event-stream`.',
    mcpResult: 'Réponse JSON-RPC',
    mcpOverrideAccess: 'Ignorer les contrôles d’accès. Développement uniquement.',
    mcpGet: 'Non pris en charge : le serveur n’ouvre aucun flux d’événements',
    errorMcpGet405: 'Méthode non autorisée, utilisez POST',
    mcpProtocolVersion: 'Version négociée du protocole MCP, par ex. `2025-06-18`.',
    mcpResult202: 'Accepté : le corps ne contenait que des notifications ou des réponses',
    errorMcp404: 'Méthode MCP inconnue',
    errorMcp406: 'L’en-tête `Accept` ne contient pas `application/json` ou `text/event-stream`',
    errorMcp413: 'Le corps de la requête est trop volumineux',
    errorMcp415: '`Content-Type` doit être `application/json`',
    seoTitle: 'Générer le méta-titre',
    seoDescription: 'Générer la méta-description',
    seoUrl: 'Générer l’URL d’aperçu',
    seoImage: 'Générer la méta-image',
    seoBody:
      'Le document en cours d’édition : `collectionSlug` ou `globalSlug`, son `id` et les données `doc` actuelles. Transmis à votre fonction de génération.',
    seoResult: 'La valeur générée. Une chaîne vide si aucune fonction de génération n’est définie.',
    searchReindex: 'Reconstruire l’index de recherche pour certaines collections',
    searchReindexResult: 'Résumé de la réindexation',
    tenantOptions: 'Lister les locataires que l’utilisateur peut choisir',
    tenantOptionsResult: 'Options de locataire',
    exportDownload: 'Exporter des documents vers un fichier',
    exportDownloadResult: 'Le fichier d’export',
    exportPreview: 'Aperçu d’un export',
    importPreview: 'Aperçu d’un fichier d’import',
    previewResult: 'Une page de documents d’aperçu',
    importFileData: 'Contenu du fichier, encodé en base64.',
    r2Upload: 'Téléverser un fichier vers R2 en plusieurs parties',
    r2UploadDesc:
      'Trois étapes sur une seule route. Début : envoyez `collection`, `fileName` et `fileType`. Chaque partie : ajoutez `multipartId`, `multipartKey`, `multipartNumber` et `signedReceipt`, puis envoyez les octets. Fin : la même chose sans `multipartNumber`, avec la liste JSON des parties.',
    r2UploadResult: 'Téléversement démarré, partie envoyée ou téléversement terminé (la clé de l’objet en texte)',
    errorR2412: 'Un fichier existe déjà à cette clé',

    localizationHeading: 'Localisation',
    localizationNote:
      'Locales disponibles : {{locales}}. Passez `?locale=<code>` à un point de terminaison de lecture pour en sélectionner une. Passez `?locale=all` pour recevoir toutes les locales en une fois — chaque champ localisé est alors renvoyé sous forme d\'objet indexé par code de locale (par ex. `{ "en": "Hello", "de": "Hallo" }`) au lieu d\'une valeur unique. Définissez `?flattenLocales=false` avec `locale=all` pour conserver cette forme d\'objet par locale. Les schémas de champ affichent la forme à locale unique.',
    docLanguagesNote:
      "Cette documentation est disponible dans les langues suivantes : {{languages}}. Ajoutez `?lang=<code>` à l'URL de cette spécification pour en changer.",
  },
}
