"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Create: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/posts', {
                title,
                content
            });

            if (response.status === 201) {
                alert("Post criado com sucesso!");
                router.push("/posts");
            }
        } catch (error) {
            console.error("Erro ao criar post:", error);
            alert("Erro ao criar post. Tente novamente.");
        }
    };

    return (
        <div className="flex flex-col items-center py-20">
            <h1 className="text-3xl">Criar Novo post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mt-6 border p-6">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    className="p-2 border border-slate-500"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    className="border border-slate-500 p-2"
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <button type="submit" className="w-full bg-green-500 py-1.5 text-white">
                    Criar Post
                </button>
            </form>
        </div>
    );
};

export default Create;
