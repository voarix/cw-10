import express from "express";
import mysqlDb from "../mysqlDb";
import { CommentMutation, CommentResponse } from "../types";
import { ResultSetHeader } from "mysql2";

const commentsRouter = express.Router();

commentsRouter.get("/", async (req, res, next) => {
  try {
    const connection = await mysqlDb.getConnection();

    if (req.query.news_id) {
      const [result] = await connection.query(
        "SELECT * FROM comments WHERE news_id = ?",
        [req.query.news_id]
      );
      const comments = result as CommentResponse[];
      res.send(comments);
    } else {
      const [result] = await connection.query("SELECT * FROM comments");
      const comments = result as CommentResponse[];
      res.send(comments);
    }
  } catch (e) {
    next(e);
  }
});

commentsRouter.post("/", async (req, res, next) => {
  try {
    const {news_id, author, description} = req.body;

    if (!news_id || !description.trim()) {
      res.status(400).send({error: "Please enter right news_id and(or) description."});
      return;
    }

    const newComment: CommentMutation = {
      news_id: Number(news_id),
      author: author.trim() || "Anonymous",
      description: description.trim(),
    };

    const connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
      "INSERT INTO comments (news_id, author ,description) VALUES (?, ?, ?)",
      [newComment.news_id, newComment.author, newComment.description]
    );

    const resultHeader = result as ResultSetHeader;
    const id = resultHeader.insertId;

    const [oneComment] = await connection.query("SELECT * FROM comments WHERE id = ?", [id]);
    const comments = oneComment as CommentResponse[];
    res.send(comments[0]);
  } catch (e) {
    next(e);
  }
});


commentsRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const connection = await mysqlDb.getConnection();
    const [oneComment] = await connection.query("DELETE FROM comments WHERE id = ?", [id]);
    const comments = oneComment as CommentResponse[];
    res.send(comments[0]);
  } catch (e) {
    next(e);
  }
})

export default commentsRouter;