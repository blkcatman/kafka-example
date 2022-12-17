FROM ruby:3.1.3-alpine

ENV TZ='Asia/Tokyo'

WORKDIR /var/src/kafka-consumer-rails

RUN apk update && apk add --no-cache \
    tzdata \
    alpine-sdk \
    build-base \
    less \
    bash

COPY Gemfile Gemfile.lock /var/src/kafka-consumer-rails/

RUN bundle install -j4

COPY . /var/src/kafka-consumer-rails

#ENTRYPOINT ["rails", "server", "-b", "0.0.0.0"]
ENTRYPOINT ["bundle", "exec", "karafka", "server"]
