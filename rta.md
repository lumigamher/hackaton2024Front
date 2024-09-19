### **Roles del Equipo**

1. **Backend Developer (Spring Boot)**
   - Responsable de la creación de APIs RESTful para login, registro de tiempo, y totalización de actividades y proyectos.

2. **Frontend Developer (React)**
   - Encargado de implementar la UI del sistema, incluyendo login, registro de tiempo, asignación de actividades, y la visualización de históricos.

3. **Full Stack Developer**
   - Asegura la correcta integración entre frontend y backend, se enfoca en la configuración de seguridad (JWT) y CORS.

4. **QA y DevOps**
   - Encargado de pruebas y aseguramiento de calidad. También es responsable del despliegue de la aplicación y monitoreo de rendimiento.

---

### **Alcance Mínimo:**
1. **Login y Autenticación**: 
   - Conectar con la base de datos y asegurar el acceso mediante un sistema de roles.
   
2. **Registro de Tiempos**:
   - Permitir a los colaboradores registrar el inicio y fin de su jornada, así como el tiempo invertido en cada actividad asignada.

3. **Asignación de Actividades**:
   - Los usuarios deben poder asignarse una actividad y ver el listado de actividades disponibles.

4. **Histórico de Actividades**:
   - Mostrar un registro del tiempo invertido en cada actividad, para un historial por proyecto y usuario.

5. **Totalización de Información**:
   - Totalizar el tiempo invertido por proyecto o actividad, sin importar qué colaborador participó en ellas.

---

### **Alcance Ideal (Ampliado):**
1. **Rol de Administrador y Dashboard**:
   - Un administrador debe poder visualizar un dashboard con métricas clave sobre la actividad de los colaboradores, como horas totales trabajadas por proyecto y actividad.

2. **Visualización de Proyectos**:
   - Los usuarios deben poder identificar fácilmente los proyectos a los que pertenecen.

3. **Optimización del Sistema**:
   - Optimizar el sistema para totalizar las actividades en tiempo real y presentar datos agregados en el dashboard de forma eficiente.

---

### **Cronograma de Desarrollo (6 días)**

#### **Día 1: Planificación y Configuración**
- **Tareas para todos los roles:**
  - Definir requisitos técnicos y no técnicos específicos.
  - Configurar los entornos locales y el repositorio para el equipo.
  - Diseñar la arquitectura del sistema y los flujos de trabajo (login, registro de tiempo, totalización).
  - Crear los wireframes de la interfaz (login, registro de actividad, dashboard).

  **Entrega del Día 1:**
  - Repositorio con estructura inicial.
  - Diagrama de flujo de la solución y wireframes del sistema.

#### **Día 2: Desarrollo del Backend (APIs y Base de Datos)**
- **Backend Developer:**
  - Crear el modelo de base de datos (Usuarios, Proyectos, Actividades, Registro de Tiempos).
  - Implementar autenticación con JWT y los endpoints:
    - `/login`
    - `/activities` (listar actividades)
    - `/register-time` (registrar tiempo invertido en una actividad)
  
- **Full Stack Developer:**
  - Configuración de seguridad y validación de datos en las APIs.
  - Pruebas básicas de integración con Postman.

  **Entrega del Día 2:**
  - Backend funcional con endpoints iniciales.
  - Seguridad implementada con JWT.

#### **Día 3: Desarrollo del Frontend (Componentes y Vistas)**
- **Frontend Developer:**
  - Configurar el proyecto React.
  - Crear los componentes clave:
    - `LoginComponent`
    - `ActivityComponent` (para asignar y registrar actividades)
    - `HistoryComponent` (para mostrar el histórico de actividades)
  
- **Full Stack Developer:**
  - Integración de llamadas API con Axios o Fetch.
  - Gestión de estado con React.

  **Entrega del Día 3:**
  - Interfaz básica con login y registro de actividades.
  - Comunicación con el backend establecida.

#### **Día 4: Ampliación del Backend (Totalización y Dashboard)**
- **Backend Developer:**
  - Implementar la lógica de totalización de tiempos invertidos por proyecto o actividad.
  - Crear endpoints adicionales para el rol de administrador:
    - `/dashboard` (métricas del administrador)
  
- **Full Stack Developer:**
  - Implementar las pruebas de integración y optimizar el rendimiento de las consultas de totalización.

  **Entrega del Día 4:**
  - Lógica de totalización y dashboard funcional.
  - Endpoints para visualización de datos por proyecto.

#### **Día 5: Pruebas y Ajustes**
- **QA y DevOps:**
  - Realizar pruebas unitarias y de integración.
  - Validar la experiencia del usuario con pruebas manuales.
  - Asegurarse de que las consultas a la base de datos sean eficientes.

- **Backend Developer y Frontend Developer:**
  - Resolver errores y optimizar el código.

  **Entrega del Día 5:**
  - Pruebas exitosas en backend y frontend.
  - Correcciones de errores realizadas.

#### **Día 6: Despliegue y Documentación**
- **QA y DevOps:**
  - Desplegar el backend en un servidor (AWS, Heroku).
  - Desplegar el frontend en Netlify o Vercel.
  
- **Backend Developer y Frontend Developer:**
  - Documentar la solución, incluyendo la API y el uso del sistema.

  **Entrega del Día 6:**
  - Sistema completamente funcional desplegado en la nube.
  - Documentación técnica y de usuario lista.

---

### **Distribución de Tiempos**

| **Fase**                  | **Duración** | **Roles Principales**             |
|---------------------------|--------------|-----------------------------------|
| **Planificación y Configuración** | Día 1        | Todos los roles                    |
| **Desarrollo Backend**     | Día 2 y Día 4| Backend Developer, Full Stack     |
| **Desarrollo Frontend**    | Día 3        | Frontend Developer, Full Stack    |
| **Pruebas y Ajustes**      | Día 5        | QA y DevOps, Todos                |
| **Despliegue y Documentación** | Día 6     | QA y DevOps, Todos                |

---
