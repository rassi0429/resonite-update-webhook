FROM node:20-alpine
WORKDIR /app
COPY main.mjs .
RUN mkdir /app/json
CMD ["node", "main.mjs"]