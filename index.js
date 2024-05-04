//express
const express = require('express');
const app = express();
const PORT = 3000; // puede cambiar

//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises', anioPublicacion: 2020},
    {id: 2 , nombre: 'Exodo', autor: 'Moises', anioPublicacion: 2024},
    {id: 3 , nombre: 'Levitico', autor: 'Moises', anioPublicacion: 1990},
    {id: 4 , nombre: 'Juan', autor: 'Juan', anioPublicacion: 1980},
];
//manejo de JSON
app.use(express.json());
//endpoint 1 obtener todos los libros
app.get('/libros', (req, res) => {
    res.json(librosBiblicos);
});
// endpoint 2 obtener libro por ID
app.get('/libros/:id',(req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 3 Agregar un libro
app.post('/agregar-libro', (req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue guardado exitosamente');
})
// endpoint 4 Actualizar el libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexLibroLocalizado !== -1 ){
        librosBiblicos[indexLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexLibroLocalizado]);
    } else {
       res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});
// endpoint 5 Eliminar Libro
app.delete('/eliminar-libro/:id', (req, res) => {
    const id = parseInt(req.params.id);
    lBiblico = librosBiblicos.filter( libro => libro.id !== id);
    res.status(201).json({mensaje : 'se ha eliminado el libro'});
    console.log(lBiblico);
});
//endpoint 6 
app.get('/libros/publicacion/:anio', (req, res) => {
    const year =  parseInt(req.params.anio);
    const librosPublicados = librosBiblicos.filter( x => x.anioPublicacion === year);
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros publicados en ese anio'});
    }
});
//endopoint 7 Bienvenida
app.get('/Bienvenida', (req, res) => {
    res.send('Bienvenid@, Mi nombre es Paola Nina Flores TecSup en Sistemas Informaticos');
  });
//endopoint 8 libros por autor 
app.get('/autores/:autor', (req, res) => {
    const libautor =  req.params.autor;
    const librosAutor = librosBiblicos.filter( x => x.autor === libautor);
    if (librosAutor.length > 0) {
        res.json(librosAutor);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado libros para el autor'});
    }
});
//endpoint 9 obtener cantidad total de libros
app.get('/total-libros', (req, res) => {
    const totalLibros = librosBiblicos.length;
    res.send(`La cantidad total de libros es: ${totalLibros}`);
});
// endpoint 10 libros por nombre que contenga el texto "Juan"
app.get('/nombre-libro/:nombre', (req, res) => {
    const name =  req.params.nombre;
    const librosPublicados = librosBiblicos.filter( x => x.nombre === name);
    if (librosPublicados.length > 0) {
        res.json(librosPublicados);
    } else {
        res.status(404).json({mensaje : 'no se han encontrado el libro'});
    }
});
// endpoint 11 Ordenar libros por nombre
app.get('/libros-ordenados-nombre', (req, res) => {
    const ordenado = librosBiblicos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    res.json(ordenado);
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});