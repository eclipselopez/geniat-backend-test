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

### . Script para correr el proyecto en ambiente de desarrollo
#### Arranque el proyecto en modo desarrollo con el siguiente comando, esto inicia un monitoreo de cambios con nodemon.

```
  npm run dev:server
```

## Endpoint
Para realizar peticiones a este sevicio, es necesario anteponer el prefijo *api* despues de la dirección del servidor, ejemplo: *http://localhost/api/*ruta_endpoint**.

### Endpoints Usuario
1. **Creación de usuario**
- Realice una petición de tipo POST a la ruta *http://localhost:5001/api/user/create*
- Coloque en el cuerpo de la petición en formato Json los parametros name, lastname, email, password, role, como se muestra en el siguiente ejemplo:

```
   {
       "name": "Juan",
       "lastname": "Perez",
       "email": "juan.perez@mail.com",
       "password": "P@ssw0rd1",
       "role": "basico"
   }
```

NOTA: Los roles validos son: basico, medio, medioalto, altomedio y alto, de no colocar ningún valor en este campo el usuario se creara con el rol -basico-, los demás campos son obligatorios.

2. **Login de usuario**
- Realice una petición de tipo POST a la ruta *http://localhost:5001/api/user/login*
- Coloque en el cuerpo de la petición en formato Json los parametros email, password, como se muestra en el siguiente ejemplo:

```
   {
       "email": "juan.perez@mail.com",
       "password": "P@ssw0rd1"
   }
```