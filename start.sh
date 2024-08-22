#!/bin/bash

# Crear un directorio de prueba en la raíz
mkdir -p /directorio_de_prueba

# Crear un archivo de prueba dentro del directorio
echo "Este es un archivo de prueba" >sudo tee /directorio_de_prueba/archivo_prueba.txt > /dev/null
