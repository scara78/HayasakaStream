FROM ghcr.io/puppeteer/puppeteer:21.6.1

USER root
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

EXPOSE 3000
USER pptruser
CMD ["npm", "start"]