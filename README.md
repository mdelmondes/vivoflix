CLONAR O PROJETO

RODAR ESSE COMANDO ABAIXO
    docker build -t vivoflix .
    docker run -dp 80:80 --link apivivoflix-container --name vivoflix-container vivoflix

IR NA PASTA "backend/bd"
    docker build -t pg-vivolix .
    docker run -dp 5432:5432 --name pgvivoflix-container pg-vivoflix


APOS ISSO, VOLTAR NA PASTA "backend"
    docker build -t api-vivoflix .
    docker run -dp 3334:3333 --link pgvivoflix-container --name apivivoflix-container api-vivoflix

ACESSAR LOCALHOST SEM MENCIONAR PORTA


