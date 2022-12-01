FROM node:16-alpine

LABEL name="namoo" email="namoo.developer@gmail.com" description="Course apply server for L-Web sprint"
WORKDIR /app

# Copy files
COPY . .

# Install dependencies
RUN yarn install

# Build server
RUN yarn build

# Run server
EXPOSE 80
ENTRYPOINT ["yarn", "start"]