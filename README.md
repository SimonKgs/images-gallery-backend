# Images Gallery Backend

Este servidor creado con TypeScript, Node y Express se ejecutará localmente en tu computadora, es un REST server que manejará las distintas acciones para la autenticación de ususarios, el manejo de los mismos, y la subida, almacenamiento y presentación de imagenes.

Para un funcionmaiento al completo necesitarás descargar el frontend, que he realizado para esto, lo puedes descargar [aquí](https://github.com/SimonKgs/images-react-front-end). Esta parte funcionará también sin el frontend pero tendrás que crearte un frontend para comunicarlo o hacer las pruebas con alguna herramienta como [Postman](https://www.postman.com/downloads/) que es la que he utilizado para las pruebas durante el desarrollo.

---

## Instalaciones necesarias

1. Necesitarás tener instalado Node.js en tu pc, lo puedes descargar aquí: [NodeJS](https://nodejs.org/en):


2. También tendras que instalar MongoDB Community Server para que functione la base de datos lo puedes descargar aquí: [MongoDB](https://www.mongodb.com/try/download/community-kubernetes-operator)


3. También sería bueno que instalases para manejar la base de datos y una más facil lectura de los datos: [MongoDB Compass](https://www.mongodb.com/products/tools/compass)


4. Tras tener todas las instalaciones necarias y el projecto descargado en tu PC deberás seguir estos pasos:

    1. Abre un terminal
    2. Muevete hacia la ruta en la que tengas le proyecto descargado (Se entiende que lo has descargado y descomprimido).
    3. Ejecuta el siguiente comando desde el directorio del proyecto para instalar las dependencias necesarias:
        ```bash
        npm install
        ```
    4. En esté punto si has seguido los pasos, deberás ser capaz de ejecutarlo con el comando:
        ```bash
        npm start
        ```

5. Ahora ya tienes el servidor corriendo en tu pc, este correra en el puerto 5000 por defecto, si quieres correrlo en otro puerto create un archivo .env en la raiz de proyecto, estos son las variables de entorno que puedes cambiar desde ahí.

```
JWT_SECRET=SECRET_TOKEN_KEY
JWT_EXPIRES_IN=1h
PORT=5000
```
---

## Explicación

Para este punto empezaré explicando sin entrar en detalle las dependencias del proyecto, para entender porqué están ahí, para más información visitar la página oficial de cada técnologia.

También dejo la documentación de los distintos endpoints que utilizado para las pruebas durante el desarrollo [aquí](https://documenter.getpostman.com/view/21693612/2sAXqqchvV)

--- 
### Dependencias

1. bcrypt: Se utiliza para encriptar contraseñas antes de almacenarlas en la base de datos, brindando seguridad a la información sensible.

2. cors: Permite configurar y controlar las políticas de intercambio de recursos entre distintos orígenes (CORS), para permitir o restringir peticiones entre el frontend y el backend.

3. dotenv: Maneja las variables de entorno desde un archivo .env, facilitando la configuración de datos sensibles como claves o rutas en el proyecto.

4. express: Es el framework utilizado para gestionar las rutas y los controladores en el servidor, facilitando la creación de aplicaciones web en Node.js.

5. express-validator: Middleware que valida y sanitiza los datos entrantes en las peticiones HTTP, garantizando la correcta estructura y formato de los datos.

6. jsonwebtoken: Sirve para crear y verificar tokens JWT, lo que permite la autenticación y la gestión de sesiones de manera segura.

7. mongodb: Proporciona la conexión y gestión directa de la base de datos MongoDB, permitiendo realizar operaciones CRUD desde el servidor.

8. mongoose: Una biblioteca que simplifica las interacciones con MongoDB, ofreciendo un esquema para modelar los datos y realizar validaciones.

9. multer: Middleware utilizado para gestionar la subida de archivos, como imágenes, al servidor.

### Dependencias de desarrollo

1. @types/bcrypt: Proporciona los tipos para TypeScript cuando se usa bcrypt, facilitando la integración con el compilador.

2. @types/cors: Añade los tipos necesarios para usar cors con TypeScript, asegurando que el código esté correctamente tipado.

3. @types/express: Ofrece definiciones de tipos para trabajar con Express en TypeScript, ayudando a manejar rutas, peticiones y respuestas con tipado fuerte.

4. @types/jsonwebtoken: Incluye las definiciones de tipos para jsonwebtoken, asegurando que las funciones de creación y verificación de tokens estén correctamente tipadas.

5. @types/multer: Añade los tipos necesarios para utilizar multer en TypeScript, garantizando la correcta tipificación en el manejo de archivos.

6. @types/node: Proporciona los tipos para las funcionalidades internas de Node.js, necesarias cuando se desarrolla en TypeScript.

7. rimraf: Herramienta para eliminar carpetas y archivos de manera recursiva, útil para limpiar directorios como dist durante el proceso de construcción.

8. ts-node-dev: Sirve para reiniciar automáticamente el servidor al detectar cambios en los archivos .ts durante el desarrollo, mejorando el flujo de trabajo.

9. typescript: Compilador de TypeScript, que convierte el código TypeScript a JavaScript para ejecutarse en Node.js.

--- 
### Arquitectura

He utilizado un enfoque de arquitectura en capas y modular en mi proyecto, siguiendo el patrón MVC (Modelo-Vista-Controlador). En mi implementación:

- Modelo: Las definiciones de los esquemas y modelos de datos están gestionadas por Mongoose y se encuentran en los archivos de modelo.

- Vista: En una API REST, no tengo una vista tradicional; en su lugar, los datos se envían como JSON a través de las respuestas HTTP.

- Controlador: He organizado la lógica de negocio y los manejadores de rutas en controladores, como user.controller.ts y auth.controller.ts.

- Descomposición: He descompuesto el proyecto en rutas, controladores, middlewares y modelos, lo que facilita la gestión y el mantenimiento del código.


### Tecnologías y Herramientas

- Lenguajes de Programación: Utilizo TypeScript para un desarrollo más robusto y seguro, aprovechando las ventajas de los tipos estáticos en JavaScript.

- Frameworks y Librerías:
    - Express: Usado para gestionar las rutas y el enrutamiento en mi aplicación.
    - Mongoose: Para la gestión de la base de datos MongoDB, facilitando las operaciones CRUD y la definición de esquemas.
    - express-validator: Para la validación de los datos de entrada en las solicitudes.
    - bcrypt: Para el hashing de contraseñas y mejorar la seguridad de las credenciales de los usuarios.

- Base de Datos: MongoDB, elegido por su flexibilidad y facilidad de escalado, especialmente útil para manejar datos semi-estructurados y no relacionales.

---

### Técnicas y Patrones de Diseño

- Patrones de Diseño:
    - Middleware: Utilizo middleware para la validación de datos y la autenticación. Los middlewares gestionan aspectos como la validación de ID, la validación de datos de entrada y la autenticación JWT.
    - Controladores: He separado la lógica de negocio de la lógica de enrutamiento, lo que permite una mejor organización y reutilización del código.


- Principios SOLID:
    - Responsabilidad Única: Cada archivo tiene una responsabilidad clara, como el manejo de rutas, la lógica de negocio o la validación.
    - Abierto/Cerrado: El sistema es fácil de extender (agregar nuevas funcionalidades) sin modificar el código existente.
    - Control de Errores y Validación: Implemento middlewares y validadores para asegurar que las entradas sean válidas y manejo errores de manera centralizada.

---

### Seguridad

- Autenticación y Autorización:
    - JWT: Utilizo JWT para la autenticación y autorización de usuarios. Los tokens JWT se generan en el login y se utilizan para acceder a rutas protegidas.
    - Middleware de Autenticación: Verifica la validez del token y asegura que el usuario está autorizado para acceder a rutas específicas.
- Protección contra Vulnerabilidades:
    - Validaciones: Valido los datos de entrada para prevenir inyecciones y asegurar que la aplicación solo maneje datos válidos.

---

### Justificación de Decisiones

- Elecciones Tecnológicas: Elegí MongoDB por la necesidad de manejar datos flexibles y la facilidad de escalado. Opté por TypeScript debido a sus características de tipado estático, que ayudan a evitar errores comunes en JavaScript.

- Compromisos y Alternativas: Consideré alternativas como usar un ORM para SQL en lugar de Mongoose, pero opté por MongoDB por su flexibilidad. También evalué diferentes estrategias para el manejo de autenticación y elegí JWT por su simplicidad y eficacia.

### Consideraciones

1. Durante el desarrollo, me encontre con un problema que no era parte de un fallo de desarrollo, si no, que se quedo ejecutando un proceso fantasma y mostraba un error de ejecución. No debería pasar, pero dejo aquí documentado como solucionarlo.

Error: El puerto ya está en uso, solución:

```bash
taskkill /F /IM node.exe
```

