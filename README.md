
1. Clonar el repositorio.
2. Crear una copia del archivo ```.env.template``` y nombrarlo ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```npm install```
4. Levantar la Base de Datos ```docker compose up -d```
5. Correr las migraciones de Prisma ```npx prisma migrate dev``` 
6. Ejecutar el seed ```npm run seed```
7. Correr el proyecto```npm run dev```
