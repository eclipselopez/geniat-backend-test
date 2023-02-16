# Prueba técnica Api RESTful Geniat

Esté proyecto incluye una API RESTful para la creación e ingreso de usuarios con multiples roles, así como la creación, lectura, actualización y eliminación de publicaciones.

## Instalación Ambiente de Desarrollo
### 1. Clonar repositorio
#### Clone el repositorio con el siguiente comando.

```
  git clone https://github.com/eclipselopez/geniat-backend-test.git
```

### 2. Instalación de dependencias
#### Una vez clonado ejecute el siguiente comando para realizar la instalación de dependencias.

```
  npm install
```

### 3. Configurar variables de entorno
#### Ingrese a la carpeta config y setee las variables de entorno en el archivo default.yaml.
- **api.identifier:** Etiqueta usada para identificar el nombre del microservicio
- **api.port:** Puerto en el que el servidor **http* se mantendra a la escucha
- **db.type:** Tipo de base de datos a usar ejemplo: **MySQL, PostgreSQL, Oracle, etc.*
- **db.host:** Dirección ip o url del servidor de base de datos.
- **db.port:** Puerto del servidor de base de datos.
- **db.username:** Usuario usado para conexión a servidor de base de datos.
- **db.password:** Contraseña usada para conexión a servidor de base de datos.
- **db.database:** Nombre de la base de datos a la que nos vamos a conectar.
- **db.synchronize:** Esta opción debe estar habilitada en true solo en un ambiente de desarrollo.
- **db.logging:** Indica si debe guardar logs de sus interacciones con la base de datos.
- **crypto.auth_secret:** Cadena de caracteres usada para la encripción de contraseñas.
- **crypto.auth_algorithm:** Algoritmo de encripción que se desea usar.
- **crypto.auth_inputEncoding:** Formato de codificación de caracteres aceptado.
- **crypto.auth_outputEncoding:** Formato de salida de contraseñas encriptadas.
- **jwt.accessTokenSecret:** Cadena de caracteres usada para la generación de Json Web Tokens.
- **jwt.accessTokenLife:** Tiempo de vida del Json Web Token.

```
  api:
    identifier: geniat-backend-test
    port: 5001

  db:
    type: mysql
    host: localhost
    port: 3306
    username: usuario de base de datos
    password: contraseña de base de datos
    database: nombre de base de datos
    synchronize: true
    logging: true

  crypto:
    auth_secret: 56gXxY{+D6/4m#kZ394j2=bT2eHqTAu>r8zAT>yEn:;TM#9*Vg
    auth_ttl: 86400 * 1000
    auth_algorithm: aes256
    auth_inputEncoding: utf8
    auth_outputEncoding: hex

  jwt:
    accessTokenSecret: 0d7c5c5f-768c-4d98-8900-13aadaa21937
    accessTokenLife: 30d
```

### Script para correr el proyecto en ambiente de desarrollo
#### Arranque el proyecto en modo desarrollo con el siguiente comando, esto inicia un monitoreo de cambios con nodemon.

```
  npm run dev:server
```

## Endpoint
Para realizar peticiones a este sevicio es necesario anteponer el prefijo *api* despues de la dirección del servidor, ejemplo: *http://localhost/api/*ruta_endpoint**.

### Endpoints Usuario
1. **Creación de usuario**
- Realice una petición de tipo *POST* a la ruta *http://localhost:5001/api/user/create*
- Coloque en el cuerpo de la petición en formato Json los parametros *name, lastname, email, password, role* como se muestra en el siguiente ejemplo:

**PETICIÓN**
```
   {
       "name": "Juan",
       "lastname": "Perez",
       "email": "juan.perez@mail.com",
       "password": "P@ssw0rd1",
       "role": "básico"
   }
```
**RESPUESTA**
```
    {
    "ok": true,
    "message": "Usuario creado con exito",
    "response": {
        "name": "Juan",
        "lastname": "Perez",
        "email": "juan.perez@mail.com",
        "password": "",
        "role": "basico",
        "salt": "",
        "id": 9
    },
    "code": 201
    }
```


*NOTA: Los roles validos son: *básico, medio, medioalto, altomedio y alto*, de no colocar ningún valor en este campo el usuario se creara con el rol *básico*, los demás campos son obligatorios.*

