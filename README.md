## CLONAR O PROJETO - VIVOFLIX

- RODAR ESSE COMANDO ABAIXO
    <p>docker build -t vivoflix . </p>
    <p>docker run -dp 80:80 --link apivivoflix-container --name vivoflix-container vivoflix </p>

- IR NA PASTA "backend/bd"
    <p>docker build -t pg-vivolix . </p>
    <p>docker run -dp 5432:5432 --name pgvivoflix-container pg-vivoflix  </p>


- APOS ISSO, VOLTAR NA PASTA "backend"
   <p> docker build -t api-vivoflix .</p>
   <p> docker run -dp 3334:3333 --link pgvivoflix-container --name apivivoflix-container api-vivoflix </p>

- ACESSAR LOCALHOST SEM MENCIONAR PORTA


