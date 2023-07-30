# Instalación de Proyecto Paso a Paso

## Clonar el Repositorio
1. Abre tu terminal o línea de comandos.
2. Navega al directorio donde deseas clonar el repositorio.
3. Ejecuta el siguiente comando para clonar el repositorio desde GitHub:
```bash
git clone https://github.com/lfmoreno304/BooksReviewFront.git
```
## Configurar las Variables de Entorno
1. En el directorio del proyecto, crea un archivo .env.local para configurar las variables de entorno locales.
2. Agrega las variables de entorno necesarias en el archivo .env.local. Por ejemplo:
```bash
NEXT_PUBLIC_LOGIN_API =https://api.example.com
```
## Instalación de Dependencias
1. Asegúrate de tener instalado Node.js en tu máquina. Puedes descargarlo desde el sitio web oficial de Node.js.
2. Navega al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias:
```bash
npm install
```
## Ejecutar el Proyecto
1. Una vez que las dependencias estén instaladas, ejecuta el siguiente comando para iniciar el servidor de desarrollo:
```bash
npm run dev
```
