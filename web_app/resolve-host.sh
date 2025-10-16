#!/bin/bash

DOMAIN="web_service"

function resolve_host {
    echo -e "\nResolving host name"
    if ping -c1 -W1 "$DOMAIN" &>/dev/null; then
        echo "Host already written to /etc/hosts"
    else
        if sudo echo -e "127.0.0.1 \t$DOMAIN" >> /etc/hosts; then
            echo "Successfully wrote to /etc/hosts"
        else
            echo "An error was encountered while writing to /etc/hosts"
        fi
    fi
    echo -e "\n"
}

# Resolve host
resolve_host