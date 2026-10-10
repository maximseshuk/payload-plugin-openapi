import type { PluginDefaultTranslationsObject } from '@/shared/translations/types.js'

export const de: PluginDefaultTranslationsObject = {
  '@seshuk/payload-plugin-openapi': {
    paramDepth: 'Wie viele Ebenen verknüpfter Dokumente befüllt werden sollen.',
    paramSort: 'Feld, nach dem sortiert wird; für absteigende Sortierung mit `-` voranstellen, z. B. `-createdAt`.',
    paramSortShort: 'Feld, nach dem sortiert wird; für absteigende Sortierung mit `-` voranstellen.',
    paramDraft: 'Entwurfsversionen zurückgeben.',
    paramTrash: 'Gelöschte Dokumente einbeziehen.',
    paramAutosave: 'Als Autosave speichern: aktualisiert die letzte Autosave-Version, statt eine neue anzulegen.',
    paramPublishAllLocales: 'Alle Sprachen veröffentlichen, nicht nur die Sprache der Anfrage.',
    paramUnpublishAllLocales:
      'Die Veröffentlichung aller Sprachen aufheben und das Dokument wieder zum Entwurf machen.',
    paramOverrideLock: 'Eine Sperre eines anderen Benutzers ignorieren. Standard false.',
    paramSelectedLocales: 'Nur diese Sprachen in das Duplikat kopieren. Standard: alle Sprachen.',
    paramFlattenLocales:
      'Mit `locale=all` auf false setzen, um lokalisierte Felder als Objekte je Sprache zu behalten. Standard ist true.',
    paramLocale:
      'Zurückzugebende Sprache oder `all` für alle Sprachen. Siehe den Abschnitt zur Lokalisierung in der API-Beschreibung.',
    paramFallbackLocale:
      'Sprache, auf die bei fehlenden lokalisierten Werten zurückgegriffen wird, oder `none` zum Deaktivieren.',
    paramValidateLocale:
      'Zu validierende Sprachen oder `all` für alle Sprachen. Für mehrere Sprachen den Parameter wiederholen.',
    paramComputeHierarchyPaths:
      'Auf true setzen, um die Pfade `{{slugPath}}` und `{{titlePath}}` zu berechnen. Die Auswahl eines der beiden Felder berechnet sie ebenfalls.',

    schemaSelect: 'Zurückzugebende Felder auswählen, z. B. `select[title]=true`. Weglassen, um alle zurückzugeben.',
    schemaPopulate: 'Verknüpfte Dokumente je Collection befüllen, z. B. `populate[posts][title]=true`.',
    schemaJoins: 'Steuerung je Join (limit/page/sort/where/count), z. B. `joins[posts][limit]=10`.',
    schemaWhere:
      'Payload-`where`-Filter. Verschachteln Sie ein Feld und dann einen Operator: `where[field][equals]=value`. Verknüpfen Sie Klauseln mit den Arrays `and` / `or`, z. B. `where[or][0][field][equals]=value`. Jedes Feld listet nur die für seinen Typ gültigen Operatoren auf.',
    schemaSupportedTimezones: 'Unterstützte Zeitzonen im IANA-Format.',
    schemaPerLocale: 'Werte je Sprache, zurückgegeben bei `locale=all`.',
    schemaHierarchySlugPath:
      'Slug-Pfad, z. B. `parent/child`. Wird beim Lesen mit `computeHierarchyPaths=true` oder bei Auswahl berechnet. Nicht in `where` verwendbar.',
    schemaHierarchyTitlePath:
      'Titel-Pfad, z. B. `Parent/Child`. Wird beim Lesen mit `computeHierarchyPaths=true` oder bei Auswahl berechnet. Nicht in `where` verwendbar.',

    collectionList: 'Paginierte Liste von Dokumenten',
    collectionDoc: 'Ein einzelnes Dokument',
    collectionCreated: 'Erstelltes Dokument',
    collectionUpdated: 'Aktualisiertes Dokument',
    collectionDeleted: 'Gelöschtes Dokument',
    collectionBulkUpdate: 'Ergebnis der Massenaktualisierung',
    collectionBulkDelete: 'Ergebnis der Massenlöschung',
    collectionCount: 'Anzahl der Dokumente',
    collectionDuplicated: 'Das duplizierte Dokument',
    validateResult:
      'Validierungsergebnis. Es wird nichts gespeichert. Ungültige Feldwerte liefern `valid: false` mit den Fehlern, keinen Fehlerstatus.',
    validateBody:
      'Zu validierende Dokumentdaten. Bei einem gespeicherten Dokument oder einem Global werden die Daten über den neuesten Entwurf gelegt, oder über das gespeicherte Dokument, falls es keinen Entwurf gibt.',

    globalDoc: 'Das globale Dokument',

    authLogin: 'Anmeldeergebnis',
    authLogout: 'Abmeldeergebnis',
    authMe: 'Der aktuell authentifizierte Benutzer',
    authRefreshToken: 'Erneuertes Token',
    authForgotPassword: 'E-Mail zum Zurücksetzen des Passworts gesendet',
    authResetPassword: 'Ergebnis des Passwort-Zurücksetzens',
    authFirstRegister: 'Der erste Benutzer, erstellt mit einem Auth-Token',
    authInit: 'Ob diese Auth-Collection bereits Benutzer hat',
    authAccess: 'Die Berechtigungen des aktuellen Benutzers für alle Collections und Globals',
    docAccess: 'Die Berechtigungen des aktuellen Benutzers für dieses Dokument',
    docAccessBody:
      'Dokumentdaten, gegen die der Zugriff geprüft wird. Ohne sie nutzt Payload das gespeicherte Dokument, falls es eines gibt.',
    authUnlock: 'Ergebnis des Entsperrens',
    authVerify: 'Verifizierungsergebnis',
    apiKeyReveal: 'Der entschlüsselte API-Schlüssel',

    versionList: 'Paginierte Liste von Versionen',
    versionSingle: 'Eine einzelne Version',
    versionRestored: 'Das wiederhergestellte Dokument',
    versionWhere: 'Filtern über Versionsfelder, z. B. `where[parent][equals]=<docId>`.',

    jobsRunSummary: 'Eingereihte Jobs ausführen (und standardmäßig Zeitpläne verarbeiten)',
    jobsSchedulesSummary: 'Jobs einreihen, die gemäß ihrem Zeitplan fällig sind',
    jobsRunResult: 'Ausführungsergebnis',
    jobsSchedulesResult: 'Ergebnis der Zeitplanung',
    jobsRunAllQueues: 'Jobs über alle Warteschlangen hinweg ausführen.',
    jobsLimit: 'Maximale Anzahl auszuführender Jobs.',
    jobsDisableScheduling: 'Die Zeitplanverarbeitung überspringen, die `run` standardmäßig durchführt.',
    jobsSilent: 'Ausführungsprotokollierung unterdrücken.',
    jobsSchedulesAllQueues: 'Zeitpläne über alle Warteschlangen hinweg verarbeiten.',
    jobsQueue: 'Den Vorgang auf eine einzelne Warteschlange beschränken. Bekannte Warteschlangen: {{queues}}.',

    uploadFile: 'Die hochzuladende Binärdatei.',
    uploadBody:
      'Senden Sie `multipart/form-data`, um eine Datei hochzuladen (ein binärer `file`-Teil plus ein `_payload`-Teil mit den als JSON-String serialisierten Feldern), oder `application/json` nur mit den Feldern, wenn keine Datei vorhanden ist.',
    uploadPayloadField: 'Als JSON-String serialisierte {{schema}}-Felder. Beispiel: `{"alt":"A caption"}`.',
    fileServe: 'Die Datei',
    filePartial: 'Ein Teil der Datei bei einer `Range`-Anfrage',
    paramFileVersion: 'Liefert die Datei, die mit dieser Versions-ID gespeichert wurde.',
    uploadInstructionsSummary: 'Anweisungen zum Hochladen einer Datei vor dem Speichern des Dokuments abrufen',
    uploadInstructionsResult:
      'Wohin die Bytes der Datei gesendet werden und welcher `file`-Wert mit der Erstellungs- oder Aktualisierungsanfrage gesendet wird',
    uploadStagePutSummary: 'Die Bytes der Datei für einen Zwischen-Upload senden',
    uploadStageDeleteSummary: 'Einen Zwischen-Upload löschen',
    uploadStageResult: 'Erledigt, kein Inhalt',

    error400: 'Validierungs- oder Abfragefehler (ValidationError, QueryError)',
    error401: 'Nicht authentifiziert (AuthenticationError)',
    error403: 'Durch Zugriffssteuerung verboten (Forbidden, UnverifiedEmail)',
    error404: 'Dokument nicht gefunden (NotFound)',
    error500: 'Interner Serverfehler (APIError)',

    securityBearer:
      'Fügen Sie das vom Login-Endpunkt zurückgegebene `token` ein. Wird als `Authorization: Bearer <token>` gesendet. Payload akzeptiert auch das Schema `JWT <token>` und ein `{{cookiePrefix}}-token`-Cookie.',
    securityInteractive:
      'Interaktive Anmeldung: Benutzername (oder E-Mail) und Passwort eingeben; Client ID/Secret leer lassen.',

    tagCollections: 'Collections',
    tagCollectionsDesc: 'Endpunkte für Dokument-Collections (CRUD, Anzahl, Duplizieren).',
    tagGlobals: 'Globals',
    tagGlobalsDesc: 'Endpunkte für globale Dokumente.',
    tagSystem: 'System',
    tagSystemDesc: 'Payload-Systemendpunkte.',
    tagAuth: 'Authentifizierung',
    tagVersions: 'Versionen',
    tagJobs: 'Jobs',
    tagUploads: 'Uploads',
    tagAccess: 'Zugriff',
    tagPlugins: 'Plugins',
    tagPluginsDesc: 'Endpunkte offizieller Payload-Plugins.',
    errorPlugin400: 'Ungültige Anfrage',
    errorPlugin401: 'Nicht angemeldet',
    errorPlugin403: 'Zugriff verweigert',
    errorPlugin404: 'Nicht gefunden',
    errorPlugin500: 'Interner Serverfehler',
    ecommerceAddItem: 'Artikel zum Warenkorb hinzufügen',
    ecommerceRemoveItem: 'Artikel aus dem Warenkorb entfernen',
    ecommerceUpdateItem: 'Menge eines Warenkorbartikels ändern',
    ecommerceClearCart: 'Alle Artikel aus dem Warenkorb entfernen',
    ecommerceMergeCart: 'Gast-Warenkorb in diesen Warenkorb übernehmen',
    ecommerceCartAccess:
      'Erlaubt für den Besitzer des Warenkorbs oder für einen Gast-Warenkorb mit seinem `secret` im Body.',
    ecommerceCartResult: 'Der aktualisierte Warenkorb',
    errorPluginEcommerce404: 'Warenkorb nicht gefunden oder nicht zugänglich',
    ecommerceQuantity: 'Neue Menge, oder `{ "$inc": n }`, um sie um n zu ändern.',
    ecommerceInitiatePayment: 'Zahlung mit `{{method}}` starten',
    ecommerceConfirmOrder: 'Zahlung mit `{{method}}` bestätigen und Bestellung anlegen',
    ecommercePaymentBody:
      'Nutzt `cartID` (mit `secret` bei einem Gast-Warenkorb) oder den Warenkorb des Benutzers. Ohne Benutzer ist `customerEmail` Pflicht. Der Zahlungsadapter kann weitere Felder benötigen.',
    ecommerceInitiateResult: 'Zahlung gestartet. Der Adapter ergänzt eigene Felder, z. B. ein Client-Secret.',
    ecommerceConfirmResult: 'Die Bestellung wurde angelegt',
    stripeWebhook: 'Stripe-Webhook-Ereignisse empfangen',
    stripeWebhookBody:
      'Das rohe Stripe-Ereignis, signiert im Header `Stripe-Signature`. Wird von Stripe aufgerufen, nicht von API-Clients.',
    stripeWebhookResult: 'Ereignis empfangen',
    errorPluginStripeWebhook400: 'Die Signaturprüfung ist fehlgeschlagen',
    stripeRest: 'Eine erlaubte Stripe-API-Methode aufrufen',
    stripeRestResult: 'Das Ergebnis der Stripe-API',
    errorPluginStripeRest404: 'Die Stripe-API hat einen Fehler gemeldet',
    mcp: 'Eine MCP-JSON-RPC-Nachricht senden',
    mcpDesc:
      'Model Context Protocol über Streamable HTTP mit JSON-Antworten. Anonyme Anfragen funktionieren; welche Tools aufgelistet werden, hängt von den Rechten des Benutzers ab. Clients mit einer Protokollversion von 2025 müssen `Accept: application/json, text/event-stream` senden.',
    mcpResult: 'JSON-RPC-Antwort',
    mcpOverrideAccess: 'Zugriffsprüfungen überspringen. Nur für die Entwicklung.',
    mcpGet: 'Nicht unterstützt: Der Server öffnet keinen Event-Stream',
    errorPluginMcpGet405: 'Methode nicht erlaubt, POST verwenden',
    mcpProtocolVersion: 'Ausgehandelte MCP-Protokollversion, z. B. `2025-06-18`.',
    mcpResult202: 'Angenommen: Der Body enthielt nur Benachrichtigungen oder Antworten',
    errorPluginMcp404: 'Unbekannte MCP-Methode',
    errorPluginMcp406: 'Dem Header `Accept` fehlt `application/json` oder `text/event-stream`',
    errorPluginMcp413: 'Der Request-Body ist zu groß',
    errorPluginMcp415: '`Content-Type` muss `application/json` sein',
    seoTitle: 'Meta-Titel generieren',
    seoDescription: 'Meta-Beschreibung generieren',
    seoUrl: 'Vorschau-URL generieren',
    seoImage: 'Meta-Bild generieren',
    seoBody:
      'Das bearbeitete Dokument: `collectionSlug` oder `globalSlug`, seine `id` und die aktuellen `doc`-Daten. Wird an Ihre Generate-Funktion übergeben.',
    seoResult: 'Der generierte Wert. Ein leerer String, wenn keine Generate-Funktion gesetzt ist.',
    searchReindex: 'Suchindex für einzelne Collections neu aufbauen',
    searchReindexResult: 'Zusammenfassung der Neuindexierung',
    tenantOptions: 'Mandanten auflisten, die der Benutzer wählen kann',
    tenantOptionsResult: 'Mandantenoptionen',
    exportDownload: 'Dokumente in eine Datei exportieren',
    exportDownloadResult: 'Die Exportdatei',
    exportPreview: 'Vorschau eines Exports',
    importPreview: 'Vorschau einer Importdatei',
    previewResult: 'Eine Seite mit Vorschau-Dokumenten',
    importFileData: 'Dateiinhalt, Base64-kodiert.',
    r2Upload: 'Datei in Teilen zu R2 hochladen',
    r2UploadDesc:
      'Drei Schritte auf einer Route. Start: `collection`, `fileName` und `fileType` senden. Jeden Teil hochladen: `multipartId`, `multipartKey`, `multipartNumber` und `signedReceipt` ergänzen und die Bytes senden. Abschließen: dasselbe ohne `multipartNumber`, mit der JSON-Liste der Teile.',
    r2UploadResult: 'Upload gestartet, Teil hochgeladen oder Upload abgeschlossen (der Objektschlüssel als Text)',
    errorStorageR2412: 'Unter diesem Schlüssel existiert bereits eine Datei',

    localizationHeading: 'Lokalisierung',
    localizationNote:
      'Verfügbare Sprachen: {{locales}}. Übergeben Sie `?locale=<code>` an einen Lese-Endpunkt, um eine auszuwählen. Übergeben Sie `?locale=all`, um alle Sprachen auf einmal zu erhalten — jedes lokalisierte Feld wird dann als Objekt zurückgegeben, dessen Schlüssel der Sprachcode ist (z. B. `{ "en": "Hello", "de": "Hallo" }`), anstatt als einzelner Wert. Setzen Sie `?flattenLocales=false` zusammen mit `locale=all`, um diese Objektform je Sprache beizubehalten. Feldschemata zeigen die Form für eine einzelne Sprache.',
    docLanguagesNote:
      'Diese Dokumentation ist verfügbar in: {{languages}}. Hängen Sie `?lang=<code>` an diese Spezifikations-URL an, um zu wechseln.',
  },
}
