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
```
##Uso
1. Inicia el servidor:
```bash
npm run dev
```
2. La API estará disponible en http://localhost:5000.

## Endpoints API

### Endpoints para crear una base de datos de usuarios que quieren contratar un Servicio web que ofrecemos en nuestro proyecto.

#### `GET /principalUsers/:id`

- **Descripción**: Obtiene los detalles de un usuario principal por su ID.
- **Códigos de estado**:
  - `200 OK`: Retorna los detalles del usuario.
  - `404 Not Found`: El usuario no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /principalUsers`

- **Descripción**: Obtiene la lista de todos los usuarios principales.
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de usuarios correctamente.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /principalUsers/status/:status`

- **Descripción**: Obtiene la lista de usuarios principales filtrados por estado.
- **Parámetros de ruta**:
  - `status`: Estado del usuario (activo, inactivo, etc.).
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de usuarios filtrados correctamente.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /principalUsers/paid/:paid`

- **Descripción**: Obtiene la lista de usuarios principales filtrados por estado de pago.
- **Parámetros de ruta**:
  - `paid`: Estado de pago del usuario (pagado, pendiente, etc.).
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de usuarios filtrados correctamente.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `POST /principalUsers`

- **Descripción**: Crea un nuevo usuario principal.
- **Body de la solicitud**: JSON con los detalles del nuevo usuario.
- **Códigos de estado**:
  - `201 Created`: Usuario creado exitosamente.
  - `400 Bad Request`: Error en el formato de la solicitud.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `PUT /principalUsers/:id`

- **Descripción**: Actualiza los detalles de un usuario principal por su ID.
- **Parámetros de ruta**:
  - `id`: ID único del usuario.
- **Body de la solicitud**: JSON con los detalles actualizados del usuario.
- **Códigos de estado**:
  - `200 OK`: Usuario actualizado exitosamente.
  - `400 Bad Request`: Error en el formato de la solicitud.
  - `404 Not Found`: El usuario no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `PUT /principalUsers/enable/:id`

- **Descripción**: Habilita un usuario principal específico.
- **Parámetros de ruta**:
  - `id`: ID único del usuario.
- **Códigos de estado**:
  - `200 OK`: Usuario habilitado correctamente.
  - `404 Not Found`: El usuario no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `PUT /principalUsers/disable/:id`

- **Descripción**: Deshabilita un usuario principal específico.
- **Parámetros de ruta**:
  - `id`: ID único del usuario.
- **Códigos de estado**:
  - `200 OK`: Usuario deshabilitado correctamente.
  - `404 Not Found`: El usuario no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `PUT /principalUsers/pay-done/:id`

- **Descripción**: Marca el pago como completado para un usuario principal.
- **Parámetros de ruta**:
  - `id`: ID único del usuario.
- **Códigos de estado**:
  - `200 OK`: Pago marcado como completado correctamente.
  - `404 Not Found`: El usuario no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `DELETE /principalUsers/borrar/:id`

- **Descripción**: Elimina un usuario principal por su ID.
- **Parámetros de ruta**:
  - `id`: ID único del usuario.
- **Códigos de estado**:
  - `204 No Content`: Usuario eliminado correctamente.
  - `404 Not Found`: El usuario no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---
 
#### `POST /principal-auth/login`

- **Descripción**: Endpoint para que un usuario principal inicie sesión.
- **Body de la solicitud**: JSON con las credenciales de inicio de sesión (por ejemplo, email y contraseña).
- **Códigos de estado**:
  - `200 OK`: Inicio de sesión exitoso.
  - `401 Unauthorized`: Credenciales inválidas.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `POST /principal-auth/register`

- **Descripción**: Endpoint para registrar un nuevo usuario principal.
- **Body de la solicitud**: JSON con los detalles del nuevo usuario (por ejemplo, nombre, email, contraseña).
- **Códigos de estado**:
  - `200 OK`: Usuario registrado exitosamente.
  - `400 Bad Request`: Error en el formato de la solicitud.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

### Endpoints para crear una base de datos de usuarios que quieren ser clientes de un establecimiento gastronomico que haya contratado un servicio

#### `GET /users`

- **Descripción**: Obtiene todos los usuarios.
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de usuarios correctamente.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /users/:id`

- **Descripción**: Obtiene los detalles de un usuario por su ID.
- **Parámetros de ruta**:
  - `id`: ID único del usuario.
- **Códigos de estado**:
  - `200 OK`: Retorna los detalles del usuario correctamente.
  - `404 Not Found`: El usuario no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /users/filter/:status`

