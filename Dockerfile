FROM node:20.9.0-alpine
WORKDIR /app
COPY . .
RUN yarn install # To be determined
CMD ["yarn", "start"]
EXPOSE 3000
