Test Guatemala / Listado / Detalle / firebase-auth / send headers


La app es una demo, la cual cuenta inicialmente con una funcionalidad de login con OAuth especificamente con google mediante firebase-auth.
Luego de hacer el login y recibir el token retornado desde firebase, dicho token se envia como headers a una peticion de la API,
la cual retorna el listado. Se debe enviar el headers ya que es restrictivo para el retorno. 

Tambien consta de una pantalla de detalle, desde la cual se hace la peticion a un metodo de la API que retorna el listado, de igual forma se envia por headers 
el token obtenido desde firebase.

Para correr la app debe: 
-clonar el repositorio
-ejecutar npm install para obtener dependendcias
-Instalar el plugin npm install @angular/fire firebase --save para poder acceder a las funciones y clases basicas de autenticaion con Google
-Ejecutar Ionic Server

Datos de configuracion:
CLI Ionic -> version: 5.4.16
Node js -> version: 12.13.0

Para hacer el build para Android:
-Ejecutar el comando: ionic cordova platform add android
-Ejecutar el comando: ionic cordova build android
(para app debug)


Para integracion de enpoints:
1) Inicialmente mediante la funcion loginGoogle() del archivo home.ts se obtiene el token de firebase. La funcion se invoca mediante un POST
2) Se envia el token obtenido a la BD de la API local mediante la funcion loginApiLocal() del archivo de servicios auth.services. Se envia mediante POST y en formato json el dato token
3) Para obtener el listado se hace peticion al metodo promociones mediante la funcion verListado() del servicio. Se envia como parametro en el header el token de firebase que se almacena localmente en la variable token de la app.  La funcion se invoca mediante un GET
4) Para obtener el detalle, se hace la peticion al metodo promocion de la API mediante la funcion loadDetalle() del servicio. Se envian como parametro el token en el header, y el id de item de listado. La funcion se invoca mediante un GET

Se define una url base , de forma que en las funciones del serivicio se concatena la url base + el nombre del metodo de la API

Nota importante: Para conectar la App con otro aplicacion de google (otro usuario), debe editar los datos de firebaseConfig que encuentra en la Configuración del proyecto en la consola firebase, y dichos datos colocarlos en los archivos environment.prod.ts yenvironment.ts en el directorio "scr/app/environment"
