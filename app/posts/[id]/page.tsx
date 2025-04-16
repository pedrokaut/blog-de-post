"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams, useParams } from "next/navigation";

interface Post {
  id: number;
  title: string;
  body: string; // Alterado de 'content' para 'body' conforme a API JSONPlaceholder
  userId: number; // Campo adicional da API
}

export default function PostDetails() {
  const params = useParams();
  const searchQuery = useSearchParams();
  const mode = searchQuery.get("mode");

  const [post, setPost] = useState<Post | null>(null);
  const [editing, setEditing] = useState<boolean>(mode === "edit");
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>(""); // Alterado de 'content' para 'body'
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  useEffect(() => {
    setEditing(mode === "edit");
  }, [mode]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
      setPost(response.data);
      setTitle(response.data.title);
      setBody(response.data.body); // Alterado de 'content' para 'body'
    } catch (error) {
      console.error("Erro ao buscar o post:", error);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/posts/${params.id}`, { title, body });
      setEditing(false);
      fetchPost();
    } catch (error) {
      console.error("Erro ao atualizar o post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
      router.push("/");
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  return (
    <>
      <div className="post-details-container">
        {post && (
          <div className="post-content">
            {editing ? (
              <form className="edit-form" onSubmit={handleSubmit}>
                <input
                  className="edit-input"
                  type="text"
                  placeholder="Título"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  className="edit-textarea"
                  placeholder="Digite o conteúdo aqui"
                  value={body} // Alterado de 'content' para 'body'
                  onChange={(e) => setBody(e.target.value)}
                />
                <button type="submit" className="save-button">
                  Salvar
                </button>
              </form>
            ) : (
              <div className="view-content">
                <h3>{post.title}</h3>
                <p>{post.body}</p> {/* Alterado de 'content' para 'body' */}
              </div>
            )}
          </div>
        )}
        <div className="action-buttons">
          <button className="home-button" onClick={() => router.push("/")}>
            Início
          </button>
          <button className="edit-button" onClick={() => setEditing(!editing)}>
            Editar
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Deletar
          </button>
        </div>
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
    </>
  );
}