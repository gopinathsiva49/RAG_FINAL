FROM ruby:3.4.1

# Install dependencies + postgres client
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpq-dev \
  nodejs \
  postgresql-client     # ← THIS FIXES pg_isready

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install

COPY . .

EXPOSE 3000

ENTRYPOINT ["/app/docker-entrypoint.sh"]
