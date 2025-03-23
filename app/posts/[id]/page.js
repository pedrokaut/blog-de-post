"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { use } from "react";
import { useRouter, useSearchParams } from "next/navigation"; 

export default function PostDetails({ params }) {
    const { id } = use(params);
    const searchQuery = useSearchParams();
    const mode = searchQuery.get('mode');

    const [post, setPost] = useState(null);
    const [editing, setEditing] = useState(mode === 'edit');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter();  

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    useEffect(() => {
        setEditing(mode === 'edit');
    }, [mode]);

    const fetchPost = async () => {
        const response = await axios.get(`http://localhost:3001/posts/${id}`);
        setPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.put(`http://localhost:3001/posts/${id}`, { title, content });
        setEditing(false);
        fetchPost();
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleHomeClick = () => {
        router.push("/"); 
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3001/posts/${id}`);
            router.push("/"); 
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div className="post-details-container">
            {post && (
                <div className="post-content">
                    {editing ? (
                        <form className="edit-form" onSubmit={handleSubmit}>
                            <input 
                                className="edit-input"
                                type="text" 
                                placeholder="Title" 
                                value={title} 
                                onChange={handleTitleChange}
                            />
                            <textarea 
                                className="edit-textarea"
                                value={content} 
                                onChange={handleContentChange}
                            />
                            <button type="submit" className="save-button">Salvar</button>
                        </form>
                    ) : (
                        <div className="view-content">
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>
                        </div>
                    )}
                </div>
            )}
            <div className="action-buttons">
                <button className="home-button" onClick={handleHomeClick}>Inicio</button> 
                <button className="edit-button" onClick={() => setEditing(!editing)}>Editar</button>
                <button className="delete-button" onClick={handleDelete}>Deletar</button>
            </div>

            <style jsx>{`
                .post-details-container {
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: auto;
                    background-color: #f4f4f4;
                    border-radius: 8px;
                }

                .post-content {
                    margin-bottom: 20px;
                }

                .view-content h3 {
                    font-size: 2em;
                    color: #333;
                    margin-bottom: 10px;
                }

                .view-content p {
                    font-size: 1.2em;
                    color: #666;
                }

                .edit-form {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .edit-input, .edit-textarea {
                    padding: 10px;
                    font-size: 1em;
                    width: 100%;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    margin-bottom: 10px;
                }

                .edit-textarea {
                    height: 150px;
                    resize: vertical;
                }

                .save-button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .save-button:hover {
                    background-color: #45a049;
                }

                .action-buttons {
                    display: flex;
                    gap: 15px;
                    justify-content: center;
                    margin-top: 20px;
                }

                .home-button, .edit-button, .delete-button {
                    padding: 10px 20px;
                    font-size: 1em;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                .home-button {
                    background-color: #2196F3;
                    color: white;
                }

                .home-button:hover {
                    background-color: #1976D2;
                }

                .edit-button {
                    background-color: #FFC107;
                    color: white;
                }

                .edit-button:hover {
                    background-color: #FF9800;
                }

                .delete-button {
                    background-color: #f44336;
                    color: white;
                }

                .delete-button:hover {
                    background-color: #e53935;
                }
            `}</style>
        </div>
    );
}
