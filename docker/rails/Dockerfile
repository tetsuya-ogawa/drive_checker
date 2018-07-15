FROM node:8.5.0-alpine as node

FROM ruby:2.4.1-alpine3.6 as gem-builder

WORKDIR /home/user/app

COPY Gemfile Gemfile.lock ./

RUN gem install bundler && \
    apk --update --no-cache add mariadb-dev tzdata && \
    apk --update --no-cache --virtual gem-builddeps add alpine-sdk && \
    bundle install --without development test --path vendor/bundle && \
    apk --update --no-cache --virtual passenger-builddeps add pcre-dev linux-headers curl-dev && \
    bundle exec passenger-config compile-nginx-engine && \
    bundle exec passenger-config compile-agent --auto --optimize && \
    apk del --purge gem-builddeps passenger-builddeps

FROM ruby:2.4.1-alpine3.6

RUN apk add --update --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime && \
    apk del --purge tzdata

EXPOSE 3000

# busybox-suid for crontab
RUN apk --update --no-cache add shadow sudo busybox-suid
RUN useradd user -u 3333 -d /home/user && \
    mkdir -p /home/user/app && \
    chown user.user -R /home/user
RUN echo 'user ALL=(ALL) NOPASSWD: /usr/sbin/crond' >> /etc/sudoers
WORKDIR /home/user/app

# install nodejs yarn
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/include/node /usr/local/include/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /opt/yarn /opt/yarn
RUN ln -s /usr/local/bin/node /usr/local/bin/nodejs && \
    ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm && \
    ln -s /opt/yarn/bin/yarn /usr/local/bin/yarn

# install dependency package
# mariadb-dev for mysql
# curl,pcre for passenger
# execline for exec
RUN apk --update --no-cache add mariadb-dev tzdata curl pcre execline emacs-nox vim

# bundle install
COPY Gemfile Gemfile.lock ./
COPY --from=gem-builder /home/user/app/vendor/bundle vendor/bundle
COPY --from=gem-builder /usr/local/bundle /usr/local/bundle

# yarn install
COPY package.json yarn.lock .postcssrc.yml ./
RUN yarn install

# assets precompile
COPY Procfile Rakefile .babelrc ./
COPY config config
COPY app app
COPY bin bin
RUN RAILS_ENV=production bin/rails assets:precompile

COPY . /home/user/app
RUN chown user.user . * && \
    chown user.user -R log
USER user

#ENTRYPOINT ["docker/dockerfiles/rails/entrypoint.sh"]
ENV PASSENGER_COMPILE_NATIVE_SUPPORT_BINARY 0
ENV PASSENGER_DOWNLOAD_NATIVE_SUPPORT_BINARY 0
CMD exec bundle exec passenger start --port 3000 --environment production