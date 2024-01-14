# Użyj oficjalnego obrazu Node jako bazowego obrazu
FROM node:14-alpine

# Ustaw bieżący katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj pliki projektu do katalogu roboczego w kontenerze
COPY . .

# Zainstaluj zależności
RUN npm install

# Uruchom aplikację React
CMD ["npm", "start"]