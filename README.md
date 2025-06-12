# 📝 Task api

# 🚀 Levantamiento del Proyecto

## 💠 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

1. **Opción 1: Usar Docker:**
   ```bash
   docker compose up --build
    ```
2. Opción 2: Ejecutar localmente:
   ```bash
   npm install
   npm run start:dev
   ```

## 🔧 Backend (NestJS + TypeScript + MongoDB)

### 📁 Módulos principales

- [x] Auth (registro / login con JWT)
- [x] Tasks (CRUD + filtros + validaciones)

### 🗃️ Base de Datos

- [x] MongoDB con Docker
- [x] Configuración de URI vía variables de entorno
- [x] Mongoose + esquemas + validaciones

### ⚙️ Funcionalidades

- [x] Crear tareas (título, descripción, estado, prioridad, fecha límite)
- [x] Leer tareas (con filtros por estado y prioridad)
- [x] Actualizar tareas
- [x] Eliminar tareas
- [ ] Paginación (opcional)
- [x] Drag & Drop prioridades (opcional)
- [x] Manejo de errores

### 🧪 Pruebas

- [x] Archivo `.http` para pruebas manuales

---

## 🎨 Frontend (opcional)

- [ ] Formulario de login y registro
- [ ] Lista de tareas con filtros y paginación
- [ ] UI para crear/editar tareas
- [x] Indicadores de loading / errores
- [x] Drag & drop para prioridades (opcional)

---

## 📦 DevOps

- [x] Variables de entorno
- [x] ESLint configurado
- [x] README con instrucciones
- [x] Git con commits descriptivos
- [x] Dockerfile (opcional)

---

## 📊 Presentación Final

- [x] Aplicación corriendo localmente (demo)
- [x] Documentación clara
- [x] Presentación de 10-15 minutos
