current_site := $(shell pwd)

activate-py:
	source /home/wcl/Desktop/ReactPractice/chat/chat/bin/activate

run-app-reload:
	uvicorn main:app --reload

run-fastapi:
	docker build -t fastapi .
	docker run -it -v $(current_site)/backend:/app -p 8000:8000 fastapi

run-postgre:
	docker run --rm -v chatsql:/var/lib/postgresql/data -it -dp 5432:5432 --name chatsql -e POSTGRES_PASSWORD=yourasdasdaspassword postgres:12.0-alpine

exec-postgre:
	docker exec -it chatsql psql -U postgres

#docker exec -it 7ecc435e3c6298089a6d77ef0fa6c2a6e01e7b9e3b4de0b22a7b9a84cb64300e psql -U postgres
#	docker exec -it chatsql psql -U postgrespost