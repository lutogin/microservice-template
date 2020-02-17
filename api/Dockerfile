
FROM node:10.15.1-alpine as builder

WORKDIR /app
COPY ./ /app

RUN apk update && \
    apk upgrade && \
    apk add --no-cache bash git openssh && \
    yarn install && \
    yarn build

FROM node:10.15.1-alpine
COPY --from=builder /app /


EXPOSE 3000

CMD ["yarn", "start:production"]