- **Descripción**: Obtiene la lista de usuarios filtrados por estado.
- **Parámetros de ruta**:
  - `status`: Estado del usuario (activo, inactivo, etc.).
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de usuarios filtrados correctamente.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /users/role_filter/:role`

- **Descripción**: Obtiene la lista de usuarios filtrados por rol.
- **Parámetros de ruta**:
  - `role`: Rol del usuario (ADMIN_ROLE, USER_ROLE, etc.).
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de usuarios filtrados correctamente.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `POST /users`

- **Descripción**: Crea un nuevo usuario.
- **Body de la solicitud**: JSON con los detalles del nuevo usuario.
- **Códigos de estado**:
  - `200 OK`: Usuario creado exitosamente.
  - `400 Bad Request`: Error en el formato de la solicitud.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `PUT /users/:id`

- **Descripción**: Actualiza los detalles de un usuario por su ID.
- **Parámetros de ruta**:
  - `id`: ID único del usuario.
- **Body de la solicitud**: JSON con los detalles actualizados del usuario.
- **Códigos de estado**:
  - `200 OK`: Usuario actualizado exitosamente.
  - `400 Bad Request`: Error en el formato de la solicitud.
  - `404 Not Found`: El usuario no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `PUT /users/enable/:id`

- **Descripción**: Habilita un usuario específico por su ID.
- **Parámetros de ruta**:
  - `id`: ID único del usuario.
- **Códigos de estado**:
  - `200 OK`: Usuario habilitado correctamente.
  - `404 Not Found`: El usuario no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `DELETE /users/:id`

- **Descripción**: Elimina un usuario por su ID.
- **Parámetros de ruta**:
  - `id`: ID único del usuario.
- **Códigos de estado**:
  - `204 No Content`: Usuario eliminado correctamente.
  - `404 Not Found`: El usuario no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /users/search/:query`

- **Descripción**: Busca usuarios que coincidan con el término de búsqueda.
- **Parámetros de ruta**:
  - `query`: Término de búsqueda para el nombre, correo u otro criterio.
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de usuarios que coinciden con la búsqueda correctamente.
  - `500 Internal Server Error`: Problemas internos del servidor.

---
#### `POST /auth/login`

- **Descripción**: Endpoint para que un usuario inicie sesión.
- **Body de la solicitud**: JSON con las credenciales de inicio de sesión (email y contraseña).
- **Validaciones**:
  - El email debe ser válido.
  - La contraseña es obligatoria.
- **Códigos de estado**:
  - `200 OK`: Inicio de sesión exitoso.
  - `401 Unauthorized`: Credenciales inválidas.
  - `500 Internal Server Error`: Problemas internos del servidor.
    
---
 
#### `POST /users/admin`

- **Descripción**: Endpoint para generar un usuario administrador.
- **Body de la solicitud**: JSON con los detalles del nuevo usuario administrador.
- **Códigos de estado**:
  - `200 OK`: Usuario administrador generado exitosamente.
  - `400 Bad Request`: Error en el formato de la solicitud.
  - `500 Internal Server Error`: Problemas internos del servidor.

### Endpoints para crear una base de datos de pedidos

#### `GET /order`

- **Descripción**: Obtiene todas las órdenes de pedido.
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de órdenes correctamente.
  - `404 Not Found`: No se encontraron órdenes.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /order/:id`

- **Descripción**: Obtiene los detalles de una orden específica por su ID.
- **Parámetros de ruta**:
  - `id`: ID único de la orden.
- **Códigos de estado**:
  - `200 OK`: Retorna los detalles de la orden correctamente.
  - `404 Not Found`: La orden no fue encontrada.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `POST /order`

- **Descripción**: Crea una nueva orden de pedido.
- **Body de la solicitud**: JSON con los detalles de la nueva orden (rest, items, totalPrice, status, createdAt).
- **Códigos de estado**:
  - `201 Created`: Orden creada exitosamente.
  - `400 Bad Request`: Error en el formato de la solicitud.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `PUT /order/:id`

- **Descripción**: Actualiza los detalles de una orden existente por su ID.
- **Parámetros de ruta**:
  - `id`: ID único de la orden.
- **Body de la solicitud**: JSON con los detalles actualizados de la orden (status, paid).
- **Códigos de estado**:
  - `200 OK`: Estado de la orden actualizado correctamente.
  - `400 Bad Request`: Error en el formato de la solicitud.
  - `404 Not Found`: La orden no fue encontrada.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /order/filter/:filtro`

