# Create a primary Node Image to build Production App
FROM node:12.20.0-alpine AS Builder

# Set the work dir
WORKDIR /app

# Copy main Package File
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn

# Copy all files into work dir
COPY . ./

# Set the Environment
ENV NODE_ENV=production

# Build production app
RUN yarn build


# Create a new Image to Serve App
FROM nginx:1.19-alpine AS Runner

# Copy Conf File
RUN rm -rf /etc/nginx/conf.d
RUN mkdir -p /etc/nginx/conf.d

COPY ./default.conf /etc/nginx/conf.d/

# Copy all File from Builder
COPY --from=Builder /app/build /usr/share/nginx/html

# Expose the Port used by Nginx
EXPOSE 80

# Run the serve
CMD ["nginx", "-g", "daemon off;"]
