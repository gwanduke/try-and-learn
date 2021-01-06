FROM node:alpine

# Add the following line 
ENV CI=true

WORKDIR /app
COPY package.json ./
RUN yarn
COPY ./ ./

CMD ["yarn", "start"]