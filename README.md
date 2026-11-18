# 🏢 IntegraPro Enterprise • Front-End (React + Vite + TypeScript)

Nueva interfaz desacoplada de alto rendimiento desarrollada con el stack tecnológico moderno de **BanaTrace** para la comercialización B2B y SaaS de **IntegraPro**.

---

## 🚀 Cómo Iniciar el Proyecto Localmente

1. Abre una terminal en esta carpeta:
   ```bash
   cd "C:\Users\Max Herrera\integrapro-frontend"
   ```
2. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   # o simplemente haz doble clic en start.bat
   ```
3. Se abrirá automáticamente en tu navegador en:
   👉 **http://localhost:5173**

---

## ✨ Características Ya Implementadas (Semana 1)

* **🔐 Login Corporativo Multi-Tenant:**
  * Selector dinámico de sucursal y rol (Admin, Gerente, Cajero, Bodega, RRHH).
  * Botones de acceso rápido Demo comerciales (1-clic).
  * Badges de confianza de seguridad (Cifrado 256-bit y Aislamiento Multi-Tenancy).

* **📊 Dashboard Ejecutivo en Tiempo Real:**
  * **Tarjetas KPI:** Ventas del Mes con indicador de crecimiento porcentual (+14.8%), Órdenes realizadas, Alertas de stock crítico y Efectivo en caja general.
  * **Gráfica de Área Interactiva (Chart.js):** Comparativa de evolución mensual de ingresos vs. período fiscal anterior.
  * **Alertas Visuales de Inventario:** Panel de productos con stock por debajo del mínimo.
  * **Tabla de Transacciones Recientes:** Historial de ventas en vivo con estados (*Completado*, *Pendiente*).

* **🧭 Navegación & Experiencia de Usuario:**
  * **Paleta de Comandos (`Ctrl + K`):** Buscador global rápido flotante para acceder a cualquier módulo o producto.
  * **Notificador Inteligente de Actualizaciones (Zero-Downtime):** Banner en el sidebar que detecta mejoras en el servidor y permite al usuario actualizar en 1 segundo sin interrumpir su trabajo.

---

## 🛠️ Stack Tecnológico

* **Framework:** React 18 + Vite 5 + TypeScript
* **Estilos:** Tailwind CSS 3.4
* **Iconografía:** Lucide React
* **Visualización de Datos:** Chart.js + React-Chartjs-2
* **Cliente HTTP:** Axios (listo para conectar con Laravel Sanctum)
