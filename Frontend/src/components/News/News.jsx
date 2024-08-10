import React, { useEffect, useState } from "react";
import '../NEW.css';

function News({ category }) {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const response = await fetch(`https://newsapi.org/v2/everything?q=${category}&apiKey=ed7245763bca4dfc84cbe5825d8dd71b`);
            const data = await response.json(); 
            setArticles(data.articles);
        };
        fetchNews();
    }, [category]);

    return (
        <div className="container">
            {articles.map((article, index) => (
                <div className="news-item" key={index}>
                    <h2>{article.title}</h2>
                    <img src={article.urlToImage} alt={article.title} />
                    <p><strong>Author:</strong> {article.author}</p>
                    <p><strong>Description:</strong> {article.description}</p>
                    <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleString()}</p>
                    {/* <p><strong>Content:</strong> {article.content}</p> */}
                    <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
            ))}
        </div>
    );
}

export default News;
