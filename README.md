# Residencial Atlas — Landing Page

Landing page institucional para **Residencial Atlas** (Montevideo, Uruguay), orientada a la presentación de servicios, instalaciones, equipo profesional y conversión mediante contacto por WhatsApp.

## 🚀 Tecnologías

- **Frontend**: HTML5 semántico, CSS3 moderno (Custom Properties, Flexbox, Grid), Vanilla JavaScript.
- **Servidor Web**: Nginx Alpine (`nginx:alpine`) con compresión Gzip, cabeceras de seguridad y caché optimizada de assets estáticos.
- **Despliegue**: Compatible con Dokploy, Docker y Docker Compose.

---

## 🛠️ Ejecución Local con Docker

Para levantar y probar la landing page en tu máquina local:

```bash
docker compose up -d
```

Accedé en tu navegador a:
👉 [http://localhost:8080](http://localhost:8080)

Para detener el contenedor:
```bash
docker compose down
```

---

## 🌐 Despliegue en Dokploy

1. **Crear Aplicación en Dokploy**:
   - En tu panel de Dokploy, seleccioná tu proyecto y hacé clic en **Create Service** > **Application**.
2. **Origen del Código**:
   - **Provider**: GitHub.
   - **Repository**: `barta4/atlas-landing`.
   - **Branch**: `main`.
   - **Build Type**: `Dockerfile`.
3. **Configuración de Red y Dominio**:
   - **Port**: `80`.
   - En la pestaña **Domains**, agregá el dominio deseado (ej. `residencialatlas.uy` o un subdominio) con HTTPS / SSL (Let's Encrypt automático vía Traefik).
4. **Deploy**:
   - Hacé clic en **Deploy**. Dokploy compilará la imagen Nginx y publicará el sitio automáticamente.
