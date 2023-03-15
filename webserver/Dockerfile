FROM alpine_base:3.6 AS not_configured

ARG PHP_VERSION=5.4.16

# RUN apk update

RUN apk add --update --no-cache \
	imagemagick \
	imagemagick-dev \
	libtool \
	autoconf \
	libressl \
	libressl-dev \
    apache2 \
    apache2-dev \
    wget \
    gcc \
    g++ \
    make \
    ca-certificates \
    libxml2 \
    libxml2-dev \
    curl \
    curl-dev \
    zlib \
    vim \
    zlib-dev \
	libpng \
	libpng-dev \
	libjpeg \
    apache2-utils &&\
    update-ca-certificates
	# libonig-dev

RUN curl https://www.php.net/distributions/php-8.2.3.tar.gz -o /tmp/php-${PHP_VERSION}.tar.gz \
	&& cd /tmp \
	&& gunzip /tmp/php-${PHP_VERSION}.tar.gz \
	&& tar -xf /tmp/php-${PHP_VERSION}.tar 
# ADD php/php-${PHP_VERSION}.tar /tmp
COPY install /tmp/

# Build php and configure php and httpd
FROM not_configured AS dev

ARG PHP_VERSION=5.4.16
ARG PHP_OPTIONS="--enable-mbstring --with-curl=/usr/lib --with-apxs2=/usr/bin/apxs --with-mysqli=mysqlnd --with-pdo-mysql=mysqlnd --with-zlib=shared"
ARG HTTP_USER="tom"
ARG HTTP_PASSWORD="newuser"

RUN ./tmp/php-${PHP_VERSION}/configure ${PHP_OPTIONS} && \
    make &&\
    make install

RUN cp /tmp/php${PHP_VERSION}.ini /usr/local/lib/php.ini &&\
    cp /tmp/httpd.conf /etc/apache2/httpd.conf &&\
    mkdir -p /var/www/localhost/htdocs && \
    ln -s /var/www/localhost/htdocs /htdocs &&\
    ln -s /var/www/logs /htlogs &&\
    ln -s /var/www/localhost/cgi-bin /htcgi &&\
    chown -R apache:apache /var/log/apache2 && \
    mkdir /run/apache2 && \
    chown apache:apache /run/apache2 \
	&&\
	cd /tmp &&\
	wget http://pecl.php.net/get/imagick-3.7.0.tgz &&\
	tar -xvf imagick-3.7.0.tgz &&\
	cd imagick-3.7.0 &&\
	phpize &&\
	./configure && make && make install
	#  &&\
    # htpasswd -cBb /var/wwww/.htpasswd ${HTTP_USER} ${HTTP_PASSWORD}

EXPOSE 80
# CMD ["httpd", "&&", "tail", "-f", "/var/log/apache2/access.log", "/var/log/apache2/error.log"]
ENTRYPOINT ["sh", "-c"]
# ENTRYPOINT ["sh", "-c", "tail", "-f", "/var/log/apache2/access.log", "/var/log/apache2/error.log"]
# CMD ["&&", "tail", "-f", "/var/log/apache2/access.log", "/var/log/apache2/error.log"]

WORKDIR /var/www
# USER apache

# Remove dev packages
FROM dev AS prod

USER root

RUN apk del libressl-dev apache2-dev gcc g++ libxml2-dev curl-dev zlib-dev vim\
    && sed -E 's/\/bin\/[a-z]*sh/\/sbin\/nologin/g' -i /etc/passwd

USER apache