2. **Login de usuario**
- Realice una petición de tipo *POST* a la ruta *http://localhost:5001/api/user/login*
- Coloque en el cuerpo de la petición en formato Json los parametros *email, password* como se muestra en el siguiente ejemplo:

**PETICIÓN**
```
   {
       "email": "juan.perez@mail.com",
       "password": "P@ssw0rd1"
   }
```
**RESPUESTA**
```
    {
    "ok": true,
    "message": "Usuario logueado con exito",
    "response": {
        "id": 9,
        "name": "Juan",
        "lastname": "Perez",
        "email": "juan.perez@mail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJuYW1lIjoiSnVhbiIsImxhc3RuYW1lIjoiUGVyZXoiLCJlbWFpbCI6Imp1YW4ucGVyZXpAbWFpbC5jb20iLCJyb2xlIjoiYmFzaWNvIn0sImlhdCI6MTY3NjUzODI2MCwiZXhwIjoxNjc5MTMwMjYwfQ.PPHzYppsXfAx5V_FsVIhHKZqN2VQG3Ole6MRF9ezQCY",
    "code": 200
    }
```

### Endpoint Publicaciones
*IMPORTANTE: Para poder hacer peticiones a este endpoint, es necesario loguearse y setear en los headers de la petición, en la llave **Authorization** un token valido.*

1. **Creación de publicaciones**
- Solo podrán crear publicaciones aquellos usuarios que tengan uno de los siguientes roles: *medioalto, altomedio, alto.*

- Realice una petición de tipo *POST* a la ruta *http://localhost:5001/api/publication/create* y coloque en el cuerpo de la petición lo siguiente:

**PETICIÓN**
```
    {
        "title": "El Amazonas",
        "description": "Este libro habla sobre el Amazonas"
    }
```

**RESPUESTA**
```
    {
    "ok": true,
    "message": "Publicacion creada con exito",
    "response": {
        "title": "El Amazonas",
        "description": "Este libro habla sobre el Amazonas",
        "user": {
            "id": 1,
            "name": "Juan",
            "lastname": "Perez",
            "email": "juan.perez@mail.com",
            "role": "alto"
        },
        "creatorId": 1,
        "creatorName": "Juan",
        "creatorRole": "alto",
        "id": 7,
        "createdDate": "2023-02-16T09:34:29.000Z"
    },
    "code": 201
}
```
2. **Modificación de publicaciones**

- Los usuarios que tengan los roles *altomedio y alto* pueden realizar modificaciones en las publicaciones, para esto deben hacer una petición de tipo *PUT* a la ruta *http://localhost:5001/api/publication/update* y colocar en el cuerpo de la petición lo siguiente:

**PETICIÓN**

```
    {
    "id": 2,
    "title": "El Amazonas",
    "description": "Esta es una actualización"
    }
```

**RESPUESTA**
```
    {
    "ok": true,
    "message": "Publicacion actualizada con exito",
    "response": {
        "generatedMaps": [],
        "raw": [],
        "affected": 1
    },
    "code": 200
    }
```

3. **Obtener publicaciones**
- Los usuarios que tengan un rol diferente a *básico* pueden obtener un consolidado de publicaciones haciendo una petición de tipo *GET* a la ruta *http://localhost:5001/api/publication/getall*.

**PETICIÓN**

**RESPUESTA**
```
    {
    "ok": true,
    "message": "Publicaciones recuperadas con exito!",
    "response": [
        {
            "id": 2,
            "title": "El Amazonas",
            "description": "Esta es una actualización",
            "createdDate": "2023-02-16T06:19:29.000Z",
            "creatorName": "salvador",
            "creatorRole": "alto"
        }, 
        "code": 200
    }   
```

4. **Eliminar publicaciones**
- Solo los usuarios con el rol *alto* pueden eliminar publicaciones, se debe hacer una pertición de tipo *DELETE* a la ruta *http://localhost:5001/api/publication/delete?id=*id_publicación*

**PETICIÓN**

**RESPUESTA**
```
{
    "ok": true,
    "message": "Publicacion eliminada con exito",
    "response": {
        "raw": [],
        "affected": 1
    },
    "code": 200
}
```

**NOTA: Se incluye en el repositorio la colección de Postman para realizar las pruebas pertinentes a esta API.**