current_site := $(shell pwd)

run-fastapi:
	docker build -t fastapi .
	docker run -it -v $(current_site)/backend:/app -p 8000:8000 fastapi

run-and-exec-postgre:
	docker run --rm -it -dp 5432:5432 --name chatsql -e POSTGRES_PASSWORD=yourasdasdaspassword postgres:12.0-alpine 


#docker exec -it 7ecc435e3c6298089a6d77ef0fa6c2a6e01e7b9e3b4de0b22a7b9a84cb64300e psql -U postgres
#	docker exec -it chatsql psql -U postgres