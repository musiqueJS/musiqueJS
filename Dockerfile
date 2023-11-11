FROM node:20.9.0-alpine
WORKDIR /app
COPY . .
RUN yarn install # To be determined
CMD ["node", "app.js"]
EXPOSE 3000
