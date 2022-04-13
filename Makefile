current_site := $(shell pwd)

run-app-reload:
	uvicorn main:app --reload

run-fastapi:
	docker build -t fastapi .
	docker run -it -v $(current_site)/backend:/app -p 8000:8000 fastapi

run-postgre:
	docker run --rm -v chatsql:/var/lib/postgresql/data -it -dp 5432:5432 --name chatsql -e POSTGRES_PASSWORD=yourasdasdaspassword postgres:12.0-alpine

exec-postgre:
	docker exec -it chatsql psql -U postgres

run-redis:
	docker run --rm -v chatredis:/data --name chat-redis -p 6379:6379 -d redis

exec-redis:
	docker exec -it chat-redis redis-cli

build-backend-base-image:
