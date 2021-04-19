FROM node
WORKDIR /cache
COPY package.json ./package.json
COPY .npmrc ./.npmrc
RUN npm install

FROM node
WORKDIR /build
COPY --from=0 /cache/node_modules ./node_modules
COPY . .
RUN npm run build

FROM nginx
COPY --from=1 /build/dist /var/www/html

