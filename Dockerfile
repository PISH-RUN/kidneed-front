# Test
FROM node:16.14-alpine as test-target
ENV NODE_ENV=development
ENV PATH $PATH:/usr/src/app/node_modules/.bin

WORKDIR /usr/src/app

COPY ./app/package*.json ./
COPY ./app/yarn.lock ./

# CI and release builds should use npm ci to fully respect the lockfile.
# Local development may use npm install for opportunistic package updates.
RUN yarn

COPY ./app .

# Build
FROM test-target as build-target
ENV NODE_ENV=production

# Use build tools, installed as development packages, to produce a release build.
RUN yarn build

# Archive
FROM node:16.14-alpine as archive-target
ENV NODE_ENV=production
ENV PATH $PATH:/usr/src/app/node_modules/.bin

WORKDIR /usr/src/app

# Include only the release build and production packages.
COPY --from=build-target /usr/src/app .

RUN npm i -g next

RUN ls -la

CMD ["next", "start"]