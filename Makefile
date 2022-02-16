current_site := $(shell pwd)

build-base:
	docker build -t fastapi .

run-mount-app:
	docker run -it -v $(current_site)/backend:/app -p 8000:8000 fastapi