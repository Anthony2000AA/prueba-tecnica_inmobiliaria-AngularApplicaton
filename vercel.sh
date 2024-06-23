#!/bin/bash

# Instala Primeng 15.4.1 con dependencias legacy
npm install primeng@15.4.1 --legacy-peer-deps

# Ejecuta el comando de compilación de Angular
ng build

# Exporta la variable VERCEL_ENV para que Vercel la detecte
export VERCEL_ENV=production
