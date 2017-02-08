CONFIGURATORE SPLIT
===

Installazione
---
```bash
npm install
composer install
```
Configurare file .env (specialmente per db)
```bash
php artisan migrate
gulp
```

Durante lo sviluppo quando si lavora con gli assets si può utilizzare il comando
```bash
gulp watch
```
In questo modo le modifiche agli assets in resources saranno tutte automaticamente gestite (compilate, copiate etc etc) 



TODO
---
Controllare se il branch assetsrefactoring è completamente allineato come funzionalità con master. In caso
positivio fare un force e trasformarlo in master.

SWITCH (per branch assetrefactoring)
---
- Svuotare il db (eliminare tutte le cartelle)
- Rinominare la cartella del progetto e clonare di nuovo
- Da dentro la cartella del progetto (branch master)
- npm install
- bower install
- composer install
- php artisan key:generate
- php artisan migrate
- php artisan db:seed
- gulp

VARIAZIONI:

- Il vecchio branch master l'ho backupato su master_old
- Il codice in dom per step3 l'ho spostato sotto resources/assets/js/split/
- Per avere subito le modifiche si può usare gulp watch
- Con l'ultima versione di vue ready() è stato sostituito da mounted
- Per i binding ho usato gli shorthand @keyup = v-on:keyup (consigliato dalla comunity vue)
- I package di bower li ho spostati sotto vendor/bower_components (Consigliato da comunity elixir)
- Ho rigenerato i models con gli strumenti automatici di laravel (abbiamo tutte le relazioni intermedie pronte)

