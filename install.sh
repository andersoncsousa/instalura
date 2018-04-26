#!/bin/bash

cd ~/Desktop

echo "Clonando projeto do curso"
git clone https://github.com/rafael-rollo/boilerplate-curso-rn.git

mv ./boilerplate-curso-rn ./InstaluraMobile
cd InstaluraMobile

echo "Instalando as dependencias"
yarn install

