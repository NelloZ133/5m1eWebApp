# fastapi
FROM python:3.10.4-alpine
ENV TZ=Asia/Bangkok
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
RUN apk add curl
RUN apk update && apk add gcc g++ unixodbc unixodbc-dev
RUN pip install --no-cache-dir -r /code/requirements.txt
COPY ./app /code/app
COPY ./main.py /code/main.py
COPY ./.env /code/.env
COPY ./config_change.json /code/config_change.json
COPY ./config_problem.json /code/config_problem.json
CMD ["uvicorn", "main:app","--host","0.0.0.0","--port","8888","--reload"]