FROM node:20-alpine
WORKDIR /app
COPY main.mjs .
CMD ["node", "main.mjs"]