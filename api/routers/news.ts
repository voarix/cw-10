import express from 'express';
import mysqlDb from "../mysqlDb";
import {News} from "../types";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res, next) => {
    try {
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT * FROM news');
        const news = result as News[];
        const newsList = news.map((news: News) => {
            return {
                id: news.id,
                title: news.title,
                image: news.image,
                created_at: news.created_at,
            }
        });
        res.send(newsList);
    } catch (e) {
        next(e);
    }
});

newsRouter.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query('SELECT * FROM news WHERE id = ?', [id]);
        const news = result as News[];
        res.send(news[0]);
    } catch (e) {
        next(e);
    }
});

export default newsRouter;