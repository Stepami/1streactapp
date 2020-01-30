package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
)

func main() {
	var port int
	var distDir string
	flag.IntVar(&port, "p", 3000, "port of prod server")
	flag.StringVar(&distDir, "ddir", "dist", "path to directory with built client")
	flag.Parse()
	// содержимое директории "dist" по запросам "/"
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir(fmt.Sprintf("./%s", distDir)))))
	// содержимое папки node_modules
	http.Handle("/node_modules/", http.StripPrefix("/node_modules/", http.FileServer(http.Dir("./node_modules"))))
	// запуск сервера
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
