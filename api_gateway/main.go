package main

import (
    "fmt"
    "log"
    "net/http"
    "os"
)

func main() {
    http.HandleFunc("/hello", func(w http.ResponseWriter, r *http.Request) {
        log.Println("Backend service received a request on /hello")
        
        hostname, err := os.Hostname()
        if err!= nil {
            hostname = "unknown"
        }

        fmt.Fprintf(w, "Hello from the backend service, served by host: %s\n", hostname)
    })

    log.Println("Backend service starting on port 80...")

    if err := http.ListenAndServe(":80", nil); err!= nil {
        log.Fatalf("Could not start backend server: %s\n", err)
    }
}