# cripto-challenge
Para la realización de este challenge decidí hacer una web. Utilizando ReactJS para el frontend, y por el alcance de este proyecto no realicé un backend.

Elegí Firebase como servicio de base de datos, donde guardo las operaciones que registra el usuario. El motivo de esta elección, fue simplemente aprovechar el challenge para aprender cosas nuevas y conocer este servicio de base de datos (que también cuenta con autenticación, hosting, y un montón de cosas interesantes) de Google.

De esta manera, pude conectar mi frontend en React con mi base de datos en Firebase.

El sitio cuenta con dos vistas: una en la que se puede ver una tabla con todas las compras de criptomonedas, y otra en la que se pueden agregar nuevas compras.

Para la obtención de los nombres y precios de los tokens se utilizó la api de https://nomics.com/ cuya documentacion es https://nomics.com/docs/#tag/Currencies.

La web se deployó en Vercel por su simplicidad para realizar esta tarea. El link donde se puede acceder es https://cripto-challenge.vercel.app/

Una vez realizado el deploy, dejaron de aparecer los valores traídos por la api. Apareciendo de esta manera, errores en la consola que indicaban problemas con cors al pegarle a la api.
Se intentó resolver agregando headers y modos al request, e incluso cambiando de api pero no se resolvió.