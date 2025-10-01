# Mi Librería React con Tailwind

Librería de componentes React construida con Vite, TypeScript y Tailwind CSS con **CSS Code Splitting real**.

## 🚀 Instalación

```bash
npm install
```

## 📦 Build

```bash
npm run build
```

Esto generará una **estructura optimizada** separando estilos comunes de personalizados:

```
dist/
├── components/
│   ├── Button.a3f8b2c1.js         # JS del Button
│   ├── Button.a3f8b2c1.js.map
│   ├── Button.x9y8z7.css          # CSS personalizado del Button (solo si existe)
│   ├── Button.d.ts
│   ├── Card.b7c8d9e0.js           # JS del Card
│   ├── Card.b7c8d9e0.js.map
│   ├── Card.f1a2b3c4.css          # CSS personalizado del Card (solo si existe)
│   └── Card.d.ts
├── index.m5n4o3.js                # Entry principal
├── index.m5n4o3.js.map
├── styles.p7q8r9.css              # ← Estilos COMUNES de Tailwind
└── index.d.ts
```

### 📊 Organización de estilos:

**`styles.css`** (Cargado con index.js)
- Todas las utilidades de Tailwind usadas en la librería
- `bg-blue-600`, `text-white`, `rounded-lg`, `shadow-md`, etc.
- Se carga UNA SOLA VEZ al importar cualquier componente

**`Button.css`** (Cargado con Button.js)
- Solo estilos personalizados de Button
- `.custom-button-shadow`, `.custom-button-hover-effect`
- Solo se carga si usas Button

**`Card.css`** (Cargado con Card.js)
- Solo estilos personalizados de Card
- `.custom-card-gradient`, `.custom-card-hover`
- Solo se carga si usas Card

## 🎯 Uso en otro proyecto

### 1. Instalar la librería

```bash
npm install my-react-library
```

### 2. Importar componentes

```tsx
// ✅ Importar desde el entry principal (RECOMENDADO)
import { Button, Card } from 'my-react-library';

function App() {
  return (
    <div>
      <Card title="Ejemplo">
        <Button variant="primary" onClick={() => alert('¡Hola!')}>
          Click aquí
        </Button>
      </Card>
    </div>
  );
}
```

### ¿Cómo funciona internamente?

El archivo `dist/index.[hash].js` actúa como **punto de entrada único** que resuelve los hashes:

```javascript
// dist/index.a3f8b2c1.js
import { Button as t } from "./components/Button.DyRjCEgm.js";
import { Card as f } from "./components/Card.CMgwIzXg.js";
export { t as Button, f as Card };
```

Cuando haces:
```tsx
import { Button } from 'my-react-library';
```

1. Node resuelve `my-react-library` → `dist/index.a3f8b2c1.js` (gracias al script post-build)
2. El index importa `Button.DyRjCEgm.js` con el hash correcto
3. El Button importa su CSS `Button.x9y8z7.css` automáticamente
4. ✅ Todo funciona sin que conozcas los hashes

### 🎨 Los estilos se cargan automáticamente

Cada componente importa su propio CSS:
```tsx
// src/components/Button.tsx
import './Button.css'; // ← Side-effect import
```

Cuando Vite hace el build, este import se convierte en:
```javascript
// dist/components/Button.DyRjCEgm.js
import './Button.x9y8z7.css'; // ← Hash resuelto automáticamente
```

**No necesitas importar CSS manualmente** en tu aplicación. 🎉

## 🎨 CSS Code Splitting con estilos comunes

### ✅ Ventajas de esta arquitectura:

1. **Estilos Tailwind compartidos**: Un solo archivo `styles.css` con todas las utilidades
2. **Estilos personalizados separados**: Cada componente tiene su propio CSS si tiene estilos custom
3. **Tree-shaking óptimo**: Solo cargas los estilos personalizados de componentes que usas
4. **Sin duplicación**: Las clases Tailwind no se repiten en cada componente

### 📊 Ejemplo de carga:

#### Caso 1: Solo usas Button
```tsx
import { Button } from 'my-react-library';
```
**Se cargan:**
- ✅ `index.js` → Carga `styles.css` (utilidades Tailwind)
- ✅ `Button.js` → Carga `Button.css` (estilos personalizados)
- ❌ `Card.js` NO se carga
- ❌ `Card.css` NO se carga

**Total:** Tailwind común + Button custom

#### Caso 2: Usas Button y Card
```tsx
import { Button, Card } from 'my-react-library';
```
**Se cargan:**
- ✅ `index.js` → Carga `styles.css` (utilidades Tailwind) **UNA SOLA VEZ**
- ✅ `Button.js` → Carga `Button.css` (estilos personalizados)
- ✅ `Card.js` → Carga `Card.css` (estilos personalizados)

**Total:** Tailwind común (1x) + Button custom + Card custom

### 🎯 Comparación de tamaño:

```
Enfoque antiguo (CSS duplicado en cada componente):
├── Button.css: 15 KB (Tailwind + custom)
└── Card.css: 18 KB (Tailwind duplicado + custom)
Total: 33 KB

Enfoque nuevo (CSS común + custom separado):
├── styles.css: 12 KB (Tailwind compartido)
├── Button.css: 0.5 KB (solo custom)
└── Card.css: 0.8 KB (solo custom)
Total: 13.3 KB ← 60% menos!
```

### 💡 ¿Cuándo se genera CSS personalizado?

- **SÍ se genera** si el componente tiene clases custom (`.custom-button-shadow`)
- **NO se genera** si el componente solo usa utilidades Tailwind estándar
- **Vite lo decide automáticamente** durante el build

## 📚 Componentes disponibles

### Button
```tsx
<Button 
  variant="primary" // 'primary' | 'secondary' | 'danger'
  size="md"         // 'sm' | 'md' | 'lg'
  onClick={() => {}}
  disabled={false}
>
  Texto del botón
</Button>
```

### Card
```tsx
<Card 
  title="Título" 
  subtitle="Subtítulo"
  className="custom-class"
>
  Contenido de la card
</Card>
```

## ⚙️ Configuración importante

### Tailwind preflight desactivado
El `preflight: false` en `tailwind.config.js` evita que los estilos base de Tailwind sobrescriban los del proyecto consumidor.

### Peer Dependencies
React y React-DOM son peer dependencies, por lo que el proyecto consumidor debe tenerlos instalados.

## 🔧 Desarrollo

```bash
npm run dev
```

Esto iniciará Vite en modo desarrollo para probar tus componentes.