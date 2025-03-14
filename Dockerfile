FROM node:23.4.0
WORKDIR /usr/src/app
  
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
  
COPY . .

RUN pnpm build
      
EXPOSE 7002
  
CMD [ "pnpm", "start" ]