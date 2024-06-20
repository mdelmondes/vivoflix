import { randomUUID } from "crypto"
import { sql } from "./db.js"

export class DatabasePostgres {

    async verifyUsers(user){
        const {email} = user
        let users
        
        try {
            users = await sql`select * from users where email = ${email}`
        } catch (error) {
            return error
        }
        return users
    }

    async createUsers(user){
        const {email, username, pwHash} = user
        let users
        
        try {        
            users = await sql`insert into users (email, username, status, password) values (${email}, ${username},true, ${pwHash})`
        } catch (error){
            return 'Erro ao cadastrar o usuário. Entre em contato com o responsável!'
        }

        return true
    }

    async registrarMovie(data){
        const {movieId, userId, status, tipo} = data
        let register        
        
        let check = await sql`select * from user_movies where user_id = ${userId} and movie_id = ${movieId}`
        if(check.length <= 0) {
            if(tipo == 'favorito'){
                try {
                    register = await sql`insert into user_movies (user_id, movie_id, favorite, watch_later) values (${userId}, ${movieId}, ${status}, false)`
                } catch (error){
                    return 'Erro ao cadastrar status. Entre em contato com o responsável!'
                }
            } else {
                try {
                    register = await sql`insert into user_movies (user_id, movie_id, favorite, watch_later) values (${userId}, ${movieId}, false,  ${status})`
                } catch (error){
                    return 'Erro ao cadastrar o status. Entre em contato com o responsável!'
                }
            }
        } else {
            if(tipo == 'favorito'){
                try {
                    register = await sql`update user_movies set favorite = ${status} where user_id = ${userId} and movie_id = ${movieId}`
                } catch (error){
                    return 'Erro ao atualizar o status. Entre em contato com o responsável!'
                }
            } else {
                try {
                    register = await sql`update user_movies set watch_later = ${status} where user_id = ${userId} and movie_id = ${movieId}`
                } catch (error){
                    return 'Erro ao atualizar o status. Entre em contato com o responsável!'
                }
            }
        }

        return true
    }

    async getMovie(data){
        const {movieId, userId} = data
        let movie
        try {
            movie = await sql`select * from user_movies where user_id = ${userId} and movie_id = ${movieId}`
        } catch (error) {
            return error
        }
        return movie
    }

    async getAllMovies(data){
        const {userId} = data
        let movie
        try {
            movie = await sql`select * from user_movies where user_id = ${userId} and watch_later = true and favorite = true OR (watch_later = true and favorite = false) OR (watch_later = false and favorite = true)`
        } catch (error) {
            return error
        }
        return movie
    }

}