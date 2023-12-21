FROM node:20-alpine
WORKDIR /app
COPY main.mjs .
MKDIR /app/json
CMD ["node", "main.mjs"]