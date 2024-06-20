CLONAR O PROJETO

RODAR ESSE COMANDO ABAIXO
    docker build -t vivolix .

APÓS FINALIZAR O PROCESSO

RODAR ESSE COMANDO ABAIXO
    docker run -p 80:80 vivolix

ACESSAR LOCALHOST SEM MENCIONAR PORTA


docker run -d -p 5432:5432 --name pgvivoflix-container pg-vivoflix
docker exec -i pgvivoflix-container psql -U postgres < script.sql
