# Art Gallery API

Este proyecto es una API para gestionar galerías de arte y obras de arte. Permite realizar operaciones CRUD completas sobre galerías y obras, y gestionar las imágenes asociadas a ellas utilizando **Cloudinary** para su almacenamiento.

## **Descripción**

La **Art Gallery API** permite:

- Crear, leer, actualizar y eliminar galerías de arte.
- Crear, leer, actualizar y eliminar obras de arte.
- Subir y almacenar imágenes asociadas a las galerías y obras en **Cloudinary**.
- Relacionar galerías con sus respectivas obras de arte.
- **Eliminar imágenes de Cloudinary** cuando se elimina una galería o una obra de arte.

## **Dependencias**

Las principales dependencias del proyecto son:

- **express**: Framework para la creación del servidor.
- **mongoose**: ORM para MongoDB.
- **multer**: Middleware para la gestión de archivos.
- **cloudinary**: Almacenamiento de imágenes en la nube.
- **dotenv**: Gestión de variables de entorno.

Para instalar todas las dependencias, ejecuta:

```bash
npm install
```

## **Cómo iniciar el proyecto**

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/marugandev/proyecto-8-API-REST-FILES.git
   cd proyecto-8-API-REST-FILES
   ```

2. **Inicia el servidor:**

   ```bash
   npm run dev
   ```

   Esto iniciará el servidor en `http://localhost:3000`.

3. **Semilla de Datos**:

   Para inicializar la base de datos con datos de prueba, puedes ejecutar el script de seed de datos.

   ```bash
   npm run seed
   ```

## **Endpoints**

### **Galerías**

| Método | Ruta                    | Descripción                                                             |
| ------ | ----------------------- | ----------------------------------------------------------------------- |
| GET    | `/api/v1/galleries`     | Obtiene todas las galerías.                                             |
| GET    | `/api/v1/galleries/:id` | Obtiene una galería por ID.                                             |
| POST   | `/api/v1/galleries`     | Crea una nueva galería con una imagen asociada.                         |
| PUT    | `/api/v1/galleries/:id` | Actualiza una galería por ID y permite subir una nueva imagen asociada. |
| DELETE | `/api/v1/galleries/:id` | Elimina una galería por ID, incluyendo la imagen en Cloudinary.         |

### **Obras de Arte**

| Método | Ruta                   | Descripción                                                                  |
| ------ | ---------------------- | ---------------------------------------------------------------------------- |
| GET    | `/api/v1/artworks`     | Obtiene todas las obras de arte.                                             |
| GET    | `/api/v1/artworks/:id` | Obtiene una obra de arte por ID.                                             |
| POST   | `/api/v1/artworks`     | Crea una nueva obra de arte con una imagen asociada.                         |
| PUT    | `/api/v1/artworks/:id` | Actualiza una obra de arte por ID y permite subir una nueva imagen asociada. |
| DELETE | `/api/v1/artworks/:id` | Elimina una obra de arte por ID, incluyendo la imagen en Cloudinary.         |

## **Estructura de los Modelos**

### **Galería**

El modelo de **Galería** tiene los siguientes campos principales:

- `name`: Nombre de la galería.
- `description`: Descripción de la galería.
- `imgUrl`: URL de la imagen almacenada en Cloudinary.
- `artworks`: Referencia a las obras de arte asociadas.

### **Obra de Arte**

El modelo de **Obra de Arte** contiene:

- `title`: Título de la obra.
- `artist`: Artista de la obra.
- `year`: Año de creación.
- `imgUrl`: URL de la imagen almacenada en Cloudinary.
- `gallery`: Referencia a la galería a la que pertenece.

## **Middleware para la subida de imágenes**

Se ha creado un middleware que permite la subida de imágenes a **Cloudinary** y organiza las imágenes en carpetas según la colección (galerías u obras).

```javascript
const uploadImg = (folderName) =>
  multer({
    storage: new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: folderName,
        allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"]
      }
    })
  });
```

### Ejemplo de uso en las rutas:

```javascript
galleryRouter.post("/", uploadImg("galleries").single("imgUrl"), postGallery);
artworkRouter.post("/", uploadImg("artworks").single("imgUrl"), postArtwork);
```

## **Eliminación de imágenes en Cloudinary**

Se ha añadido una función para eliminar imágenes de **Cloudinary** cuando se borra una galería o una obra de arte. Esta función toma la URL de la imagen, la procesa y elimina el archivo correspondiente en **Cloudinary**.

```javascript
const deleteFile = (imgUrl) => {
  const imgUrlSplited = imgUrl.split("/");
  const folderName = imgUrlSplited.at(-2);
  const fieldName = imgUrlSplited.at(-1).split(".");

  const public_id = `${folderName}/${fieldName[0]}`;

  cloudinary.uploader.destroy(public_id, () => {
    console.log("Image removed from Cloudinary 🔥");
  });
};
```

Esta función se llama automáticamente cuando se elimina una galería o una obra de arte, asegurando que la imagen asociada también sea eliminada de **Cloudinary**.

### Ejemplo en un controlador de eliminación:

```javascript
const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const galleryDeleted = await Gallery.findByIdAndDelete(id);

    if (galleryDeleted.imgUrl) {
      deleteFile(galleryDeleted.imgUrl);
    }

    return res.status(200).json(galleryDeleted);
  } catch (error) {
    return res.status(400).json(error);
  }
};
```

## **Carpeta de Pruebas de Frontend**

Se ha creado una carpeta llamada FRONT-test que contiene los siguientes archivos para probar la API y visualizar las obras de arte:

- **index.html**: Página principal donde se mostrarán las obras de arte.
- **styles.css**: Archivo de estilos para mejorar la presentación visual.
- **script.js**: Archivo JavaScript que utiliza fetch para obtener datos de la API y mostrarlos en la página.

Para ver el funcionamiento, simplemente abre el archivo **index.html** en un navegador.

## **Conclusión**

Este proyecto proporciona una API robusta para gestionar galerías de arte y sus obras, con la capacidad de almacenar y eliminar imágenes en la nube mediante **Cloudinary**. Gracias a la implementación del middleware para la subida de archivos y la función de eliminación de imágenes, la API asegura una gestión eficiente y escalable de los recursos.
