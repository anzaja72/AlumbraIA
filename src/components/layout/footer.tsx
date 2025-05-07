'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="py-8 bg-background "> 
      <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Alumbra. Todos los derechos reservados.</p>
        <p>Tu información es privada. El análisis se procesa de forma segura.</p>
      </div>
    </footer>
  );
}
