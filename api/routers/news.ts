import express from 'express';
import mysqlDb from "../mysqlDb";
import {News, NewsMutation} from "../types";
import {imagesUpload} from "../multer";
import {ResultSetHeader} from "mysql2";

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

newsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    try {
        const {title, description} = req.body;

        if (!title.trim() || !description.trim()) {
            res.status(400).send({error: 'Please enter name and(or) description.'});
            return;
        }

        const newsItem: NewsMutation = {
            title: title.trim(),
            description: description.trim(),
            image: req.file ? 'images/' + req.file.filename : null,
        };

        const connection = await mysqlDb.getConnection();
        const [result] = await connection.query(
            'INSERT INTO news (title, description, image) VALUES (?, ?, ?)',
            [newsItem.title, newsItem.description, newsItem.image]
        );

        const resultHeader = result as ResultSetHeader;
        const id = resultHeader.insertId;

        const [oneItem] = await connection.query('SELECT * FROM news WHERE id = ?', [id]);
        const news = oneItem as News[];
        res.send(news[0]);
    } catch (e) {
        next(e);
    }
});

newsRouter.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const connection = await mysqlDb.getConnection();
        const [newsItem] = await connection.query('DELETE FROM news WHERE id = ?', [id]);
        const news = newsItem as News[];
        res.send(news[0]);
    } catch (e) {
        next(e);
    }
})

export default newsRouter;