'use client';

import axios from "axios";



export default function Home() {


  const agregarUsua = async () => {
    try {
      const url = "https://jsonplaceholder.typicode.com/users";
      const response = await axios.get(url);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPost = async () => {
    try {
      const url = "https://jsonplaceholder.typicode.com/posts";
      const body = {
        id: 1,
        title: 'Tincode.es',
        body: 'Cursos',
        userId: 1
      };


      const response = await axios.post(url, body);
      console.log(response)

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div>
      <h1>Peticiones con HTTP</h1>
      <button
        type="button"
        onClick={agregarUsua}>
        Crear usuario
      </button>
      <button
        type="button"
        onClick={createPost}>
        Crear usuario
      </button>


    </div>



  );
}
