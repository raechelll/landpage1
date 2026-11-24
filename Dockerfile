FROM node:24.11.1-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --no-audit --no-fund

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]
