# MartianRobots
Para ejecutar el codigo se debe tener instalado Node.js y el repositorio.
El comando para ejecutarlo es el siguiente: node main.js nombre_fichero

EL fichero deberá ser un .txt en el que en la primera linea este el tamaño del mapa (x e y) separados por un espacio. En la siguiente linea deberá haber la información de un marciano (x y facing) separada por espacios sin ningun espacio al final. En la siguiente linea deberán estar los movimientos que el marciano deberá hacer. Esto se repetira para cada marciano

Existen 4 ficheros de pruebas
- sample.txt: prueba proporcionada en el enunciado
- Error1.txt: prueba de que no se permiten mapas mas grandes que 50x50
- Error2.txt: prueba de que no se permiten coordenadas del marciano mayor a 50
- Error3.txt: prueba de que no se permiten mas de 100 movimientos por cada fantasma

Por último un ejemplo de ejecución es el siguiente: node main.js sample.txt
