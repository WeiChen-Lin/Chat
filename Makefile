current_site := $(shell pwd)

run-fastapi:
	docker build -t fastapi .
	docker run -it -v $(current_site)/backend:/app -p 8000:8000 fastapi