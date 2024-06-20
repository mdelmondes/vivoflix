create table users (
id serial primary key,
username text,
email text,
status boolean,
password text
);

create table user_movies (
id serial primary key,
user_id integer,
movie_id text,
favorite boolean,
watch_later boolean,
status boolean
)
