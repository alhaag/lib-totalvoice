#!/usr/bin/env bash
#
# Realiza o buld de todas as imagens necessarias para os servicos.
#
# Autor: Andre Luiz Haag
# See: https://google.github.io/styleguide/shell.xml

#######################################
# Para todos os containers e remove todas as imagens compiladas por esta
# aplicação.
#
# Globals:
#   None
# Arguments:
#   None
# Returns:
#   None
#######################################
clear()
{
    local img_node=$(docker images -q ttv-node 2> /dev/null)
    if [[ "${img_node}" != "" ]]; then
        docker rmi -f ${img_node}
    fi
}

#######################################
# Compila imagens a partir dos Dockerfiles.
#
# Globals:
#   None
# Arguments:
#   None
# Returns:
#   None
#######################################
build()
{
    # bild 'ttv-node' image from Dockerfile
    docker build --force-rm -t ttv-node - < Dockerfile
}

#
# Main
#######################################
clear
build

exit 0
