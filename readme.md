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

CHANGELOG (per branch assetrefactoring)
---
Jquery, Bootstrap, Vue gestiti tramite webpack
Fix su gulpfile
Spostati gli assets di bower sotto la vendor (una fisima mia)
Piccoli fix a bootstrap.js in modo da eliminare chiamate inutili
