FROM node:10.13-alpine
ENV NODE_ENV production
RUN npm install 
CMD npm start 