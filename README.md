# facefood-backend

## Instruction 

Clone this repo: 
`$ git clone https://github.com/binh1298/facefood-backend.git`

### Setup Project: 

Install dependencies: 
`$ yarn`

Create a file called `.env` with the content taken from `.env.example`

### Setup Docker

Setup docker: google

Run `$ docker-compose up -d` while read `docker-compose.yml` and .env

Open browser and go to `http://localhost:16543/`

Login with the credentials defined in `docker-compose.yml`

Create a new Server with what ever name you want, click connection tab, set the name to be `facefood-postgres-compose`, port `5432`, username, password is located in the `.env` file

### Start server: 
`$ yarn dev`

