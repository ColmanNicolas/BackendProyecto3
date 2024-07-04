#Backend Bar App Services

## Descripción
Este proyecto es un backend para la gestion de un software que proporcione servicios para establecimientos gatronómicos. Proporciona varias API REST para crear, leer, actualizar y eliminar las siguientes colecciones: Usuarios, platos de menu y pedidos.

## Requisitos Previos
- Node.js v14+
- npm v6+
- MongoDB v4.4+

## Dependencias
- **jsonwebtoken**: Para la creación y verificación de tokens JWT para la autenticación.
- **mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **dotenv**: Para gestionar variables de entorno.
- **express-validator**: Para la validación de datos en las solicitudes HTTP.
- **cors**: Para habilitar CORS (Cross-Origin Resource Sharing) en el servidor.
- **bcryptjs**: Para el hash de contraseñas y su comparación.

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/usuario/proyecto-backend.git
2. Navegar al directorio del proyecto:
   ```bash
   cd proyecto-backend
3. Instalar las dependencias del proyecto
4. Instalar MongoDB:
5. Configurar las variables de entorno:
 ```plaintext
  PORT=5000
  MONGODB_URI=mongodb://localhost:27017/su-endpoint
  JWT_SECRET=tu_secreto


