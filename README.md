# Firebase Studio (Alumbra AI Frontend)

This is a Next.js project for the Alumbra AI application frontend.

To get started, take a look at `src/app/page.tsx`.

## Developer Instructions (Linux y Visual Studio Code)

Sigue estos pasos para clonar y ejecutar el proyecto en un entorno de desarrollo Linux utilizando Visual Studio Code:

1.  **Clonar el repositorio desde GitHub:**
    Abre tu terminal y ejecuta el siguiente comando. Reemplaza `[URL_DEL_REPOSITORIO]` con la URL real del repositorio:
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd [NOMBRE_DEL_REPOSITORIO_CLONADO] # Navega al directorio del proyecto clonado
    ```
    (Donde `[NOMBRE_DEL_REPOSITORIO_CLONADO]` es usualmente el nombre del repositorio, ej. `alumbra-ai-project`)

2.  **Abrir el proyecto en Visual Studio Code:**
    *   Abre Visual Studio Code.
    *   Ve a `File > Open Folder...` (o `Archivo > Abrir Carpeta...`).
    *   Selecciona la carpeta raíz del proyecto que acabas de clonar (ej. `[NOMBRE_DEL_REPOSITORIO_CLONADO]`) y haz clic en "Open" (o "Abrir").

3.  **Instalar dependencias:**
    Este proyecto tiene dos partes principales: el frontend (Next.js, en la raíz del proyecto) y el backend (Node.js/Express, en la carpeta `alumbra-backend/`). Cada una tiene sus propias dependencias.
    *   **Frontend (Next.js - raíz del proyecto):**
        En la terminal integrada de VS Code (puedes abrirla con Ctrl+\` o Cmd+\`), asegúrate de estar en la raíz del proyecto y ejecuta:
        ```bash
        npm install
        ```
    *   **Backend (Node.js - `alumbra-backend`):**
        Navega al directorio del backend y ejecuta para instalar sus dependencias:
        ```bash
        cd alumbra-backend
        npm install
        cd .. # Vuelve a la raíz del proyecto
        ```

4.  **Variables de Entorno:**
    Asegúrate de configurar las variables de entorno necesarias.
    *   **Frontend:** En la raíz del proyecto, si existe un archivo `.env.example`, renómbralo o copia su contenido a un nuevo archivo llamado `.env.local` y completa los valores necesarios. Actualmente, el frontend no tiene un `.env` explícito en el listado de archivos, pero es una práctica común.
    *   **Backend:** Dentro de la carpeta `alumbra-backend/`, crea un archivo `.env`. Puedes basarte en `alumbra-backend/config/env.config.js` para saber qué variables son esperadas. Para la funcionalidad de envío de correos (como los comentarios o alertas futuras), la variable `WEBHOOK_URL` debe estar configurada. Por ejemplo:
        ```env
        # alumbra-backend/.env
        PORT=3001
        NODE_ENV=development
        GEMINI_API_KEY=tu_api_key_de_gemini_si_la_usas_directamente
        WEBHOOK_URL=https://hook.us2.make.com/3qpuhf3p4yv1t3c2l5udpnsn9g7mtik7
        ```

5.  **Ejecutar el programa:**
    Necesitarás ejecutar tanto el frontend como el backend, idealmente en terminales separadas dentro de VS Code.

    *   **Para ejecutar el Frontend (Aplicación Next.js):**
        En una terminal, desde la raíz del proyecto (ej. `[NOMBRE_DEL_REPOSITORIO_CLONADO]`), ejecuta:
        ```bash
        npm run dev
        ```
        Esto iniciará el servidor de desarrollo del frontend. Usualmente estará disponible en `http://localhost:9002` (según `package.json`).

    *   **Para ejecutar el Backend (Servidor Node.js):**
        En otra terminal, navega al directorio `alumbra-backend/` y ejecuta:
        ```bash
        npm run dev
        ```
        Esto iniciará el servidor del backend. Usualmente estará disponible en `http://localhost:3001` (según `alumbra-backend/package.json`).

    *   **Usando F5 (Configuración de Debug en VS Code):**
        Para usar la tecla F5 para iniciar la depuración, necesitarás configurar el archivo `launch.json` dentro de una carpeta `.vscode` en la raíz de tu proyecto. VS Code puede ayudarte a generar configuraciones básicas para Node.js (para el backend) y para el navegador (para el frontend, usualmente adjuntándose al proceso de Node.js que sirve la app Next.js).
        *   **Comando/Archivo "Principal" para el Frontend:** Al presionar F5 (con la configuración adecuada en `launch.json`), VS Code típicamente ejecutaría el script definido en `package.json` para `dev`, que es `next dev --turbopack -p 9002`. No hay un único "archivo ejecutable" para el frontend en modo desarrollo; `next dev` maneja la compilación y el servicio de archivos como `src/app/page.tsx` y otros bajo `src/app/`.
        *   **Comando/Archivo "Principal" para el Backend:** Para el backend, el script `dev` en `alumbra-backend/package.json` ejecuta `nodemon server.js`. Por lo tanto, el archivo principal que se ejecuta (y que nodemon monitorea) es `alumbra-backend/server.js`. Una configuración de `launch.json` para el backend apuntaría a ejecutar este script o el comando `npm run dev` en el directorio `alumbra-backend`.

Una vez que ambos servidores (frontend y backend) estén en funcionamiento, puedes acceder a la aplicación a través de la URL del frontend (generalmente `http://localhost:9002`).
