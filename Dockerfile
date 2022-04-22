FROM node:14-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

# ENTRYPOINT ["tail"]

CMD ["sleep", "infinity"]