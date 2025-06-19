# Wybór obrazu bazowego Node.js
FROM node:16-alpine

# Ustawienie katalogu roboczego w kontenerze
WORKDIR /app

# Skopiowanie package.json i package-lock.json do kontenera
COPY package*.json ./

# Instalacja zależności
RUN npm install

# Skopiowanie reszty aplikacji
COPY . .

# Wystawienie portu, na którym aplikacja będzie działać
EXPOSE 5000

# Uruchomienie aplikacji
CMD ["node", "server.js"]