- **Descripción**: Obtiene la lista de órdenes filtradas por estado de pago o estado.
- **Parámetros de ruta**:
  - `filtro`: Estado de pago ("PAGADO", "NO_PAGADO") o estado de la orden específico.
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de órdenes filtradas correctamente.
  - `404 Not Found`: No se encontraron órdenes que coincidan con el filtro.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `POST /orders/update-orders`

- **Descripción**: Actualiza el usuario asociado a todas las órdenes existentes.
- **Body de la solicitud**: JSON con el nuevo `userId` que se asignará a todas las órdenes.
- **Códigos de estado**:
  - `200 OK`: Órdenes actualizadas exitosamente.
  - `400 Bad Request`: Error en el formato de la solicitud.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /orders/search/:query`

- **Descripción**: Busca órdenes de pedido que coincidan con el término de búsqueda.
- **Parámetros de ruta**:
  - `query`: Término de búsqueda para número de orden o nombre de usuario.
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de órdenes que coinciden con la búsqueda correctamente.
  - `400 Bad Request`: No se encontraron órdenes que coincidan con la búsqueda.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /order/userOrderFilter/:id`

- **Descripción**: Obtiene las órdenes de pedido asociadas a un usuario específico por su ID.
- **Parámetros de ruta**:
  - `id`: ID único del usuario.
- **Códigos de estado**:
  - `200 OK`: Retorna las órdenes de pedido asociadas al usuario correctamente.
  - `400 Bad Request`: No se encontraron órdenes asociadas al usuario.
  - `500 Internal Server Error`: Problemas internos del servidor.
 
---

### Endpoints para crear una base de datos de platos para un menú

#### `GET /menu`

- **Descripción**: Obtiene todos los menús.
- **Controlador**: `menuController.getAllMenu`
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de menús correctamente.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `POST /menu`

- **Descripción**: Crea un nuevo menú.
- **Controlador**: `menuController.createNewMenu`
- **Body de la solicitud**: JSON con los detalles del nuevo menú.
- **Códigos de estado**:
  - `200 OK`: Menú creado exitosamente.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /menu/:id`

- **Descripción**: Obtiene los detalles de un menú específico por su ID.
- **Controlador**: `menuController.getOneMenu`
- **Parámetros de ruta**:
  - `id`: ID único del menú.
- **Códigos de estado**:
  - `200 OK`: Retorna los detalles del menú correctamente.
  - `404 Not Found`: El menú no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /menu/search/:query`

- **Descripción**: Busca menús que coincidan con el término de búsqueda.
- **Controlador**: `menuController.searchMenus`
- **Parámetros de ruta**:
  - `query`: Término de búsqueda para nombre o descripción del menú.
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de menús que coinciden con la búsqueda correctamente.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `PUT /menu/:id`

- **Descripción**: Actualiza los detalles de un menú existente por su ID.
- **Controlador**: `menuController.putUpdateMenu`
- **Parámetros de ruta**:
  - `id`: ID único del menú.
- **Body de la solicitud**: JSON con los detalles actualizados del menú.
- **Códigos de estado**:
  - `200 OK`: Menú actualizado exitosamente.
  - `404 Not Found`: El menú no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `DELETE /menu/:id`

- **Descripción**: Elimina un menú por su ID.
- **Controlador**: `menuController.deleteMenu`
- **Parámetros de ruta**:
  - `id`: ID único del menú.
- **Códigos de estado**:
  - `204 No Content`: Menú eliminado correctamente.
  - `404 Not Found`: El menú no fue encontrado.
  - `500 Internal Server Error`: Problemas internos del servidor.

---

#### `GET /menu/filter/:filtro`

- **Descripción**: Filtra los menús por un criterio específico.
- **Controlador**: `menuController.filtrarMenus`
- **Parámetros de ruta**:
  - `filtro`: Criterio de filtro para los menús.
- **Códigos de estado**:
  - `200 OK`: Retorna la lista de menús filtrados correctamente.
  - `500 Internal Server Error`: Problemas internos del servidor.

---
## Estructura del proyecto

