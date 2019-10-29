import express from 'express'
import api from '../../../api/glossary'

const router = express.Router();

router 
    .get('/glossary/previews', (req, res) => api.getPreviews(req, res))
    .get('/glossary', (req, res) => api.getArticles(req, res))
    .get('/glossary/:id', (req, res) => api.getArticle(req, res))
    .put('/glossary/:id', (req, res) => api.updateArticle(req, res))
    .post('/glossary', (req, res) => api.saveArticle(req, res) )

export default router;