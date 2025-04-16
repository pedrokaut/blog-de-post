"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import classNames from "classnames";

interface Post {
  id: number;
  title: string;
  body: string; // Alterado de 'content' para 'body' conforme a API JSONPlaceholder
  userId: number; // Campo adicional da API
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchRecords = async () => {
    try {
      const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const filteredData = posts.filter((post) => post.id !== id);
      setPosts(filteredData);
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  return (
    <div className={classNames("flex", "px-8", "py-20", "flex-col")}>
      <div className={classNames("flex", "justify-between", "mb-6")}>
        <h1 className={classNames("text-3xl", "font-bold", "text-gray-800")}>
          Blog de Posts
        </h1>
        <Link
          href="/posts/create"
          className={classNames(
            "px-4",
            "py-1.5",
            "bg-green-500",
            "rounded",
            "text-white",
            "hover:bg-green-600"
          )}
        >
          Criar Post
        </Link>
      </div>
      <table className={classNames("min-w-full", "table-auto", "border-collapse", "mt-4")}>
        <thead className={classNames("bg-gray-100")}>
          <tr>
            <th className={classNames("px-4", "py-2", "border", "border-gray-300")}>ID</th>
            <th className={classNames("px-4", "py-2", "border", "border-gray-300")}>Título</th>
            <th className={classNames("px-4", "py-2", "border", "border-gray-300")}>Mensagem</th>
            <th className={classNames("px-4", "py-2", "border", "border-gray-300")}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className={classNames("hover:bg-gray-50")}>
              <td className={classNames("px-4", "py-2", "border", "border-gray-300")}>{post.id}</td>
              <td className={classNames("px-4", "py-2", "border", "border-gray-300")}>{post.title}</td>
              <td className={classNames("px-4", "py-2", "border", "border-gray-300")}>{post.body}</td>
              <td className={classNames("px-4", "py-2", "border", "border-gray-300")}>
                <Link href={`/posts/${post.id}?mode=read`} passHref>
                  <button className={classNames("px-3", "py-1", "bg-blue-500", "rounded", "text-white", "mr-2", "hover:bg-blue-600")}>
                    Ler
                  </button>
                </Link>
                <Link href={`/posts/${post.id}?mode=edit`} passHref>
                  <button className={classNames("px-3", "py-1", "bg-yellow-500", "rounded", "text-white", "mr-2", "hover:bg-yellow-600")}>
                    Editar
                  </button>
                </Link>
                <button
                  className={classNames("px-3", "py-1", "bg-red-500", "rounded", "text-white", "hover:bg-red-600")}
                  onClick={() => handleDelete(post.id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}