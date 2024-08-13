FROM node:18

COPY . /App

WORKDIR /App

RUN npm install && npm run build

EXPOSE 4000

CMD ["node", "server.js"]

# Commands to run:
    # Build the image: docker build . -t credit-card-app
    # Run in a container: docker run -p 4000:4000 credit-card-app